// src/app/api/Webhook/stripeWebhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro'; // Ensure 'micro' is installed or use an alternative approach

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


//cus_PmFvIpMAhe2MS6

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
            // Handle successful checkout session completion here
            console.log('webhook checkout session', event.data.object)
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
