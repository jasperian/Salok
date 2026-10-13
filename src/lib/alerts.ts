export type WeatherAlert='rain'|'dry'|'heavy'|null;
export const weatherAlert=(rain:number|null):WeatherAlert=>rain===null?null:rain===0?'dry':rain>7.5?'heavy':'rain';
export const alertText={rain:'🌧️ Beh, umuulan sa lugar niyo! Balde reveal na!',dry:'☀️ Walang ulan, bes. Balik ka mamaya!',full:'🪣 FULL NA ANG BALDE! Sana all puno!',heavy:'⛈️ GRABE ANG BUHOS! FREE WATER, MGA BEH!'} as const;
export function nextWeatherAlert(previous:WeatherAlert,current:WeatherAlert){return current!==null&&current!==previous?current:null;}
