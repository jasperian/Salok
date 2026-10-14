'use client';
import {createContext,useCallback,useContext,useEffect,useMemo,useState,type ReactNode} from 'react';
import type {SupabaseClient,User} from '@supabase/supabase-js';
import {createSupabaseBrowserClient,supabaseConfigured} from '../lib/supabase/browser';

type Result={error?:string;message?:string};
type AuthValue={client:SupabaseClient|null;configured:boolean;user:User|null;loading:boolean;signUp:(email:string,password:string)=>Promise<Result>;signIn:(email:string,password:string)=>Promise<Result>;signInWithGoogle:()=>Promise<Result>;requestPasswordReset:(email:string)=>Promise<Result>;updatePassword:(password:string)=>Promise<Result>;signOut:()=>Promise<Result>};
const AuthContext=createContext<AuthValue|null>(null);

export function AuthProvider({children}:{children:ReactNode}){
 const client=useMemo(createSupabaseBrowserClient,[]),[user,setUser]=useState<User|null>(null),[loading,setLoading]=useState(true);
 useEffect(()=>{if(!client){setLoading(false);return}void client.auth.getUser().then(({data})=>{setUser(data.user);setLoading(false)});const {data}=client.auth.onAuthStateChange((_event,session)=>{setUser(session?.user??null);setLoading(false)});return()=>data.subscription.unsubscribe()},[client]);
 const signUp=useCallback(async(email:string,password:string):Promise<Result>=>{if(!client)return{error:'Accounts are not configured yet.'};const {data,error}=await client.auth.signUp({email,password,options:{emailRedirectTo:`${location.origin}/auth/callback`}});return error?{error:error.message}:{message:data.session?'Account created.':'Check your email to verify your account.'}},[client]);
 const signIn=useCallback(async(email:string,password:string):Promise<Result>=>{if(!client)return{error:'Accounts are not configured yet.'};const {error}=await client.auth.signInWithPassword({email,password});return error?{error:error.message}:{}},[client]);
 const signInWithGoogle=useCallback(async():Promise<Result>=>{if(!client)return{error:'Accounts are not configured yet.'};const {error}=await client.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${location.origin}/auth/callback`}});return error?{error:error.message}:{}},[client]);
 const requestPasswordReset=useCallback(async(email:string):Promise<Result>=>{if(!client)return{error:'Accounts are not configured yet.'};const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:`${location.origin}/auth/callback?next=${encodeURIComponent('/?reset=1')}`});return error?{error:error.message}:{message:'Check your email for a password reset link.'}},[client]);
 const updatePassword=useCallback(async(password:string):Promise<Result>=>{if(!client)return{error:'Accounts are not configured yet.'};const {error}=await client.auth.updateUser({password});return error?{error:error.message}:{message:'Your password has been updated.'}},[client]);
 const signOut=useCallback(async():Promise<Result>=>{if(!client)return{};const {error}=await client.auth.signOut();return error?{error:error.message}:{}},[client]);
 return <AuthContext.Provider value={{client,configured:supabaseConfigured,user,loading,signUp,signIn,signInWithGoogle,requestPasswordReset,updatePassword,signOut}}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value;}
