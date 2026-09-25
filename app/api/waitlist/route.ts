import { joinWaitlist } from '@/db/waitlist';
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(origin && origin!==new URL(request.url).origin) return Response.json({error:'Please submit from the BLANK website.'},{status:403});
 if(Number(request.headers.get('content-length')||0)>2048) return Response.json({error:'Request too large.'},{status:413});
 let payload:unknown;
 try{payload=await request.json()}catch{return Response.json({error:'Please enter a valid email address.'},{status:400})}
 const value=payload && typeof payload==='object' && 'email' in payload ? (payload as {email:unknown}).email:null;
 if(typeof value!=='string'||value.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))return Response.json({error:'Please enter a valid email address.'},{status:400});
 try{await joinWaitlist(value.trim().toLowerCase());return Response.json({success:true},{status:201})}catch(error){console.error('Waitlist save failed',error);return Response.json({error:'We couldn’t save your place. Please try again in a moment.'},{status:503})}
}
