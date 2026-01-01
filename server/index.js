import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import * as z from 'zod';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Form validation schema (same as frontend)
const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must be less than 20 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens and apostrophes",
    ),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must be less than 20 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens and apostrophes",
    ),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-\+\(\)]{8,20}$/,
      "Please enter a valid phone number (8-20 digits)",
    ),
  package: z.enum(["Basic", "Large"]),
  addons: z.string().optional(),
  type: z
    .string()
    .min(2, "Please catagorise your type of Business e.g: Pizza shop"),
  description: z
    .string()
    .min(
      50,
      "Please describle the job so i can make an accurate quote for the work",
    )
    .trim(),
  contact: z.enum(["phone", "email"]),
});

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to generate email HTML
function generateEmailHtml(data) {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim() || 'N/A';
  const safe = (v) => (v === undefined || v === null || v === '' ? 'N/A' : String(v));
  
  const addonsDisplay = (() => {
    if (Array.isArray(data.addons)) return data.addons.length ? data.addons.join(', ') : 'None';
    if (typeof data.addons === 'object' && data.addons) return JSON.stringify(data.addons);
    return safe(data.addons) === 'N/A' ? 'None' : safe(data.addons);
  })();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; color: #111827; background-color: #f6f7fb;">
  <div style="width: 100%; padding: 24px 0;">
    <table role="presentation" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;">
      <tbody>
        <tr>
          <td style="background-color: #111827; color: #ffffff; padding: 16px 20px; font-size: 18px; font-weight: bold; letter-spacing: 0.2px;">
            New Website Enquiry
          </td>
        </tr>
        <tr>
          <td style="padding: 20px;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="vertical-align: top; width: 50%; padding-right: 12px;">
                    <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Customer</span>
                    <p style="font-size: 16px; color: #111827; margin: 0;">${fullName}</p>
                  </td>
                  <td style="vertical-align: top; width: 50%; padding-right: 12px;">
                    <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Preferred Contact</span>
                    <p style="font-size: 16px; color: #111827; margin: 0;">
                      <span style="display: inline-block; padding: 2px 8px; background-color: #eef2ff; color: #3730a3; border-radius: 999px; font-size: 12px; font-weight: 600;">
                        ${data.contact === 'phone' ? 'Phone' : data.contact === 'email' ? 'Email' : safe(data.contact)}
                      </span>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <div style="width: 100%; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 16px;">
              <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Email</span>
              <p style="font-size: 16px; color: #111827; margin: 0;">${safe(data.email)}</p>
            </div>

            <div style="width: 100%; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 16px;">
              <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Phone</span>
              <p style="font-size: 16px; color: #111827; margin: 0;">${safe(data.phone)}</p>
            </div>

            <div style="width: 100%; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 16px;">
              <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Project Type</span>
              <p style="font-size: 16px; color: #111827; margin: 0;">${safe(data.type)}</p>
            </div>

            <div style="width: 100%; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 16px;">
              <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Selected Package</span>
              <p style="font-size: 16px; color: #111827; margin: 0;">${safe(data.package)}</p>
            </div>

            <div style="width: 100%; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 16px;">
              <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Add-ons</span>
              <p style="font-size: 16px; color: #111827; margin: 0;">${addonsDisplay}</p>
            </div>

            <div style="width: 100%; border-top: 1px solid #f3f4f6; padding-top: 16px; margin-top: 16px;">
              <span style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; display: block;">Project Description</span>
              <pre style="white-space: pre-wrap; word-break: break-word; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; line-height: 1.5; background-color: #f9fafb; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; margin: 0;">${safe(data.description)}</pre>
            </div>
          </td>
        </tr>
        <tr>
          <td style="font-size: 12px; color: #6b7280; padding: 16px 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
            You're receiving this email because a new enquiry was submitted via your website.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
  `;
}

// API route for form submission
app.post('/api', async (req, res) => {
  try {
    const formdata = req.body;
    const body = formSchema.parse(formdata);
    const normalised = {
      ...body,
      addons:
        Array.isArray(body.addons) ? body.addons.join(', ')
          : body.addons ?? '',
    };

    const payload = {
      from: 'Guava Milk Team <enquiries@guavamilk.com>',
      to: ['dany.phillips@pm.me'],
      subject: `New ${normalised.package}, ${normalised.type} Job`,
      html: generateEmailHtml(normalised),
    };

    const { data, error } = await resend.emails.send(payload);

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ ok: false, error: 'Failed to send email' });
    }

    return res.json({ ok: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json(
      { ok: false, error: 'An error occurred' }
    );
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle client-side routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

