import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subscription name is required"],
            trim: true,
            minLength: [2, "Subscription name must be at least 3 characters long"],
            maxLength: [100, "Subscription name must be at most 50 characters long"],
        },
        price: {
            type: Number,
            required: [true, "Subscription price is required"],
            min: [0, "Subscription price must be at least 0"],
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "INR"],
            default: "USD",
        },
        frequency: {
            type: String,
            enum: ["daily", "weekly", "monthly", "yearly"],
        },
        category: {
            type: String,
            enum: ["entertainment", "lifestyle", "news", "sports", "technology", "finance", "politics", "other"],
            required: [true, "Subscription category is required"],
        },
        paymentMethod: {
            type: String,
            required: [true, "Payment method is required"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["active", "canceled", "expired"],
            default: "active"
        },
        startDate: {
            type: Date,
            required: true,
            validate : {
                validator: function(value) {
                    return value <= new Date();
                },
                message: "Start date cannot be in the future"
            }
        },
        renewalDate: {
            type: Date,
            validate : {
                validator: function(value) {
                    return value > this.startDate;
                },
                message: "Renewal date must be after start date"
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


subscriptionSchema.pre('save', function(next) {
    // 1. Calculate renewalDate only if it hasn't been set
    if (!this.renewalDate && this.startDate && this.frequency) {
        // Create a new Date object based on startDate to manipulate it
        const newRenewalDate = new Date(this.startDate);

        switch (this.frequency) {
            case 'daily':
                // Add 1 day
                newRenewalDate.setDate(newRenewalDate.getDate() + 1);
                break;
            case 'weekly':
                // Add 7 days
                newRenewalDate.setDate(newRenewalDate.getDate() + 7);
                break;
            case 'monthly':
                // CORRECT WAY: Use setMonth() to handle different month lengths (30, 31, 28/29)
                newRenewalDate.setMonth(newRenewalDate.getMonth() + 1);
                break;
            case 'yearly':
                // CORRECT WAY: Use setFullYear()
                newRenewalDate.setFullYear(newRenewalDate.getFullYear() + 1);
                break;
            default:
                // Handle cases where frequency might be undefined or invalid
                break;
        }

        this.renewalDate = newRenewalDate;
    }

    // 2. Update status if renewalDate is in the past
    // This check is now outside the renewalDate calculation block.
    if (this.renewalDate && this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;