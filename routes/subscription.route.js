import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getSubscriptionById, getUserSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// subscriptionRouter.get('/', (req, res) => {
//     res.send({
//         title: 'GET Subscriptions'
//     });
// });

subscriptionRouter.get('/:id', authorize, getSubscriptionById);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'dlt Subscription'
    });
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send({
        title: 'UPDATE Subscriptions'
    });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.get('/:id/cancel', (req, res) => {
    res.send({
        title: 'Cacel Subscriptions'
    });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
    res.send({
        title: 'bvhjkhbnjhbn'
    });
});

export default subscriptionRouter;