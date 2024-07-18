import WebPush from 'web-push';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const publicKey = 'BPtkJYBj3jSMyGgTgc0WidNTqcEq5S6qVzh9VezjIaxnomTHBWV23Upg7u7XaIyxyiZnn_6qpu2VLCApAZUkH4U';
const privateKey = 'DqLNwRE1G0AE3MpfId7zDyy7uZWv-yNXYKrJiAVjvEg';

// Atualize para usar https
WebPush.setVapidDetails('https://localhost:3000', publicKey, privateKey);

export const getPublicKey = () => publicKey;

export const saveSubscription = async (subscription: any, userId: number) => {
  try {
    await prisma.subscription.create({
      data: {
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        userId: userId,
      },
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
  }
};

export const getSubscriptions = async (userId: number) => {
  try {
    return await prisma.subscription.findMany({
      where: { userId },
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
};

export const sendNotification = async (subscription: any, payload: any) => {
  try {
    await WebPush.sendNotification(subscription, payload);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
