import {NextResponse} from 'next/server';
import {createSupabaseServerClient} from '../../../lib/supabase/server';

export async function GET(request:Request){
 const url=new URL(request.url),code=url.searchParams.get('code'),next=url.searchParams.get('next')||'/';
 const safeNext=next.startsWith('/')&&!next.startsWith('//')?next:'/';
 const client=await createSupabaseServerClient();
 if(code&&client){const {error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(safeNext,url.origin));}
 return NextResponse.redirect(new URL('/?authError=callback',url.origin));
}
