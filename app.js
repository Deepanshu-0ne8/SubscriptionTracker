import express from 'express';
import {PORT} from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.route.js';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

app.use(errorMiddleware);

app.listen(PORT, async ()  => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    await connectToDatabase();
});

export default app;