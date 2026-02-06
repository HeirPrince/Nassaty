export { Slice as default, meta } from './slice';
import { json } from '@remix-run/node';
import { Resend } from 'resend';

export async function action({ request }) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const formData = await request.formData();
    const email = String(formData.get('email'));
    const phone = String(formData.get('phone') || 'Not provided');
    const project = 'QBot (Customer Assistance Chatbot)';

    if (!email || !email.includes('@')) {
        return json({ error: 'Invalid email' }, { status: 400 });
    }

    try {
        await resend.emails.send({
            from: `Nassaty Leads <${process.env.FROM_EMAIL}>`,
            to: ['nassaty@gmail.com'],
            subject: `Demo Request: ${project}`,
            html: `<p>New demo request for <strong>${project}</strong>.</p>
                   <p>Email: <a href="mailto:${email}">${email}</a></p>
                   <p>Phone: ${phone}</p>`,
        });
        return json({ success: true });
    } catch (error) {
        console.error('Failed to send email:', error);
        return json({ error: 'Failed' }, { status: 500 });
    }
}
