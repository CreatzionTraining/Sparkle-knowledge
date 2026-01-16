import * as React from 'react';

interface NotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  timestamp: string;
}

export const NotificationEmail: React.FC<NotificationEmailProps> = ({ 
  name, 
  email, 
  phone, 
  message, 
  timestamp 
}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f8fafc' }}>
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#f8fafc', padding: '40px 20px' }}>
        <tr>
          <td align="center">
            <table width="600" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              
              {/* Header */}
              <tr>
                <td style={{ background: 'linear-gradient(135deg, #E63946 0%, #1D4ED8 100%)', padding: '30px', textAlign: 'center' }}>
                  <h1 style={{ margin: 0, color: '#ffffff', fontSize: '28px', fontWeight: 'bold' }}>
                    🔔 New Contact Form Submission
                  </h1>
                  <p style={{ margin: '8px 0 0 0', color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px' }}>
                    Sparkle Academy Website
                  </p>
                </td>
              </tr>

              {/* Alert Banner */}
              <tr>
                <td style={{ padding: '20px 30px', backgroundColor: '#fef3c7', borderBottom: '2px solid #fbbf24' }}>
                  <p style={{ margin: 0, color: '#92400e', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                    ⚡ Action Required: New inquiry received at {timestamp}
                  </p>
                </td>
              </tr>

              {/* Contact Details */}
              <tr>
                <td style={{ padding: '30px' }}>
                  <h2 style={{ margin: '0 0 24px 0', color: '#1e293b', fontSize: '20px', fontWeight: 'bold' }}>
                    Contact Information
                  </h2>

                  {/* Name */}
                  <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '16px' }}>
                    <tr>
                      <td width="120" style={{ padding: '12px 16px', backgroundColor: '#f1f5f9', borderRadius: '8px 0 0 8px' }}>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          👤 Name
                        </p>
                      </td>
                      <td style={{ padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                        <p style={{ margin: 0, color: '#1e293b', fontSize: '15px', fontWeight: '600' }}>
                          {name}
                        </p>
                      </td>
                    </tr>
                  </table>

                  {/* Email */}
                  <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '16px' }}>
                    <tr>
                      <td width="120" style={{ padding: '12px 16px', backgroundColor: '#f1f5f9', borderRadius: '8px 0 0 8px' }}>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          ✉️ Email
                        </p>
                      </td>
                      <td style={{ padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                        <p style={{ margin: 0 }}>
                          <a href={`mailto:${email}`} style={{ color: '#1D4ED8', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>
                            {email}
                          </a>
                        </p>
                      </td>
                    </tr>
                  </table>

                  {/* Phone (if provided) */}
                  {phone && (
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '16px' }}>
                      <tr>
                        <td width="120" style={{ padding: '12px 16px', backgroundColor: '#f1f5f9', borderRadius: '8px 0 0 8px' }}>
                          <p style={{ margin: 0, color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            📞 Phone
                          </p>
                        </td>
                        <td style={{ padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '0 8px 8px 0' }}>
                          <p style={{ margin: 0 }}>
                            <a href={`tel:${phone}`} style={{ color: '#1D4ED8', fontSize: '15px', fontWeight: '600', textDecoration: 'none' }}>
                              {phone}
                            </a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  )}

                  {/* Message */}
                  <h3 style={{ margin: '32px 0 16px 0', color: '#1e293b', fontSize: '18px', fontWeight: 'bold' }}>
                    Message
                  </h3>
                  <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderLeft: '4px solid #1D4ED8', borderRadius: '8px' }}>
                    <p style={{ margin: 0, color: '#475569', fontSize: '15px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                      {message}
                    </p>
                  </div>
                </td>
              </tr>

              {/* Quick Actions */}
              <tr>
                <td style={{ padding: '30px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                    Quick Actions
                  </p>
                  <table width="100%" cellPadding="0" cellSpacing="0">
                    <tr>
                      <td align="center">
                        <table cellPadding="0" cellSpacing="0">
                          <tr>
                            <td style={{ padding: '0 8px' }}>
                              <a href={`mailto:${email}`} style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#1D4ED8', color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600', borderRadius: '8px' }}>
                                Reply via Email
                              </a>
                            </td>
                            <td style={{ padding: '0 8px' }}>
                              <a href={`tel:${phone || ''}`} style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#E63946', color: '#ffffff', textDecoration: 'none', fontSize: '14px', fontWeight: '600', borderRadius: '8px' }}>
                                Call Now
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td style={{ padding: '20px 30px', backgroundColor: '#1e293b', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '12px' }}>
                    Sparkle Academy Contact Management System
                  </p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '11px' }}>
                    Received: {timestamp}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
);

export default NotificationEmail;
