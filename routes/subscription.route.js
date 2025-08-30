import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({
        title: 'GET Subscriptions'
    });
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: 'GET Subscription details'
    });
});

subscriptionRouter.post('/', (req, res) => {
    res.send({
        title: 'CREATE Subscription'
    });
});

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

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({
        title: 'GET all user Subscriptions'
    });
});

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