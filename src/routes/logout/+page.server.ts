import { redirect } from '@sveltejs/kit';
import { db, lucia } from '../../hooks.server.js';

export const actions = {
    default: async ({cookies}) => {
        // Clear the session cookie
        console.log(cookies.getAll());
        const sessionId = cookies.get('auth_session') as string;
        // const sessionId = lucia.readSessionCookie(auth_session);
        console.log('Session ID:', sessionId);
        if(sessionId){
            await lucia.invalidateSession(sessionId);
            console.log('Session invalidated:', sessionId);
        }
        cookies.delete('session',{ path: '/'});

        throw redirect(303, '/login');

    }
};