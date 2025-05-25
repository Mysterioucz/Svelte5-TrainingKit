import { json } from '@sveltejs/kit';
import { db } from '../../../../hooks.server.js';

export const POST = async ({request}) => {
    const {email, productId} = await request.json();

    const orderExists = await db.order.findFirst({
        where:{
            user:{
                email: email
            },
            productId: productId
        },
        select: {
            id: true
        }
    }) !== null;

    return json(orderExists);

};