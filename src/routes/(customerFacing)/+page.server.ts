import { db } from "../../hooks.server";

function getMostPopularProducts(){
    return db.product.findMany({
        where: {
            isAvailableForPurchase: true
        },
        take: 6,
        orderBy: {
            Order:{
                _count: 'desc'
            }
        }
    });
}

function getNewestProducts(){
    return db.product.findMany({
        where: {
            isAvailableForPurchase: true
        },
        take: 6,
        orderBy: {
            createdAt: 'desc'
        }
    });
}
export const load = async () => {
    const [mostPopularProducts, newestProducts] = await Promise.all([
        getMostPopularProducts(),
        getNewestProducts()
    ])

    return {
        mostPopularProducts,
        newestProducts
    }
};