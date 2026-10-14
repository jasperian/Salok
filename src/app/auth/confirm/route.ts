import type {EmailOtpType} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';
import {createSupabaseServerClient} from '../../../lib/supabase/server';

export async function GET(request:Request){
 const url=new URL(request.url),tokenHash=url.searchParams.get('token_hash'),type=url.searchParams.get('type') as EmailOtpType|null,next=url.searchParams.get('next')||'/';
 const safeNext=next.startsWith('/')&&!next.startsWith('//')?next:'/';
 const client=await createSupabaseServerClient();
 if(tokenHash&&type&&client){const {error}=await client.auth.verifyOtp({type,token_hash:tokenHash});if(!error)return NextResponse.redirect(new URL(safeNext,url.origin));}
 return NextResponse.redirect(new URL('/?authError=confirmation',url.origin));
}
