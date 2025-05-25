import { db } from "../../../hooks.server";

async function getProduct(){
    return await db.product.findMany({
        where:{
            isAvailableForPurchase: true
        },
        orderBy:{
            name: 'asc'
        }
    })
}

export const load = (async () => {
    return {
        products: await getProduct()
    };
});