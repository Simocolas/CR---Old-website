const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const port = 3000;

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API endpoint - same as our Vercel function
app.post('/api/send-email', async (req, res) => {
    
    try {
        const { name, email, phone, address, service, message } = req.body;
        
        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ 
                error: 'Missing required fields: name and email are required' 
            });
        }
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // Email to business
        const businessEmailData = {
            from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.BUSINESS_EMAIL || 'fangwei716@gmail.com',
            subject: `🚨: Contact Form Submission from ${name}`,
            html: generateBusinessEmailHTML({ name, email, phone, address, service, message })
        };
        
        // Email confirmation to customer
        const customerEmailData = {
            from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
            to: email,
            subject: 'Thank you for contacting Calgary City Roofing',
            html: generateCustomerEmailHTML({ name, email, phone, address, service, message })
        };
        
        // Send both emails
        const [businessResult, customerResult] = await Promise.all([
            resend.emails.send(businessEmailData),
            resend.emails.send(customerEmailData)
        ]);

        res.json({ 
            success: true, 
            message: 'Emails sent successfully',
            businessEmailId: businessResult.data?.id,
            customerEmailId: customerResult.data?.id
        });
        
    } catch (error) {
        console.error('❌ Error sending emails:', error);
        res.status(500).json({ 
            error: 'Failed to send email',
            details: error.message 
        });
    }
});

// Serve static files from public directory
app.use(express.static('public'));

// Generate business notification email HTML
function generateBusinessEmailHTML(emailData) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 10px 0;"><strong>Name:</strong> ${emailData.name}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${emailData.email}">${emailData.email}</a></p>
        <p style="margin: 10px 0;"><strong>Phone:</strong> ${emailData.phone ? `<a href="tel:${emailData.phone}">${emailData.phone}</a>` : 'Not provided'}</p>
        ${emailData.address ? `<p style="margin: 10px 0;"><strong>Address:</strong> ${emailData.address}</p>` : ''}
        <p style="margin: 10px 0;"><strong>Service Interested:</strong> ${emailData.service}</p>
      </div>
      <div style="margin: 20px 0;">
        <h3 style="color: #333;">Message:</h3>
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
          ${emailData.message ? emailData.message.replace(/\n/g, '<br>') : 'No additional message provided'}
        </div>
      </div>
      <div style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 15px;">
        <p>From: Calgary City Roofing Website Contact Form</p>
      </div>
    </div>
  `;
}

function generateCustomerEmailHTML(emailData) {
  const uniqueToken = Date.now().toString(36) + Math.random().toString(36).substr(2,6);
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You from Calgary City Roofing</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333333;">
  
  <!-- Main Container -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width:600px; background-color:#333; border-radius:8px; overflow:hidden;">
          
          <!-- Header with Logo -->
          <tr>
            <td style="background-color:#333; padding:30px 40px; text-align:center;">
              <img src="https://www.calgarycityroofing.com/wp-content/uploads/2018/08/City-roofing-exteriors-footer-logo-2.png" alt="City Roofing & Exteriors" style="max-width:200px; height:auto; display:block; margin:0 auto;">
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="background:#fff; padding:40px;">
              <h2 style="color:#333; margin-top:0; font-size:24px;">Thank You, ${emailData.name}!</h2>
              <p style="font-size:16px; line-height:1.6; color:#555555;">
                We have received your inquiry. Our team is reviewing your message and will get back to you within 24 hours.
              </p>

              <!-- Inquiry Details -->
              <div style="background-color:#f8f9fa; border-left:4px solid #333; padding:20px; margin:30px 0; border-radius:4px;">
                <h3 style="margin-top:0; color:#333; font-size:18px;">Your Inquiry Details:</h3>
                ${emailData.phone ? `<p style="margin:10px 0; font-size:15px;"><strong>Phone:</strong> ${emailData.phone}</p>` : ''}
                ${emailData.address ? `<p style="margin:10px 0; font-size:15px;"><strong>Address:</strong> ${emailData.address}</p>` : ''}
                <p style="margin:10px 0; font-size:15px;"><strong>Service:</strong> ${emailData.service || 'General Inquiry'}</p>
                ${emailData.message ? `<div style="margin-top:15px;"><strong>Message:</strong><div style="background:#ffffff; border:1px solid #e9ecef; padding:15px; margin-top:5px; border-radius:4px; font-size:14px; color:#666;">${emailData.message.replace(/\n/g, '<br>')}</div></div>` : ''}
              </div>

              <p style="font-size:16px; line-height:1.6; color:#555555;">
                In the meantime, feel free to browse our <a href="https://www.calgarycityroofing.com/" style="color:#333; text-decoration:none; font-weight:bold;">website</a> or view our latest projects.
              </p>
            </td>
          </tr>

          <!-- Tiny visible-but-hidden token (place BEFORE footer) -->
          <tr>
            <td style="background:#fff; padding:0 40px 0 40px;">
              <!-- This small piece is present in the DOM but visually hidden. It helps break Gmail's signature detection. -->
              <span style="display:block; font-size:1px; line-height:1px; max-height:0; overflow:hidden; color:#ffffff; height:0;">
                id:${uniqueToken}
              </span>
            </td>
          </tr>

          <!-- Footer (table-based, less likely to be collapsed) -->
          <tr>
            <td style="background-color:#333333; color:#ffffff; padding:30px 40px; text-align:center; font-size:14px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="text-align:center;">
                    <strong style="font-size:18px; color:#ffffff;">City Roofing & Exteriors</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px; text-align:center;">
                    <a href="tel:4036089933" style="color:#ffffff; text-decoration:none; display:inline-block;">📞 (403) 608-9933</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:6px; text-align:center;">
                    <a href="mailto:info@calgarycityroofing.com" style="color:#ffffff; text-decoration:none; display:inline-block;">📧 info@calgarycityroofing.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:6px; text-align:center; color:#ffffff;">
                    📍 3935 3A St NE, Calgary, AB T2E 6S7
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:6px; text-align:center;">
                    <a href="https://www.calgarycityroofing.com/" style="color:#007bff; text-decoration:none;">🌐 www.calgarycityroofing.com</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top:20px; border-top:1px solid #555; font-size:12px; color:#999;">
                    &copy; ${new Date().getFullYear()} City Roofing & Exteriors. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}


app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
