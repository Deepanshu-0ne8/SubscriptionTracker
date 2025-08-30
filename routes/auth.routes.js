import { Router } from "express";

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    res.send({
        title: 'signup'
    })
});

authRouter.post('/sign-in', (req, res) => {
    res.send({
        title: 'signin'
    })
});

authRouter.post('/sign-out', (req, res) => {
    res.send({
        title: 'signout'
    })
});

export default authRouter;