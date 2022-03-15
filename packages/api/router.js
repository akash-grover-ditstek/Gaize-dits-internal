import {Router} from "express";
const router = Router();

import fileUploadRouter from './router/fileUpload.router';
import bucketRouter from './router/bucket.router';
import organizationRouter from './router/organization.router';
import userRouter from './router/user.router';
import stripeRouter from './router/stripe.router';
import paymentRouter from './router/payment.router';

router.use('/file', fileUploadRouter);
router.use('/bucket', bucketRouter);
router.use('/organization', organizationRouter);
router.use('/user', userRouter);
router.use('/stripe', stripeRouter);
router.use('/payment', paymentRouter);

export default router