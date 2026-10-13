import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Rain Catcher — A little rain, a little joy',description:'A cozy pixel-art game powered by the weather outside your window.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
