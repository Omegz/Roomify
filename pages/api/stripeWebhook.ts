/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/app/api/Webhook/stripeWebhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro'; // Ensure 'micro' is installed or use an alternative approach
import { db } from "~/server/db";

const STRIPE_WEBHOOK_SECRET='whsec_0f3814f79714fbbc1f91404baa0bf6aaeb48e69e2c7f2584a4519a782a0c55a4'

const STRIPE_SECRET_KEY="sk_test_51Nk0IODtvZGWcW3MwkEuTOoZjGILPJkk5t1NkGpSEMQXG3sZHRU4da4vPm9pr5aDP3ZIf0iAbrHs4e6KQoINUVO500Q4NxR8xk"
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export const config = {
  api: {
    bodyParser: false, // Disables Next.js body parsing
  },
};

async function handleCheckoutSessionCompleted(session) {
  if (session.payment_status === "paid") {
    const userId = session.metadata.userId; // Ensure this metadata is set when creating the session
    const newStripeCustomerId = session.customer; // The new Stripe customer ID from the session
    const newStripeEmail = session.customer_details.email; // The new Stripe email from the session
    // Assuming subscription ID is directly accessible from session (adjust as needed)
    const newStripeSubscriptionId = session.subscription;

    try {
      // Retrieve the current user to get the old values
      const user = await db.user.findUnique({
        where: { id: userId },
      });

      if (user) {
        // Update historical data for stripeCustomerId, stripeEmail, and stripeSubscriptionId
        if (user.stripeCustomerId && user.stripeEmail && user.stripeSubscriptionId) {
          await db.historicalStripe.create({
            data: {
              userId: userId,
              stripeCustomerId: user.stripeCustomerId,
              stripeSubscriptionId: user.stripeSubscriptionId,
              stripeEmail: user.stripeEmail, // Assumes you're tracking previous stripeEmails
            },
          });
        }

        // Update user with new Stripe customer ID, email, and subscription ID
        await db.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: newStripeCustomerId,
            stripeEmail: newStripeEmail, // Update the user's stripeEmail
            stripeSubscriptionId: newStripeSubscriptionId, // Update the subscription ID
            paidSubscription: true,
          },
        });

        console.log(`User ${userId}'s subscription status, Stripe customer ID, Stripe email, and Stripe subscription ID updated.`);
      }
    } catch (err) {
      console.error('Failed to update user subscription status, Stripe customer ID, Stripe email, or Stripe subscription ID:', err);
    }
  }
}

async function handleSubscriptionCancellation(subscription) {
  const stripeCustomerId = subscription.customer;
  const cancelsAt = subscription.cancel_at;

  // Ensure stripeCustomerId is defined
  if (!stripeCustomerId) {
    console.error('Stripe customer ID is undefined.');
    return;
  }

  try {
    // Update the user record with the cancellation date using stripeCustomerId to find the user
    await db.user.update({
      where: { stripeCustomerId: stripeCustomerId },
      data: {
        cancelsAt: cancelsAt,
      },
    });

    console.log(`User with Stripe customer ID ${stripeCustomerId}'s subscription cancellation date updated.`);
  } catch (err) {
    console.error('Failed to update user subscription cancellation date:', err);
  }
}





export  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const sig = req.headers['stripe-signature']!;
      const reqBuffer = await buffer(req);
  
      let event: Stripe.Event;
  
      // Verify and construct webhook event
      try {
        event = stripe.webhooks.constructEvent(
          reqBuffer.toString(),
          sig,
          STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.error(`Error verifying webhook signature: ${err.message}`);
        return res.status(400).send(`Webhook verification failed: ${err.message}`);
      }
  
      // Process webhook event
      try {
        switch (event.type) {
          case 'checkout.session.completed':
            console.log('Checkout session completed event received');
            const session = event.data.object; // The session object from the event
            console.log('webhook checkout session', session);
          
            // Call the function with the session data
            await handleCheckoutSessionCompleted(session).catch(console.error); // Make sure to catch any errors
            break;
          case 'invoice.payment_succeeded':
            console.log('Invoice payment succeeded event received');
            // Handle successful invoice payment here
            break;
          case 'charge.failed':
          case 'invoice.payment_failed':
            console.log('Payment failed event received');
            // Handle failed payment here
            break;

         // Inside your switch statement in the webhook handler...
case 'customer.subscription.deleted':
  console.log('Subscription cancelled and deleted event received');
  const deletedSubscription = event.data.object;
  await handleSubscriptionCancellation(deletedSubscription).catch(console.error);
  break;

case 'customer.subscription.updated':
  const updatedSubscription = event.data.object;
  // Check if the update is for a cancellation at the end of the billing period
  if (updatedSubscription.status === 'canceled' || updatedSubscription.cancel_at_period_end) {
    console.log('Subscription updated to cancel at period end event received');
    await handleSubscriptionCancellation(updatedSubscription).catch(console.error);
  }
  break;
          // Add more event types as needed
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
      } catch (error) {
        console.error("Error processing the webhook event:", error);
        return res.status(500).send("Internal Server Error");
      }
  
      // Acknowledge the event reception to Stripe
      res.status(200).json({ received: true });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end('Method Not Allowed');
    }
  }

export default handler;
