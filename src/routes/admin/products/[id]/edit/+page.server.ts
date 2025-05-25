import { fail, superValidate } from 'sveltekit-superforms';
import { db } from '../../../../../hooks.server.js';
import { zod } from 'sveltekit-superforms/adapters';
import { addFormSchema } from '$lib/formSchema.js';
import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';

export const load = async ({params:{id}}) => {
    const product = await db.product.findUnique({
        where: { id: id }
    });

    return {
        form: await superValidate(product, zod(addFormSchema),{errors:false}),
        product: product
    };
};

export const actions = {
    default: async ({request, params:{id}}) => {
        const form = await superValidate(request, zod(addFormSchema.partial({file:true, image:true})));
        if(!form.valid){
            return fail(400, {form});
        }
		console.log('Action Edit called with form:', form);

        const product = await db.product.findUnique({where: { id:id }});
        if(!product) {
            console.log('Product not found for id:', id);
            return fail(404, { form, error: 'Product not found' });
        }
        
        console.log('product: ', product);
        
        let filePath = product.filePath;
        console.log('filePath: ', filePath);
        if(form.data.file) {
            await fs.unlink(filePath);
            filePath =`products/${Math.random()}-${form.data.file.name}`;
            await fs.writeFile(filePath,Buffer.from(await form.data.file.arrayBuffer()));
        }

        let imagePath = product.imagePath;
        console.log('imagePath: ', imagePath);
        if(form.data.image) {
            await fs.unlink(`static${imagePath}`);
            imagePath =`/products/${Math.random()}-${form.data.image.name}`;
            await fs.writeFile(`static${imagePath}`,Buffer.from(await form.data.image.arrayBuffer()));
        }

        try{
            await db.product.update({
                where: { id },
                data: {
                    name: form.data.name,
                    description: form.data.description,
                    priceInCents: form.data.priceInCents,
                    filePath,
                    imagePath
                }
            });
        }catch(error){
            console.log(error);
            return fail(500, { form, error: 'Failed to update product' });
        }

        throw redirect(303 ,'/admin/products');
    }
};