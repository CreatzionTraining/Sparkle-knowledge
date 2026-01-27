import { Redis } from '@upstash/redis';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Redis client for queue
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const time = now.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const timestamp = `${date} ${time}`;

    // Admin notification email HTML - Mobile Responsive
    const adminNotificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; max-width: 100% !important; }
              .content { padding: 20px !important; }
              .header { padding: 24px !important; }
              .button-container { display: block !important; }
              .button { display: block !important; margin: 8px 0 !important; padding: 12px 20px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
            <tr>
              <td align="center">
                <table class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td class="header" style="background: linear-gradient(135deg, #E63946 0%, #1D4ED8 100%); padding: 32px; text-align: center;">
                      <div style="background: rgba(255, 255, 255, 0.2); border-radius: 50%; width: 60px; height: 60px; line-height: 60px; margin: 0 auto 12px; display: inline-block;">
                        <span style="font-size: 30px;">👤</span>
                      </div>
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Registration</h1>
                      <p style="margin: 6px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 13px;">Quick Popup Registration</p>
                    </td>
                  </tr>
                  
                  <!-- Alert Banner -->
                  <tr>
                    <td style="background: #06b6d4; padding: 12px 20px; text-align: center;">
                      <p style="margin: 0; color: #1e1b4b; font-size: 12px; font-weight: 800;">⚡ QUICK REGISTRATION</p>
                      <p style="margin: 4px 0 0 0; color: #312e81; font-size: 11px; font-weight: 700;">Received: ${timestamp}</p>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td class="content" style="padding: 24px;">
                      <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Registration Details</h2>
                      
                      <!-- Name -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                        <tr>
                          <td style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                            <p style="margin: 0 0 4px 0; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase;">👤 Full Name</p>
                            <p style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 700;">${name}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Email -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                        <tr>
                          <td style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                            <p style="margin: 0 0 4px 0; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase;">📧 Email</p>
                            <p style="margin: 0;"><a href="mailto:${email}" style="color: #1D4ED8; font-size: 14px; font-weight: 600; text-decoration: none; word-break: break-all;">${email}</a></p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Phone -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                        <tr>
                          <td style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 8px; padding: 14px;">
                            <p style="margin: 0 0 4px 0; color: #64748b; font-size: 10px; font-weight: 700; text-transform: uppercase;">📞 Phone</p>
                            <p style="margin: 0;"><a href="tel:${phone}" style="color: #1D4ED8; font-size: 15px; font-weight: 700; text-decoration: none;">${phone}</a></p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Quick Actions -->
                      <div style="text-align: center; margin-top: 20px;">
                        <p style="margin: 0 0 12px 0; color: #475569; font-size: 12px; font-weight: 600;">Quick Actions</p>
                        <div class="button-container">
                          <a href="mailto:${email}" class="button" style="display: inline-block; background: linear-gradient(135deg, #E63946 0%, #1D4ED8 100%); color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; font-size: 12px; margin: 0 4px;">Reply via Email</a>
                          <a href="tel:${phone}" class="button" style="display: inline-block; background: #ffffff; color: #1e293b; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; font-size: 12px; border: 2px solid #cbd5e1; margin: 0 4px;">Call Now</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px; background-color: #0f172a; text-align: center;">
                      <p style="margin: 0 0 4px 0; color: #94a3b8; font-size: 11px; font-weight: 600;">Sparkle Knowledge Yard</p>
                      <p style="margin: 0; color: #64748b; font-size: 10px;">Automated notification - ${timestamp}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    console.log('Sending registration notification...');

    // 1. Send Notification to Admin ONLY (NO auto-reply to user)
    try {
      const notificationResult = await resend.emails.send({
        from: "noreply@sparkleknowledgeyard.com",
        to: ['sparkleknowledgeyard@gmail.com'],
        cc: ['contact@sparkleknowledgeyard.com'],
        subject: `👤 New Registration from ${name}`,
        html: adminNotificationHtml,
      });
      console.log('Admin notification sent successfully:', notificationResult);
    } catch (error: any) {
      console.error('Failed to send admin notification:', error);
      throw new Error(`Failed to send notification: ${error.message}`);
    }

    // 2. Save to Redis Queue (for Registration tab in Google Sheets)
    try {
      // Generate unique submission ID
      const submissionId = `REG-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      const registrationData = {
        id: submissionId,
        date,
        time,
        name,
        email,
        phone,
        attempts: 0,
        createdAt: new Date().toISOString(),
        type: 'registration', // Mark as registration type
      };

      // Save to Redis queue with 'registration:' prefix
      await redis.set(`registration:${submissionId}`, registrationData);
      
      console.log(`✅ Registration ${submissionId} added to queue successfully`);
    } catch (queueError: any) {
      console.error('⚠️ Failed to add to queue:', queueError.message);
      // Even if queue fails, user still gets confirmation
    }

    // Return success to user IMMEDIATELY (fast response)
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful!',
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process registration',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
