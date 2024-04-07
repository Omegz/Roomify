/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/server/routers/stripeRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import Stripe from 'stripe';



const STRIPE_SECRET_KEY = 'sk_test_51Nk0IODtvZGWcW3MwkEuTOoZjGILPJkk5t1NkGpSEMQXG3sZHRU4da4vPm9pr5aDP3ZIf0iAbrHs4e6KQoINUVO500Q4NxR8xk'
// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

;


export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(z.object({
      // Define any inputs if necessary
    }))
    .mutation(async ({ ctx }) => {
      // Retrieve the session to get user information

      if (!ctx.user?.id) {
        throw new Error("User ID not found in session");
      }

      const userId = ctx.user.id; // Use the authenticated user's ID from the context
    
      
      // Optionally, retrieve user from your database
      const user = await ctx.db.user.findUnique({
        where: { id: userId },
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

    cancelSubscription: publicProcedure
    .input(z.object({
      // Define any necessary inputs here. In this case, we're assuming the user's ID from the session is enough.
    }))
    .mutation(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new Error("Unauthorized: User ID not found in session.");
      }
  
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
        select: { stripeSubscriptionId: true }
      });
  
      if (!user || !user.stripeSubscriptionId) {
        throw new Error("No subscription found for user.");
      }
  
      try {
        // Here, we directly await the stripe.subscriptions.update call without assigning its result to a variable,
        // since we don't use it later in the code.
        await stripe.subscriptions.update(user.stripeSubscriptionId, {
          cancel_at_period_end: true,
        });
  
        // Optionally, update your database as needed to reflect the change.
        await ctx.db.user.update({
          where: { id: ctx.user.id },
          data: {
            // Reflect the pending cancellation in your database as needed.
            // For example, mark the subscription as pending cancellation.
          },
        });
  
        return { success: true, message: "Subscription will be cancelled at the end of the billing period." };
      } catch (error) {
        console.error("Failed to update subscription cancellation:", error);
        throw new Error("Failed to update subscription cancellation.");
      }
    }),

    getUserInfo: protectedProcedure
  .input(z.object({
    // This example assumes no input is required for fetching user information.
  }))
  .query(async ({ ctx }) => {
    // With protectedProcedure, you should already have context indicating the user is authenticated,
    // so you may not need to explicitly check for ctx.user.id presence as it's implied.
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.user?.id },
      select: {
        id: true,
        username: true,
        email: true,
        first_name: true,
        last_name: true,
        active: true,
        stripeEmail: true,
        image: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        paidSubscription: true,
        cancelsAt: true,
        // Add any other fields you wish to return
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Return the user information. You may adjust what data you wish to expose.
    return { user };
  }),

  
});
