import * as React from 'react';

interface AutoReplyEmailProps {
  name: string;
}

export const AutoReplyEmail: React.FC<AutoReplyEmailProps> = ({ name }) => (
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
              
              {/* Header with Gradient */}
              <tr>
                <td style={{ background: 'linear-gradient(135deg, #E63946 0%, #1D4ED8 100%)', padding: '40px 30px', textAlign: 'center' }}>
                  <h1 style={{ margin: 0, color: '#ffffff', fontSize: '32px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
                    Sparkle Academy
                  </h1>
                  <p style={{ margin: '8px 0 0 0', color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', fontWeight: '500' }}>
                    Excellence in Education
                  </p>
                </td>
              </tr>

              {/* Main Content */}
              <tr>
                <td style={{ padding: '40px 30px' }}>
                  <h2 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '24px', fontWeight: 'bold' }}>
                    Thank You for Contacting Us! 🎉
                  </h2>
                  
                  <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
                    Dear <strong style={{ color: '#1e293b' }}>{name}</strong>,
                  </p>
                  
                  <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
                    Thank you for reaching out to Sparkle Academy! We've received your message and our team is excited to assist you.
                  </p>
                  
                  <p style={{ margin: '0 0 24px 0', color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
                    We typically respond within <strong style={{ color: '#1e293b' }}>24 hours</strong> during business days. One of our education consultants will get back to you shortly with the information you need.
                  </p>

                  {/* Info Box */}
                  <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                    <tr>
                      <td>
                        <p style={{ margin: '0 0 12px 0', color: '#1e293b', fontSize: '14px', fontWeight: 'bold' }}>
                          📧 What happens next?
                        </p>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: '1.8' }}>
                          <li>Our team reviews your inquiry</li>
                          <li>We prepare personalized information for you</li>
                          <li>You receive a detailed response via email</li>
                        </ul>
                      </td>
                    </tr>
                  </table>

                  <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '16px', lineHeight: '1.6' }}>
                    In the meantime, feel free to explore our courses and resources on our website.
                  </p>

                  {/* CTA Button */}
                  <table cellPadding="0" cellSpacing="0" style={{ margin: '24px 0' }}>
                    <tr>
                      <td style={{ borderRadius: '8px', background: 'linear-gradient(135deg, #E63946 0%, #1D4ED8 100%)' }}>
                        <a href="https://sparkleacademy.com" style={{ display: 'inline-block', padding: '14px 32px', color: '#ffffff', textDecoration: 'none', fontSize: '16px', fontWeight: '600', borderRadius: '8px' }}>
                          Visit Our Website
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Contact Info */}
              <tr>
                <td style={{ padding: '30px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                  <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '14px', fontWeight: '600', textAlign: 'center' }}>
                    Need immediate assistance?
                  </p>
                  <table width="100%" cellPadding="0" cellSpacing="0">
                    <tr>
                      <td align="center">
                        <p style={{ margin: '0 0 8px 0', color: '#475569', fontSize: '14px' }}>
                          📞 <a href="tel:+919384884488" style={{ color: '#1D4ED8', textDecoration: 'none', fontWeight: '500' }}>+91 93848 84488</a>
                        </p>
                        <p style={{ margin: '0 0 8px 0', color: '#475569', fontSize: '14px' }}>
                          ✉️ <a href="mailto:info@sparkleacademy.com" style={{ color: '#1D4ED8', textDecoration: 'none', fontWeight: '500' }}>info@sparkleacademy.com</a>
                        </p>
                        <p style={{ margin: '0', color: '#475569', fontSize: '14px' }}>
                          🕒 Monday - Friday: 9:00 AM - 6:00 PM
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              {/* Footer */}
              <tr>
                <td style={{ padding: '24px 30px', backgroundColor: '#1e293b', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 8px 0', color: '#94a3b8', fontSize: '12px' }}>
                    © 2026 Sparkle Academy. All rights reserved.
                  </p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>
                    This is an automated message. Please do not reply to this email.
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

export default AutoReplyEmail;
