// src/server/routers/stripeRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import Stripe from 'stripe';



const STRIPE_SECRET_KEY = 'sk_test_51Nk0IODtvZGWcW3MwkEuTOoZjGILPJkk5t1NkGpSEMQXG3sZHRU4da4vPm9pr5aDP3ZIf0iAbrHs4e6KQoINUVO500Q4NxR8xk'
// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });


import { getServerAuthSession } from "~/server/auth";


export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(z.object({
      // Define any inputs if necessary
    }))
    .mutation(async ({ ctx }) => {
      // Retrieve the session to get user information
      // const session = await getServerAuthSession(ctx); come back to this 
      const session = await getServerAuthSession();
      
      // Ensure user is authenticated
      if (!session || !session.user) {
        throw new Error('Unauthorized');
      }
      
      // Optionally, retrieve user from your database
      const user = await ctx.db.user.findUnique({
        where: { id: session.user.id },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Create a Stripe checkout session with user metadata
      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: 'price_1Oud3SDtvZGWcW3M7runWv1b', // Replace with your actual price ID
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
        metadata: {
          userId: user.id, // Pass the user's internal ID as metadata
          // You can add more metadata if necessary
        },
        // Optionally specify to not send email, allowing user to input email in Stripe Checkout
        // customer_email: '', // Comment this out to allow Stripe to capture email
      });
      console.log(stripeSession)

      return {
        url: stripeSession.url,
      };
    }),
    createCheckoutSessionYearly: publicProcedure
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

        console.log('hit trpc endpoint for yearly')
        const stripeSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price: 'price_1OvgsrDtvZGWcW3MrNpFn3uR', // Replace with your actual price ID
            quantity: 1,
          }],
          mode: 'subscription',
          success_url: 'http://localhost:3000',
          cancel_url: 'http://localhost:3000',
        });

        return { url: stripeSession.url };
      } catch (error) {
        console.error('Failed to create checkout session:', error);
        throw new Error('Failed to create checkout session');
      }
    }),
});
