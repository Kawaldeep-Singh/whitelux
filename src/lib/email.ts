import nodemailer from 'nodemailer';
import { ILead } from '@/models/Lead';

let transporter: nodemailer.Transporter | null = null;

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = parseInt(process.env.EMAIL_PORT || '587', 10);
const EMAIL_FROM = process.env.EMAIL_FROM || '"White Luxe Leads" <support@whiteluxe.com>';
const ADMIN_ALERT_EMAIL = process.env.ADMIN_ALERT_EMAIL || 'kawaldeep8395@gmail.com';

if (EMAIL_USER && EMAIL_PASS) {
  if (EMAIL_SERVICE === 'gmail') {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }
}

export async function sendLeadAlertEmail(lead: ILead): Promise<void> {
  const subject = `[New Lead] ${lead.name} - ${lead.interestedIn || 'General Enquiry'}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #0B0B0B; margin-top: 0; border-bottom: 2px solid #C9A24B; padding-bottom: 8px;">
        White Luxe Real Estate — New Enquiry Alert
      </h2>
      <p style="font-size: 15px; color: #333;">You have received a new property enquiry through the website:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr>
          <td style="padding: 8px; font-weight: bold; width: 140px; color: #555;">Name:</td>
          <td style="padding: 8px; color: #111;">${lead.name}</td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td>
          <td style="padding: 8px; color: #111;"><a href="tel:${lead.phone}" style="color: #C9A24B; text-decoration: none;">${lead.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
          <td style="padding: 8px; color: #111;"><a href="mailto:${lead.email}" style="color: #C9A24B; text-decoration: none;">${lead.email}</a></td>
        </tr>
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">Interested In:</td>
          <td style="padding: 8px; color: #111;">${lead.interestedIn || 'N/A'}</td>
        </tr>
        ${
          lead.projectName
            ? `<tr>
                <td style="padding: 8px; font-weight: bold; color: #555;">Tagged Project:</td>
                <td style="padding: 8px; color: #111;">${lead.projectName}</td>
              </tr>`
            : ''
        }
        <tr style="background-color: #f9f9f9;">
          <td style="padding: 8px; font-weight: bold; color: #555;">Source:</td>
          <td style="padding: 8px; color: #111;">${lead.source || 'Website'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; vertical-align: top; color: #555;">Message:</td>
          <td style="padding: 8px; color: #111;">${lead.message || 'No specific message provided.'}</td>
        </tr>
      </table>

      <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
        Sent automatically by White Luxe Real Estate CMS. Log in to the Admin Dashboard to manage this lead.
      </div>
    </div>
  `;

  try {
    if (transporter) {
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: ADMIN_ALERT_EMAIL,
        subject,
        html: htmlContent,
      });
      console.log(`[Email Service] Lead alert sent to ${ADMIN_ALERT_EMAIL} for ${lead.email}`);
    } else {
      console.log(`[Mock Email] Alert for lead: ${lead.name} (${lead.email})`);
    }
  } catch (error) {
    console.error('Failed to dispatch lead alert email (non-blocking):', error);
  }
}
