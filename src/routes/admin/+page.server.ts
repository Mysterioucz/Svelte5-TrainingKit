import { db } from "../../hooks.server";

async function getSalesData(){
    const data = await db.order.aggregate({
        _sum: {priceInCents: true },
        _count:true
    });
    return {
        amount: (data._sum.priceInCents || 0) / 100,
        numberOfSales:data._count
    }
}

async function getuserData(){
    const [userCount, orderData] = await Promise.all([ // Get the user count in parallel which result in faster query
        db.user.count(),
        db.order.aggregate({
            _sum: {priceInCents: true }
        })
    ]);

    return {
        userCount,
        averageValuePerUser : userCount === 0 ? 0:((orderData._sum.priceInCents || 0) / userCount / 1000),
        orderCount: (orderData._sum.priceInCents || 0) / 100
    };
}

async function getProductData(){
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({where: {isAvailableForPurchase:true}}),
        db.product.count({where: {isAvailableForPurchase:false}})
    ]);

    return {
        activeCount,
        inactiveCount
    };
}


export const load = (async () => {
    const [salesData,userData,productData] = await Promise.all([
        getSalesData(),
        getuserData(),
        getProductData()
    ]);
    return {
        salesData,
        userData,
        productData
    };
});