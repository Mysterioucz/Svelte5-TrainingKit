import { db } from "../../../hooks.server"; 

export const load = (async () => {
    return {
        products: await db.product.findMany({
            select: {
                id: true,
                name: true,
                priceInCents: true,
                isAvailableForPurchase: true,
                imagePath: true,
                _count:{
                    select:{
                        Order: true
                    }
                }
            },
            orderBy: {name: 'asc'}
        })
    };
});