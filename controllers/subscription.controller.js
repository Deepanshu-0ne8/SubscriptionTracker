import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        })

        const { workflowRunId } = await workflowClient.trigger({
            url : `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription._id,
            },
            headers: {
                'content-type':'application/json',
            },
            retries:0,
        })

        res.status(201).json({
            success: true, data: {subscription, workflowRunId}
        });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        // if(req.user.id !== req.params.id) {
        //     const error = new Error("u r not the owner");
        //     error.statusCode = 401;
        //     throw error;
        // }
        
        const subscriptions = await Subscription.find({ user: req.user._id }).populate('user', 'name email');
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findById(id);
        if(!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }
        if(subscription.user.toString() !== req.user.id) {
            const error = new Error("u r not the owner");
            error.statusCode = 401;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}