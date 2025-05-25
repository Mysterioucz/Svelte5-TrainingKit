import { db } from "../../../hooks.server";

export const load = (async () => {
    return {
        users: await db.user.findMany({
            select: {  
                id: true,
                email: true,
                Order:{
                    select:{
                        priceInCents: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
    };
});