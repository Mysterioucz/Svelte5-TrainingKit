import { db } from "../../../hooks.server"; 
import fs from "fs/promises";

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

    },

    deleteProduct: async({request}) => {
        const formData = await request.formData();
        const productId = formData.get("id") as string;
        const product = await db.product.findUnique({
            where: { id: productId },
            select: {_count:{select:{Order:true}}}
        });

        if(product && product._count.Order > 0) {
            return { error: "Cannot delete product with existing orders" };
        }

        const deletedProduct = await db.product.delete({
            where: { id: productId }
        });

        await fs.unlink(deletedProduct.filePath);
        await fs.unlink(`static${deletedProduct.imagePath}`);
    }
};