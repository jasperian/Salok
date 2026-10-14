import type {MetadataRoute} from 'next';
export default function manifest():MetadataRoute.Manifest{return {name:'Salok',short_name:'Salok',description:'Umuulan na, magsalok ka na!',start_url:'/',scope:'/',display:'standalone',background_color:'#f7f8f2',theme_color:'#416851',icons:[{src:'/icon-192.png?v=salok-1',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/icon-512.png?v=salok-1',sizes:'512x512',type:'image/png',purpose:'any'}]}}

