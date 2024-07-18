import { Request, Response } from 'express';
import * as webPushService from './service';

export const getPublicKey = (req: Request, res: Response) => {
  const publicKey = webPushService.getPublicKey();
  return res.json({ publicKey });
};

export const register = async (req: Request, res: Response) => {
  const { subscription, userId } = req.body;
  await webPushService.saveSubscription(subscription, userId);
  return res.sendStatus(201);
};

export const sendNotification = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const subscriptions = await webPushService.getSubscriptions(userId);

  const payload = JSON.stringify({
    icon: 'your-icon-link.png',
    title: 'Your title',
    body: 'Content of your message',
    imageUrl: 'your-image-link.png'
  });

  for (const subscription of subscriptions) {
    await webPushService.sendNotification(subscription, payload);
  }

  return res.sendStatus(201);
};
