import { addFormSchema } from '$lib/formSchema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, superValidate } from 'sveltekit-superforms';
import fs from 'fs/promises';
import { db } from '../../../../hooks.server';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	return {
		form: await superValidate(zod(addFormSchema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await fs.mkdir('products', { recursive: true });
			const filePath = `products/${Math.random()}-${form.data.file.name}`;
			await fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));

			await fs.mkdir('static/products', { recursive: true });
			const imagePath = `/products/${Math.random()}-${form.data.image.name}`;
			await fs.writeFile(`static${imagePath}`, Buffer.from(await form.data.image.arrayBuffer()));
			try {
				await db.product.create({
					data: {
						name: form.data.name,
						description: form.data.description,
						priceInCents: form.data.priceInCents,
						filePath,
						imagePath,
						isAvailableForPurchase: false
					}
				});
				return { success: true };
			} catch (error) {
				console.log(error);
			}

			redirect(303, '/admin/products');
		} catch (error) {
			console.error('Error creating product:', error);
			return fail(500, { form, error: 'Failed to create product' });
		}
	}
};
