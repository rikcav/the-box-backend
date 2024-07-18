import express from 'express';
import * as controller from './controller';

export const pushNotificationRoutes = (app: express.Application) => {
  app.get('/notification/push/public_key', controller.getPublicKey);
  app.post('/notification/push/register', controller.register);
  app.post('/notification/push/send', controller.sendNotification);
};