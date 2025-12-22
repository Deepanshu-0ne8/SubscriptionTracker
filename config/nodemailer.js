import nodemailer from 'nodemailer';
import { ACC_EMAIL, APP_PASS } from './env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user: ACC_EMAIL,
        pass: APP_PASS
    }
});

export default transporter;