import { json } from '@remix-run/node';
import { Resend } from 'resend';
export { Contact as default, meta } from './contact';

const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

export async function action({ context, request }) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const formData = await request.formData();
    const isBot = String(formData.get('name'));
    const email = String(formData.get('email'));
    const phone = String(formData.get('phone') || 'Not provided');
    const message = String(formData.get('message'));
    const errors = {};

    // Return without sending if a bot trips the honeypot
    if (isBot) return json({ success: true });

    // Handle input validation on the server
    if (!email || !EMAIL_PATTERN.test(email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!message) {
        errors.message = 'Please enter a message.';
    }

    if (email.length > MAX_EMAIL_LENGTH) {
        errors.email = `Email address must be shorter than ${MAX_EMAIL_LENGTH} characters.`;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
        errors.message = `Message must be shorter than ${MAX_MESSAGE_LENGTH} characters.`;
    }

    if (Object.keys(errors).length > 0) {
        return json({ errors });
    }

    // Check if Resend API key is set
    if (!process.env.RESEND_API_KEY) {
        console.error('Resend API key is not configured.');
        return json({
            errors: {
                message:
                    'Email service is not configured. Please check the server configuration.',
            },
        });
    }

    // Send email via Resend
    try {
        await resend.emails.send({
            from: `Portfolio <${process.env.FROM_EMAIL}>`,
            to: ['nassaty@gmail.com'],
            subject: `Portfolio message from ${email}`,
            reply_to: email,
            text: `From: ${email}\nPhone: ${phone}\n\n${message}`,
        });
    } catch (error) {
        console.error('Failed to send email:', error);
        return json({
            errors: {
                message: 'There was an error sending your message. Please try again.',
            },
        });
    }

    return json({ success: true });
}
