// src/server/routers/stripeRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import Stripe from 'stripe';


const STRIPE_SECRET_KEY = 'sk_test_51Nk0IODtvZGWcW3MwkEuTOoZjGILPJkk5t1NkGpSEMQXG3sZHRU4da4vPm9pr5aDP3ZIf0iAbrHs4e6KQoINUVO500Q4NxR8xk'
// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(z.object({
      // Define any input you need for creating a checkout session
      // For simplicity, we're not taking any inputs here
    }))
    .mutation(async ({ input, ctx }) => {
      // Ensure the user is authenticated or authorized if necessary
      // if (!ctx.session?.user) {
      //   throw new Error('Unauthorized');
      // }


      try {

        console.log('hit trpc endpoint')
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price: 'price_1Oud3SDtvZGWcW3M7runWv1b', // Replace with your actual price ID
            quantity: 1,
          }],
          mode: 'subscription',
          success_url: 'http://localhost:3000/about',
          cancel_url: 'http://localhost:3000/about',
        });

        return { url: session.url };
      } catch (error) {
        console.error('Failed to create checkout session:', error);
        throw new Error('Failed to create checkout session');
      }
    }),
});
