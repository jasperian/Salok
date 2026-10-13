'use client';
import {plants} from '../lib/garden';
import {backgroundNames} from '../game/backgrounds';
import {phaseLabels,type DayPhase} from '../lib/daylight';
import type {Progress} from '../lib/storage';

const weather=[
 {key:'light',name:'Light drizzle',icon:'☂',hint:'Visit the game during a real light drizzle.'},
 {key:'moderate',name:'Steady rain',icon:'☔',hint:'Visit when real rain reaches a steady shower.'},
 {key:'heavy',name:'Heavy downpour',icon:'⛈',hint:'Visit during a real heavy downpour.'}
] as const;
const scenes=[
 {icon:'🏘️',note:'Spend a moment on the barangay street.'},
 {icon:'🌊',note:'Choose the seaside promenade background.'},
 {icon:'🌾',note:'Choose the rice-field path background.'}
] as const;
const phases:(DayPhase)[]=['morning','afternoon','sunset','evening'];
const phaseIcons:Record<DayPhase,string>={morning:'🌤️',afternoon:'☀️',sunset:'🌇',evening:'🌙'};

function Card({found,icon,title,detail}:{found:boolean;icon:string;title:string;detail:string}){
 return <article className={'memory-card '+(found?'found':'locked')}><div className="memory-art" aria-hidden="true"><span>{found?icon:'?'}</span></div><div><small>{found?'DISCOVERED':'STILL TO FIND'}</small><h4>{found?title:'Mystery memory'}</h4><p>{found?detail:'Hint: '+detail}</p></div></article>;
}

export default function RainyScrapbook({progress}:{progress:Progress}){
 const d=progress.discoveries,total=d.flowers.length+d.scenes.length+d.weather.length+d.phases.length,max=plants.length+backgroundNames.length+weather.length+phases.length;
 return <section className="rainy-scrapbook" aria-labelledby="scrapbook-title">
  <div className="scrapbook-hero"><div><p className="eyebrow">YOUR RAINY DAY MEMORIES</p><h2 id="scrapbook-title">Rainy Day Scrapbook</h2><p>Fill these pages by growing local flowers, exploring scenes, and returning as the weather and sky change.</p></div><div className="scrapbook-count"><span>MEMORIES FOUND</span><strong>{total}<small> / {max}</small></strong><div><i style={{width:`${total/max*100}%`}}/></div></div></div>
  <ScrapSection title="Philippine flower album" kicker={`${d.flowers.length} OF ${plants.length} BLOOMS`} intro="A bloom joins the album the first time it reaches its final growth stage.">{plants.map((plant,index)=><Card key={plant.name} found={d.flowers.includes(index)} icon="✿" title={plant.name} detail={d.flowers.includes(index)?plant.note:`Grow a ${plant.name} from seed to bloom in your garden.`}/>)}</ScrapSection>
  <ScrapSection title="Places you have stayed awhile" kicker={`${d.scenes.length} OF ${backgroundNames.length} SCENES`} intro="Every background becomes a postcard as soon as you visit it.">{backgroundNames.map((name,index)=><Card key={name} found={d.scenes.includes(index)} icon={scenes[index].icon} title={name} detail={scenes[index].note}/>)}</ScrapSection>
  <ScrapSection title="Weather moments" kicker={`${d.weather.length} OF ${weather.length} WEATHER TYPES`} intro="Only fresh, real weather readings count toward this page.">{weather.map(item=><Card key={item.key} found={d.weather.includes(item.key)} icon={item.icon} title={item.name} detail={item.hint}/>)}</ScrapSection>
  <ScrapSection title="Light across the neighborhood" kicker={`${d.phases.length} OF ${phases.length} TIMES`} intro="Natural local daylight unlocks these memories; preview lighting does not.">{phases.map(item=><Card key={item} found={d.phases.includes(item)} icon={phaseIcons[item]} title={phaseLabels[item]} detail={`Visit during the local ${item}.`}/>)}</ScrapSection>
 </section>;
}

function ScrapSection({title,kicker,intro,children}:{title:string;kicker:string;intro:string;children:React.ReactNode}){
 return <section className="scrap-section"><div className="scrap-heading"><div><h3>{title}</h3><p>{intro}</p></div><span>{kicker}</span></div><div className="memory-grid">{children}</div></section>;
}
