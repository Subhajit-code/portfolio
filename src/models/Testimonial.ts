import mongoose from "mongoose";

export interface ITestimonial extends mongoose.Document {
    name: string;
    role: string;
    quote: string;
    initials: string;
    isApproved: boolean; // You can use this to manually review them in a database before showing them publicly
    createdAt: Date;
}

const TestimonialSchema = new mongoose.Schema<ITestimonial>(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        role: {
            type: String,
            required: [true, "Please provide a role/company"],
            maxlength: [100, "Role cannot be more than 100 characters"],
        },
        quote: {
            type: String,
            required: [true, "Please provide a testimonial text"],
            maxlength: [500, "Testimonial cannot be more than 500 characters"],
        },
        initials: {
            type: String,
            required: true,
        },
        isApproved: {
            type: Boolean,
            default: true, // Auto display. Set to false if you want to moderate them first.
        },
    },
    { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
