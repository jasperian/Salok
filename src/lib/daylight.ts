export type DayPhase='morning'|'afternoon'|'sunset'|'evening';
export type SolarDay={sunrise:number;sunset:number};
export type SolarData={timezone:string|null;solar:SolarDay[];day:boolean};
export const phaseLabels:Record<DayPhase,string>={morning:'Morning glow',afternoon:'Afternoon light',sunset:'Sunset glow',evening:'Evening calm'};
export function localDate(now:number,timezone:string){return new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(now)}
export function dayPhase(now:number,data:SolarData|null):DayPhase|null{
 if(!data)return null;if(!data.timezone)return data.day?'afternoon':'evening';
 const timezone=data.timezone;const today=localDate(now,timezone),sun=data.solar.find(s=>localDate(s.sunrise,timezone)===today);
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:data.timezone,hour:'2-digit',hourCycle:'h23'}).format(now));
 if(!sun)return data.day?(hour<12?'morning':'afternoon'):'evening';
 const minute=60000;if(now>=sun.sunset-60*minute&&now<sun.sunset+30*minute)return 'sunset';
 if(now<sun.sunrise-30*minute||now>=sun.sunset+30*minute)return 'evening';return hour<12?'morning':'afternoon';
}
export const palettes={morning:{sky:0xb9d7ce,horizon:0xf6dfaf,cloud:0xf3ead1,tint:0xf9d192,shade:.07,celestialY:126},afternoon:{sky:0x91c7d4,horizon:0xd6e2be,cloud:0xf0f1db,tint:0xfff0ca,shade:0,celestialY:54},sunset:{sky:0x998ba9,horizon:0xf0b08c,cloud:0xe9b49b,tint:0xeaa278,shade:.17,celestialY:191},evening:{sky:0x24354f,horizon:0x5d677e,cloud:0x516079,tint:0x182d50,shade:.48,celestialY:65}};
export function mixColor(a:number,b:number,t:number){const channel=(shift:number)=>Math.round(((a>>shift)&255)*(1-t)+((b>>shift)&255)*t);return (channel(16)<<16)|(channel(8)<<8)|channel(0)}

