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

export const actions = {
    toggleAvailability: async ({ request }) => {
        const formData = await request.formData();
        const productId = formData.get("id");
        const isAvailableForPurchase = formData.has("isAvailableForPurchase");

        if (typeof productId !== "string" || !productId) {
            return { error: "Invalid product ID" };
        }

        await db.product.update({
            where: { id: productId },
            data: { isAvailableForPurchase }
        });

    }
};