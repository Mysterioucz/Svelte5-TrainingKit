import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/formSchema';
import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db, lucia } from '../../hooks.server.js';

export const load = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	default: async (event) => {
		console.log('Login action triggered');
		const form = await superValidate(event, zod(loginSchema));
		console.log('Form data:', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		//  For testing
		// const userId = generateId(15);
		// const hashedPassword = await new Argon2id().hash(form.data.password);
		// await db.user.create({
		//     data:{
		//         email: 'sphade@gmail.com',
		//         hashedPassword,
		//         username: form.data.username,
		//         isAdmin: true,
		//         id: userId
		//     }
		// });

		// const session = await lucia.createSession(userId, {});
		// const sessionCookie = lucia.createSessionCookie(session.id);
		// event.cookies.set(sessionCookie.name, sessionCookie.value, {
		//     path:'.',
		//     ...sessionCookie.attributes
		// });
		// throw redirect(303, '/admin');
		//  End testing

		const existingUser = await db.user.findUnique({
			where: {
				username: form.data.username.toLowerCase()
			}
		});

		let session;
		if (!existingUser) {
			console.log('User does not exist, Creating new user');
			const hashedPassword = await new Argon2id().hash(form.data.password);
			const userId = generateId(15);
			await db.user.create({
				data: {
					email: `${form.data.username}@gmail.com`,
					hashedPassword,
					username: form.data.username,
					isAdmin: false,
					id: userId
				}
			});
			session = await lucia.createSession(userId, {});
		} else {
			console.log('User exists, checking password');
			// User exists, check password
			const validPassword = await new Argon2id().verify(
				existingUser.hashedPassword!,
				form.data.password
			);

			if (!validPassword) {
				console.log('Invalid password');
				alert('Invalid password');
				return; // TODO if password is incorrect
			}
			session = await lucia.createSession(existingUser.id, {});

		}

		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		if(existingUser?.isAdmin) {
			throw redirect(302, '/admin');
		}else{
			throw redirect(302, '/');
		}
	}
};
