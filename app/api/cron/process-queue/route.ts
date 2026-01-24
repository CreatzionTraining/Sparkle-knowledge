import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

// This runs every minute via Vercel Cron
export async function GET(request: NextRequest) {
  try {
    // 🔒 Locking Mechanism: Prevent double-execution
    // Set a lock key 'cron_processing_lock' with 30s expiry
    // 'nx: true' means "only set if Not Exists"
    const acquiredLock = await redis.set('cron_processing_lock', 'true', { ex: 30, nx: true });

    if (!acquiredLock) {
      console.log('🔒 Cron job already running (locked), skipping execution.');
      return NextResponse.json({ 
        success: true, 
        message: 'Locked - Job already running (deduplicated)',
        skipped: true 
      });
    }

    console.log('🔄 Cron job started - Processing pending submissions...');
    
    // Get all pending keys (both submissions and registrations)
    const submissionKeys = await redis.keys('submission:*');
    const registrationKeys = await redis.keys('registration:*');
    const allKeys = [...submissionKeys, ...registrationKeys];
    
    if (allKeys.length === 0) {
      console.log('✅ No pending items to process');
      // Release lock early since we are done
      await redis.del('cron_processing_lock');
      return NextResponse.json({ 
        success: true, 
        message: 'No pending items',
        processed: 0 
      });
    }

    console.log(`📋 Found ${allKeys.length} pending items (${submissionKeys.length} submissions, ${registrationKeys.length} registrations)`);
    
    let successCount = 0;
    let failCount = 0;

    // Process each item
    for (const key of allKeys) {
      try {
        const submission = await redis.get(key);
        
        if (!submission) {
          console.log(`⚠️ Submission ${key} not found, skipping`);
          continue;
        }

        const data = submission as any;
        
        const itemType = data.type || 'submission';
        console.log(`📝 Processing ${itemType} ${data.id} (Attempt ${data.attempts + 1}/10)`);

        // Try to save to Google Sheets (correct tab based on type)
        const saved = await saveToGoogleSheets(data, itemType);

        if (saved) {
          // Success - remove from queue
          await redis.del(key);
          successCount++;
          console.log(`✅ Successfully saved submission ${data.id} to Google Sheets`);
        } else {
          // Failed - increment attempts
          data.attempts = (data.attempts || 0) + 1;
          
          if (data.attempts >= 10) {
            // Max attempts reached - send email backup and remove
            await sendBackupEmail(data);
            await redis.del(key);
            failCount++;
            console.log(`❌ Max attempts reached for ${data.id} - sent email backup`);
          } else {
            // Update with new attempt count
            await redis.set(key, data);
            console.log(`⏳ Retry ${data.attempts}/10 for submission ${data.id}`);
          }
        }

        // Small delay between saves to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error: any) {
        console.error(`❌ Error processing submission ${key}:`, error.message);
        failCount++;
      }
    }

    console.log(`✅ Cron job completed - Success: ${successCount}, Failed: ${failCount}`);

    // 🔓 Release the lock
    await redis.del('cron_processing_lock');

    return NextResponse.json({
      success: true,
      processed: allKeys.length,
      submissions: submissionKeys.length,
      registrations: registrationKeys.length,
      successful: successCount,
      failed: failCount,
    });

  } catch (error: any) {
    console.error('❌ Cron job error:', error);
    // Attempt to release lock even on error so we don't block for full 30s
    await redis.del('cron_processing_lock');
    
    return NextResponse.json(
      { error: 'Cron job failed', details: error.message },
      { status: 500 }
    );
  }
}

// Save to Google Sheets (different tabs based on type)
async function saveToGoogleSheets(data: any, type: string = 'submission'): Promise<boolean> {
  try {
    let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
    
    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Determine which sheet tab and what data to save
    let range: string;
    let values: any[];
    
    if (type === 'registration') {
      // Save to Sheet2 (Registration tab) - only 6 columns
      range = 'Sheet2!A:F';
      values = [[
        data.id,
        data.date,
        data.time,
        data.name,
        data.email,
        data.phone || 'Not provided'
      ]];
    } else {
      // Save to Sheet1 (Contact Form) - 8 columns
      range = 'Sheet1!A:H';
      values = [[
        data.id,
        data.date,
        data.time,
        data.name,
        data.email,
        data.phone || 'Not provided',
        data.interestedIn || 'Not specified',
        data.message
      ]];
    }
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        values: values,
      },
    });
    
    return true;
  } catch (error: any) {
    console.error('Google Sheets save error:', error.message);
    return false;
  }
}

// Send backup email if all retries fail
async function sendBackupEmail(data: any): Promise<void> {
  try {
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@sparkleknowledgeyard.com',
      to: ['bhuvankumar13995@gmail.com'],
      subject: '🚨 URGENT: Form Submission Failed to Save - Manual Entry Required',
      html: `
        <h2 style="color: red;">⚠️ Google Sheets Save Failed After 10 Attempts</h2>
        <p>The following contact form submission could not be saved to Google Sheets.</p>
        <p><strong>Please manually add this to the spreadsheet:</strong></p>
        <ul>
          <li><strong>Submission ID:</strong> ${data.id}</li>
          <li><strong>Date:</strong> ${data.date}</li>
          <li><strong>Time:</strong> ${data.time}</li>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone || 'Not provided'}</li>
          <li><strong>Interested In:</strong> ${data.interestedIn || 'Not specified'}</li>
          <li><strong>Message:</strong> ${data.message}</li>
        </ul>
        <p style="color: red;"><strong>Action Required:</strong> Add this entry to Google Sheets manually.</p>
      `
    });
    
    console.log('📧 Backup email sent successfully');
  } catch (error: any) {
    console.error('Failed to send backup email:', error.message);
  }
}
