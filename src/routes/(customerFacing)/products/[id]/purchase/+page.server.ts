import { error } from '@sveltejs/kit';
import { db } from '../../../../../hooks.server.js';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const load = (async ({params:{id}}) => {
    const product = await db.product.findUnique({
        where: {
            id: id
        }
    })
    if(!product){
        error(404,'Product not found');
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: product.priceInCents, // Convert to cents
        currency: 'USD', // Change to your desired currency
        metadata: {
            productId: product.id
        }
    });

    if(paymentIntent.client_secret === null){
        throw Error('Failed to create payment intent');
    }

    return {
        product,
        clientSecret: paymentIntent.client_secret
    };
});