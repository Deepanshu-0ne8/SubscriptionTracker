import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({
        title: 'GET Users'
    })
});

userRouter.get('/:id', (req, res) => {
    res.send({
        title: 'GET User details'
    })
});

userRouter.post('/', (req, res) => {
    res.send({
        title: 'CREATE new User'
    })
});

userRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update User'
    })
});

userRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Dlt User'
    })
});

export default userRouter;