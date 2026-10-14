import type {SolarDay} from './daylight';
export type Weather = {rain: number | null; temperature: number | null; code: number; day: boolean; updated: number; observed: number; timezone:string|null; solar:SolarDay[]};
export type Place = {name: string; latitude: number; longitude: number};
type ReverseAddress = {city?:unknown;municipality?:unknown;town?:unknown;village?:unknown;county?:unknown;state?:unknown;region?:unknown;country?:unknown};
export function parseReversePlace(data:unknown):string|null{
 if(!data||typeof data!=='object')return null;
 const address=(data as {address?:unknown}).address;if(!address||typeof address!=='object')return null;
 const a=address as ReverseAddress,text=(value:unknown)=>typeof value==='string'&&value.trim()?value.trim():null;
 const local=text(a.city)??text(a.municipality)??text(a.town)??text(a.village)??text(a.county),region=text(a.state)??text(a.region),country=text(a.country);
 const parts=[local,region,country].filter((value,index,all):value is string=>Boolean(value)&&all.indexOf(value)===index);
 return parts.length?parts.join(', '):null;
}
export function parseWeather(data: {current?: Record<string, unknown>;timezone?:unknown;daily?:{sunrise?:unknown[];sunset?:unknown[]}}): Weather {
 const c=data.current; if(!c) throw new Error('Missing current weather');
 const valid=(v:unknown):v is number=>typeof v==='number' && Number.isFinite(v) && v>=0;
 const rain=valid(c.rain)&&valid(c.showers)?c.rain+c.showers:null;
 const observed=typeof c.time==='number'?c.time*1000:NaN;
 if(!Number.isFinite(observed)||Date.now()-observed>30*60*1000||observed>Date.now()+300000) throw new Error('Weather reading is stale');
 let timezone:string|null=null;if(typeof data.timezone==='string'){try{new Intl.DateTimeFormat('en',{timeZone:data.timezone});timezone=data.timezone}catch{}}
 const solar:SolarDay[]=[];data.daily?.sunrise?.forEach((rise,i)=>{const set=data.daily?.sunset?.[i];if(valid(rise)&&valid(set)&&rise>0&&set>rise)solar.push({sunrise:rise*1000,sunset:set*1000})});
 return {timezone,solar,rain,temperature:typeof c.temperature_2m==='number'?c.temperature_2m:null,code:typeof c.weather_code==='number'?c.weather_code:3,day:c.is_day===1,updated:Date.now(),observed};
}
export function intensity(r:number|null){return r===null?'Unknown':r===0?'No rain':r<=2.5?'Light rain':r<=7.5?'Moderate rain':'Heavy rain'}
export async function fetchWeather(p:Place,signal:AbortSignal){const q=new URLSearchParams({latitude:String(p.latitude),longitude:String(p.longitude),current:'temperature_2m,precipitation,rain,showers,weather_code,is_day',timeformat:'unixtime',timezone:'auto',daily:'sunrise,sunset',forecast_days:'2'});const r=await fetch('https://api.open-meteo.com/v1/forecast?'+q,{signal});if(!r.ok)throw new Error('Weather unavailable');return parseWeather(await r.json());}
export async function searchCities(name:string,signal:AbortSignal):Promise<Place[]>{const r=await fetch('https://geocoding-api.open-meteo.com/v1/search?count=6&language=en&format=json&name='+encodeURIComponent(name),{signal});if(!r.ok)throw new Error('City search unavailable');const d=await r.json();return (d.results??[]).map((v:{name:string;admin1?:string;country:string;latitude:number;longitude:number})=>({name:[v.name,v.admin1,v.country].filter(Boolean).join(', '),latitude:v.latitude,longitude:v.longitude}));}
export async function reverseGeocode(latitude:number,longitude:number,signal:AbortSignal):Promise<string|null>{
 const q=new URLSearchParams({format:'jsonv2',lat:String(latitude),lon:String(longitude),zoom:'10',addressdetails:'1',layer:'address'});
 const r=await fetch('https://nominatim.openstreetmap.org/reverse?'+q,{signal,headers:{Accept:'application/json'}});
 if(!r.ok)throw new Error('Place name unavailable');
 return parseReversePlace(await r.json());
}

