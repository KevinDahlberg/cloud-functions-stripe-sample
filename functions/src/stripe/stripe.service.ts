import * as functions from 'firebase-functions';

// set up stripe.key:
// firebase functions:config:set stripe.key="client's connected key here"
const stripe = require('stripe')(functions.config().stripe.key);

/**
 *
 * @param data
 * @returns stripe session id
 */
export async function createStripeSession(data: {
  successUrl: string;
  cancelUrl: string;
  lineItems: any[];
  customerEmail: string;
  clientReferenceId: string;
  subtotal: number;
  total: number;
}): Promise<string> {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      payment_method_types: ['card'],
      line_items: data.lineItems,
      mode: 'payment',
      customer_email: data.customerEmail,
      allow_promotion_codes: true,
    });
    if (session && session.id) {
      return session.id;
    }
    throw new Error('unable to get session');
  } catch (error) {
    throw error;
  }
}
