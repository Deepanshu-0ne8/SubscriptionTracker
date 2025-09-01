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
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.startDate.getTime() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;