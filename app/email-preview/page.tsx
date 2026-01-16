'use client';

import { useState } from 'react';

export default function EmailPreview() {
  const [activeTab, setActiveTab] = useState<'auto-reply' | 'notification'>('auto-reply');
  
  // Sample data for preview
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
  
  const sampleData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    interestedIn: 'IELTS Coaching',
    message: 'I am interested in learning more about your IELTS coaching programs. Could you please provide me with details about the course structure, timings, and fees?',
    date: date,
    time: time,
    timestamp: timestamp
  };

  // Auto-reply HTML - Simple Professional Design
  const autoReplyHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                
                <tr>
                  <td style="background: linear-gradient(135deg, #EEF5FF 0%, #F2EEFF 100%); padding: 30px 40px; border-bottom: 3px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Logo Box on Left -->
                        <td style="width: 110px; vertical-align: middle;">
                          <div style="background-color: rgba(255, 255, 255, 0.9); padding: 5px; border-radius: 12px; box-shadow: 0 4px 12px rgba(29, 78, 216, 0.15); display: inline-block;">
                            <img src="http://localhost:3000/5.svg" alt="Sparkle Academy Logo" style="width: 100px; height: 100px; display: block;" />
                          </div>
                        </td>
                        
                        <!-- Centered Text -->
                        <td style="text-align: center; vertical-align: middle; padding-left: 24px;">
                          <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; white-space: nowrap;">
                            <span style="background: linear-gradient(90deg, #E63946 0%, #1D4ED8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: #1D4ED8;">Sparkle Knowledge Yard</span>
                          </h1>
                          <p style="margin: 6px 0 0 0; color: #1e3a8a; font-size: 14px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Excellence in Education</p>
                        </td>
                        
                        <!-- Spacer on Right to Balance Center Alignment -->
                        <td style="width: 110px;"></td> 
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: 600;">Thank You for Contacting Us</h2>
                    
                    <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px; line-height: 1.6;">Dear <strong style="color: #1e293b;">${sampleData.name}</strong>,</p>
                    
                    <p style="margin: 0 0 16px 0; color: #475569; font-size: 16px; line-height: 1.6;">Thank you for reaching out to Sparkle Academy. We have successfully received your inquiry.</p>
                    
                    <p style="margin: 0 0 28px 0; color: #475569; font-size: 16px; line-height: 1.6;">Our team will contact you within <strong style="color: #1e293b;">24 business hours</strong> via email or phone to assist you with your inquiry.</p>
                    
                    <!-- What Happens Next -->
                    <div style="background-color: #f8fafc; border-left: 4px solid #1D4ED8; border-radius: 6px; padding: 24px; margin-bottom: 28px;">
                      <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">What Happens Next?</h3>
                      <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.7;">Our team will review your message and get in touch with you soon to provide the information you need and answer any questions you may have.</p>
                    </div>
                    
                    <!-- Visit Website -->
                    <div style="text-align: center; margin: 32px 0;">
                      <p style="margin: 0 0 16px 0; color: #64748b; font-size: 14px;">In the meantime, feel free to explore our website:</p>
                      <a href="https://sparkleknowledgeyard.com" style="display: inline-block; background: linear-gradient(135deg, #E63946 0%, #1D4ED8 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px;">Visit Our Website</a>
                    </div>
                  </td>
                </tr>
                
                <!-- Contact Information -->
                <tr>
                  <td style="padding: 32px 40px; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
                    <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 16px; font-weight: 600; text-align: center;">Need Immediate Assistance?</h3>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align: center; padding: 8px;">
                          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px; font-weight: 500;">Phone</p>
                          <a href="tel:+919710043295" style="display: block; margin: 0; color: #1D4ED8; font-size: 15px; font-weight: 600; text-decoration: none;">+91 97100 43295</a>
                        </td>
                        <td style="text-align: center; padding: 8px; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px; font-weight: 500;">Email</p>
                          <a href="mailto:info@sparkleacademy.com" style="display: block; margin: 0; color: #1D4ED8; font-size: 15px; font-weight: 600; text-decoration: none;">info@sparkleacademy.com</a>
                        </td>
                        <td style="text-align: center; padding: 8px;">
                          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px; font-weight: 500;">Working Hours</p>
                          <p style="margin: 0; color: #1e293b; font-size: 15px; font-weight: 600;">Monday - Saturday</p>
                          <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 15px; font-weight: 600;">9:00 AM - 8:00 PM</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; background-color: #1e293b; text-align: center;">
                    <p style="margin: 0 0 4px 0; color: #94a3b8; font-size: 13px;">© 2026 Sparkle Knowledge Yard. All rights reserved.</p>
                    <p style="margin: 0; color: #64748b; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // Notification HTML - Professional Box Layout
  const notificationHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 60px 20px;">
          <tr>
            <td align="center">
              <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #E63946 0%, #1D4ED8 100%); padding: 40px; text-align: center;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align: center;">
                          <div style="display: inline-block; background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 50%; width: 80px; height: 80px; line-height: 80px; margin-bottom: 20px;">
                            <span style="font-size: 40px; color: #ffffff;">&#9993;</span>
                          </div>
                          <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">New Contact Submission</h1>
                          <p style="margin: 12px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 15px; font-weight: 500;">Sparkle Knowledge Yard Website</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Alert Banner -->
                <tr>
                  <td style="padding: 0;">
                    <div style="background: linear-gradient(90deg, #06b6d4 0%, #0891b2 100%); padding: 20px 40px; border-bottom: 3px solid #0e7490;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="40" style="vertical-align: middle;">
                            <div style="width: 36px; height: 36px; background: rgba(255, 255, 255, 0.3); border-radius: 8px; text-align: center; line-height: 36px;">
                              <span style="font-size: 20px;">&#9889;</span>
                            </div>
                          </td>
                          <td style="padding-left: 16px; vertical-align: middle;">
                            <p style="margin: 0; color: #1e1b4b; font-size: 15px; font-weight: 900;">PRIORITY INQUIRY</p>
                            <p style="margin: 4px 0 0 0; color: #312e81; font-size: 13px; font-weight: 800;">Received: ${sampleData.timestamp}</p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
                
                <!-- Main Content - Box Layout -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 32px 0; color: #1e293b; font-size: 22px; font-weight: 700; border-bottom: 3px solid #e2e8f0; padding-bottom: 16px;">Contact Information</h2>
                    
                    <!-- Date & Time Row -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                      <tr>
                        <td width="48%" style="vertical-align: top; padding-right: 2%;">
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">📅 Date</p>
                            <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 700;">${sampleData.date}</p>
                          </div>
                        </td>
                        <td width="48%" style="vertical-align: top; padding-left: 2%;">
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">🕐 Time</p>
                            <p style="margin: 0; color: #1e293b; font-size: 16px; font-weight: 700;">${sampleData.time}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Name & Email Row -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                      <tr>
                        <td width="48%" style="vertical-align: top; padding-right: 2%;">
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">👤 Full Name</p>
                            <p style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 700;">${sampleData.name}</p>
                          </div>
                        </td>
                        <td width="48%" style="vertical-align: top; padding-left: 2%;">
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">📧 Email Address</p>
                            <p style="margin: 0;"><a href="mailto:${sampleData.email}" style="color: #1D4ED8; font-size: 15px; font-weight: 600; text-decoration: none; word-break: break-word;">${sampleData.email}</a></p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Phone & Interested In Row -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                      <tr>
                        <td width="48%" style="vertical-align: top; padding-right: 2%;">
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">📞 Phone Number</p>
                            <p style="margin: 0;"><a href="tel:${sampleData.phone}" style="color: #1D4ED8; font-size: 17px; font-weight: 700; text-decoration: none;">${sampleData.phone}</a></p>
                          </div>
                        </td>
                        <td width="48%" style="vertical-align: top; padding-left: 2%;">
                          <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">🎯 Interested In</p>
                            <p style="margin: 0;"><span style="display: inline-block; background: linear-gradient(135deg, #E63946 0%, #1D4ED8 100%); color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 700;">${sampleData.interestedIn}</span></p>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Message Section -->
                    <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 700;">💬 Inquiry Message</h3>
                    <div style="background: #ffffff; border: 3px solid #e2e8f0; border-left: 6px solid #1D4ED8; border-radius: 12px; padding: 28px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                      <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 500;">${sampleData.message}</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Action Section -->
                <tr>
                  <td style="padding: 32px 40px; background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%); border-top: 2px solid #cbd5e1;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align: center;">
                          <p style="margin: 0 0 16px 0; color: #475569; font-size: 14px; font-weight: 600;">Quick Actions</p>
                          <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                            <tr>
                              <td style="padding: 0 8px;">
                                <a href="mailto:${sampleData.email}" style="display: inline-block; background: linear-gradient(135deg, #E63946 0%, #1D4ED8 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">Reply via Email</a>
                              </td>
                              <td style="padding: 0 8px;">
                                <a href="tel:${sampleData.phone}" style="display: inline-block; background: #ffffff; color: #1e293b; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; border: 2px solid #cbd5e1; letter-spacing: 0.5px;">Call Now</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 32px 40px; background-color: #0f172a; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 13px; font-weight: 600;">Sparkle Knowledge Yard Contact Management System</p>
                    <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: 500;">Automated notification - ${sampleData.timestamp}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">📧 Email Template Preview</h1>
          <p className="text-slate-400">Preview your email designs before sending</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('auto-reply')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'auto-reply'
                ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Auto-Reply Email
          </button>
          <button
            onClick={() => setActiveTab('notification')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'notification'
                ? 'bg-gradient-to-r from-red-500 to-blue-600 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Admin Notification
          </button>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-slate-400 text-sm">
                {activeTab === 'auto-reply' ? 'To: john.doe@example.com' : 'To: bhuvankumar13995@gmail.com'}
              </span>
            </div>
          </div>
          <div className="p-8 bg-slate-50">
            <iframe
              srcDoc={activeTab === 'auto-reply' ? autoReplyHtml : notificationHtml}
              className="w-full h-[800px] border-0 bg-white rounded-lg shadow-inner"
              title="Email Preview"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-900/30 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-2">ℹ️ Preview Information</h3>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• This is a live preview of your email templates</li>
            <li>• Sample data is used for demonstration purposes</li>
            <li>• The actual emails will use real form submission data</li>
            <li>• You can edit the templates in <code className="bg-slate-700 px-2 py-1 rounded">app/api/send-email/route.ts</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
