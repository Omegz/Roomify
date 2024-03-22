// // src/app/api/stripeWebhook/stripeWebhook.ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import Stripe from 'stripe';
// import { buffer } from 'micro'; // Ensure 'micro' is installed or use an alternative approach

// STRIPE_SECRET_KEY="sk_test_51Nk0IODtvZGWcW3MwkEuTOoZjGILPJkk5t1NkGpSEMQXG3sZHRU4da4vPm9pr5aDP3ZIf0iAbrHs4e6KQoINUVO500Q4NxR8xk"
// const stripe = new Stripe(STRIPE_SECRET_KEY, {
//   apiVersion: '2020-08-27',
// });

// export const config = {
//   api: {
//     bodyParser: false, // Disables Next.js body parsing
//   },
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     let event: Stripe.Event;
//     console.log('hello webhoookkkk')

//     // Ensure you have STRIPE_WEBHOOK_SECRET in your environment variables
//     const sig = req.headers['stripe-signature']!;
//     const reqBuffer = await buffer(req);

//     try {
//       event = stripe.webhooks.constructEvent(
//         reqBuffer.toString(),
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET!
//       );
//     } catch (err) {
//       console.error(`Error verifying webhook signature: ${err.message}`);
//       return res.status(400).send(`Webhook verification failed: ${err.message}`);
//     }

//     // Process webhook event
//     switch (event.type) {
//       case 'checkout.session.completed':
//         // Handle successful checkout session completion
//         console.log('Checkout session completed event received');
//         break;
//       // Add more event types as needed
//     }

//     res.status(200).json({ received: true });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end('Method Not Allowed');
//   }
// };

// export default handler;
