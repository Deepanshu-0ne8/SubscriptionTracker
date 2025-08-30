import express from 'express';
import {PORT} from './config/env.js';

const app = express();

app.get('/', (req, res) => {
    res.send('welcome to the home page');
})

app.listen(PORT, ()  => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;   