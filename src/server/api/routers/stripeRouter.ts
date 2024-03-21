// src/server/routers/stripeRouter.ts
import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc';
import Stripe from 'stripe';

import { getServerAuthSession } from "~/server/auth";
import email from 'next-auth/providers/email';
// 

const STRIPE_SECRET_KEY = 'sk_test_51Nk0IODtvZGWcW3MwkEuTOoZjGILPJkk5t1NkGpSEMQXG3sZHRU4da4vPm9pr5aDP3ZIf0iAbrHs4e6KQoINUVO500Q4NxR8xk'
// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });



// Assumption: ctx is your context containing user information and db is your database access layer
async function getOrCreateStripeCustomer(stripe, email: string) {
  const customers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (customers.data.length > 0) {
    return customers.data[0]; // Return existing customer
  } else {
    return await stripe.customers.create({ email }); // Create new customer
  }
}

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(z.object({
      // Example input, adjust according to your needs
  
    }))
    .mutation(async ({ input, ctx }) => {
      // Ensure the user is authenticated
      if (!ctx.session || !ctx.session.user) {
        throw new Error('Unauthorized');
      }
      let stripeCustomerId = null;

      // Use findFirst instead of findUnique to support OR condition
      const user = await ctx.db.user.findFirst({
        where: {
          OR: [
            { email: ctx.session.user.email },
            { stripeEmail: ctx.session.user.email }
          ],
        },
      });

      if (user && user.stripeCustomerId) {
        stripeCustomerId = user.stripeCustomerId;
      } else {
        const customer = await getOrCreateStripeCustomer(stripe, ctx.session.user.email);
        stripeCustomerId = customer.id;
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            stripeEmail: ctx.session.user.email,
            stripeCustomerId: stripeCustomerId,
          },
        });
      }


      try {
        // Assume `planId` determines the price ID dynamically
        // const priceId = input.planId === 'yearly' ? 'price_1OvgsrDtvZGWcW3MrNpFn3uR' : 'price_1Oud3SDtvZGWcW3M7runWv1b';
        
        console.log('hit trpc endpoint');
// cus_PmH3xYHUAEWExn


     

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
       
        const stripeSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [{
            price: 'price_1OvgsrDtvZGWcW3MrNpFn3uR', // Use correct price ID
            quantity: 1,
          }],
          mode: 'subscription',
          success_url: 'http://localhost:3000',
          cancel_url: 'http://localhost:3000/cancel',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          customer: stripeCustomerId,
        });

        console.log(stripeSession)


        // Update the user in the database as needed, e.g., store Stripe session ID
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            stripeSessionId: stripeSession.id,
            // Update other user fields as necessary
          },
        });

        // cs_test_a1IjQAcfiHsFV7B23XvlSZaih1imfFuqH3bJy5iX5DzKNdytRsX3MgnqwL

        return { url: stripeSession.url };
      } catch (error) {
        console.error('Failed to create checkout session:', error);
        throw new Error('Failed to create checkout session');
      }
    }),

  // You can define other procedures like `createCheckoutSessionYearly` similarly

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
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
              price: 'price_1OvgsrDtvZGWcW3MrNpFn3uR', // Replace with your actual price ID
              quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'http://localhost:3000',
            cancel_url: 'http://localhost:3000',
          });
  
          return { url: session.url };
        } catch (error) {
          console.error('Failed to create checkout session:', error);
          throw new Error('Failed to create checkout session');
        }
      }),
});


// export const stripeRouter = createTRPCRouter({
//   createCheckoutSession: protectedProcedure
//     .input(z.object({
//       // Define any input you need for creating a checkout session
//       // For simplicity, we're not taking any inputs here
//     }))
//     .mutation(async ({ input, ctx }) => {
//       // Ensure the user is authenticated or authorized if necessary
//       // if (!ctx.session?.user) {
//       //   throw new Error('Unauthorized');
//       // }


//       try {

//         console.log('hit trpc endpoint')
//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ['card'],
//           line_items: [{
//             price: 'price_1Oud3SDtvZGWcW3M7runWv1b', // Replace with your actual price ID
//             quantity: 1,
//           }],
//           mode: 'subscription',
//           success_url: 'http://localhost:3000/about',
//           cancel_url: 'http://localhost:3000/about',
//         });

//         return { url: session.url };
//       } catch (error) {
//         console.error('Failed to create checkout session:', error);
//         throw new Error('Failed to create checkout session');
//       }
//     }),

//     createCheckoutSessionYearly: publicProcedure
//     .input(z.object({
//       // Define any input you need for creating a checkout session
//       // For simplicity, we're not taking any inputs here
//     }))
//     .mutation(async ({ input, ctx }) => {
//       // Ensure the user is authenticated or authorized if necessary
//       // if (!ctx.session?.user) {
//       //   throw new Error('Unauthorized');
//       // }


//       try {

//         console.log('hit trpc endpoint for yearly')
//         const session = await stripe.checkout.sessions.create({
//           payment_method_types: ['card'],
//           line_items: [{
//             price: 'price_1OvgsrDtvZGWcW3MrNpFn3uR', // Replace with your actual price ID
//             quantity: 1,
//           }],
//           mode: 'subscription',
//           success_url: 'http://localhost:3000',
//           cancel_url: 'http://localhost:3000',
//         });

//         return { url: session.url };
//       } catch (error) {
//         console.error('Failed to create checkout session:', error);
//         throw new Error('Failed to create checkout session');
//       }
//     }),
// });
