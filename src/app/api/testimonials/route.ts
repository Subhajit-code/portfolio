import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await dbConnect();

        // Find all approved testimonials, sort by newest first
        const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });

        return NextResponse.json(testimonials, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        );
    }
}
