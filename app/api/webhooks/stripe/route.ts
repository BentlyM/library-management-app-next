import prisma from '@/app/lib/prisma';
import { stripe } from '@/app/lib/stripe';
import Stripe from 'stripe';

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  let event: Stripe.Event | undefined;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    if (err instanceof Error) {
      console.error('Webhook signature verification failed.', err.message);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }
  }

  if (!event) {
    console.error('No event was created');
    return new Response('Webhook Error: No event', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ['line_items'],
          }
        );
        const customerId = session.customer as string;
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          const user = await prisma.user.findUnique({
            where: { email: customerDetails.email },
          });
          if (!user) throw new Error('User not Found');

          if (!user.customerId) {
            await prisma.user.update({
              where: { id: user.id },
              data: { customerId },
            });
          }

          const lineItems = session.line_items?.data || [];

          for (const item of lineItems) {
            const priceId = item.price?.id;
            const isSubscription = item.price?.type === 'recurring';

            if (isSubscription) {
              let endDate = new Date();
              if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
                endDate.setMonth(endDate.getMonth() + 1);
              } else {
                throw new Error('Invalid PriceId');
              }

              await prisma.subscription.upsert({
                where: {
                  userId: user.id!,
                },
                create: {
                  userId: user.id,
                  startDate: new Date(),
                  endDate: endDate,
                  plan: 'SUBSCRIPTION',
                  period: 'MONTHLY',
                },
                update: {
                  plan: 'SUBSCRIPTION',
                  period: 'MONTHLY',
                  startDate: new Date(),
                  endDate: endDate,
                },
              });

              await prisma.user.update({
                where: { id: user.id },
                data: { plan: 'SUBSCRIPTION' },
              });
            } else {
              // one_time_purchase
            }
          }
        }
        break;

      default:
        console.log(`Unhandled Event Type ${event.type}`);
    }
  } catch (err: any) {
    if (err instanceof Error) {
      console.error('Error handling event', err);
      return new Response('Webhook Error', { status: 400 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
