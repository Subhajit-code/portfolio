import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function POST(req: Request) {
  try {
    const { name, role, quote } = await req.json();

    if (!name || !role || !quote) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Auto generate initials
    const initials = name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    // 1. Connect and Save to DB
    try {
      await dbConnect();
      const newTestimonial = new Testimonial({
        name,
        role,
        quote,
        initials,
        isApproved: true, // We auto-display it for this case
      });
      await newTestimonial.save();
    } catch (dbError) {
      console.error('Failed to save to database:', dbError);
    }

    // 2. Try Emailing (Optional)
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Testimonial Submission: ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
              <h2 style="color: #333; text-align: center;">New Testimonial Submitted & Saved</h2>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Role/Company:</strong> ${role}</p>
              </div>
              <div style="background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 5px;">
                <p><strong>Start of Quote:</strong></p>
                <p style="font-style: italic; color: #555;">"${quote}"</p>
                <p><strong>End of Quote</strong></p>
              </div>
            </div>
          `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Failed to send testimonial email:', emailError);
    }

    return NextResponse.json({ message: 'Testimonial submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    );
  }
}
