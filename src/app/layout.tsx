import type { Metadata } from 'next';
import './globals.css';
import {AuthProvider} from '../components/AuthProvider';
export const metadata:Metadata={title:'Salok',applicationName:'Salok',appleWebApp:{capable:true,title:'Salok'},icons:{icon:'/icon-192.png?v=salok-1',apple:'/icon-apple.png?v=salok-1'},description:'A cozy pixel-art game powered by the weather outside your window.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><AuthProvider>{children}</AuthProvider></body></html>}
