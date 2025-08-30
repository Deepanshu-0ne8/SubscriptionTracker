import express from 'express';
import {PORT} from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import subscriptionRoutes from './routes/subscription.route.js';
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/subscriptions", subscriptionRoutes);

app.listen(PORT, ()  => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;   