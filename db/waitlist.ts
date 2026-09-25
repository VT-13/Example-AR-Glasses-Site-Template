import { env } from 'cloudflare:workers';
export async function joinWaitlist(email:string){
 if(!env.DB) throw new Error('Waitlist database unavailable');
 await env.DB.prepare('INSERT INTO waitlist (email) VALUES (?) ON CONFLICT(email) DO NOTHING').bind(email).run();
}
