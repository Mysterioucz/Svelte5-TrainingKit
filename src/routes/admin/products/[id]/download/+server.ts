import { db } from '../../../../../hooks.server.js';
import fs from 'fs/promises';

export const GET = async ({ params: { id } }) => {
	const product = await db.product.findUnique({
		where: { id: id },
		select: { filePath: true, name: true }
	});
	if (!product) {
		return new Response('Product not found', { status: 404 });
	}

	const { size } = await fs.stat(product.filePath);
	const file = await fs.readFile(product.filePath);
	const extension = product.filePath.split('.').pop();

	return new Response(file, {
		headers: {
			'Content-Type': `application/${extension}`,
			'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
			'Content-Length': size.toString()
		}
	});
};
