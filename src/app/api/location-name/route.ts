import {parseReversePlace} from '../../../lib/weather';

export const dynamic='force-dynamic';

export async function GET(request:Request){
 const url=new URL(request.url),latitude=Number(url.searchParams.get('latitude')),longitude=Number(url.searchParams.get('longitude'));
 if(!Number.isFinite(latitude)||latitude < -90||latitude > 90||!Number.isFinite(longitude)||longitude < -180||longitude > 180)return Response.json({error:'Invalid coordinates'},{status:400});
 const roundedLatitude=Math.round(latitude*100)/100,roundedLongitude=Math.round(longitude*100)/100;
 const query=new URLSearchParams({format:'jsonv2',lat:String(roundedLatitude),lon:String(roundedLongitude),zoom:'10',addressdetails:'1',layer:'address'});
 try{
  const response=await fetch('https://nominatim.openstreetmap.org/reverse?'+query,{headers:{Accept:'application/json','User-Agent':`SalokGame/1.0 (${url.origin})`},cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!response.ok)return Response.json({error:'Place-name service unavailable'},{status:502});
  const name=parseReversePlace(await response.json());
  return name?Response.json({name}):Response.json({error:'No nearby place found'},{status:404});
 }catch{return Response.json({error:'Place-name service unavailable'},{status:502})}
}
