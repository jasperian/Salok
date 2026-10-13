'use client';
import {growthNames,MAX_GROWTH,plants,WATER_COST} from '../lib/garden';
import type {Progress} from '../lib/storage';

function PlantArt({stage,color}:{stage:number;color:string}){
 return <svg viewBox="0 0 120 130" role="img" aria-label={`${growthNames[stage]} growth stage`} shapeRendering="crispEdges">
  <path fill="#9b765a" d="M25 96h70l-8 29H33z"/><path fill="#c69d75" d="M20 90h80v12H20z"/><path fill="#5f5142" d="M29 88h62v6H29z"/>
  {stage===0&&<><rect x="54" y="82" width="12" height="7" rx="3" fill="#7d6547"/><path fill="#a88559" d="M58 76h5v8h-5z"/></>}
  {stage>0&&<><rect x="57" y={88-stage*16} width="7" height={stage*16+4} fill="#557d59"/>{Array.from({length:stage+1},(_,i)=><path key={i} fill={i%2?'#78a36c':'#679463'} d={`M${i%2?61:38} ${82-i*13}h22v8H${i%2?61:38}z`}/>)}</>}
  {stage===3&&<path fill="#829b69" d="M48 29h25v13H48zM54 23h13v25H54z"/>}
  {stage===4&&<><path fill={color} d="M42 15h35v12h12v28H77v12H42V55H30V27h12z"/><rect x="52" y="33" width="16" height="16" fill="#e3bd5e"/><rect x="45" y="20" width="8" height="8" fill="#ffffff55"/></>}
 </svg>
}

export default function VirtualGarden({progress,onWater,onChoose,onReplant,simulated,ready}:{progress:Progress;onWater:(i:number)=>void;onChoose:(i:number,p:number)=>void;onReplant:(i:number)=>void;simulated:boolean;ready:boolean}){
 return <section className="virtual-garden"><div className="garden-hero"><div><p className="eyebrow"><span/> MY VIRTUAL GARDEN</p><h2>Grow a little piece of the Philippines.</h2><p>Choose a flower for each plot, water it with the rain you catch, and watch it grow from a tiny seed into a full bloom.</p></div><div className="garden-water"><span>WATER TANK</span><strong>{progress.tank.toLocaleString()} <small>drops</small></strong><p>Each watering uses {WATER_COST} drops.</p></div></div>
 <div className="garden-stage-key">{growthNames.map((name,i)=><span key={name} className={i===0?'active':''}><i>{i+1}</i>{name}</span>)}</div>
 <div className="virtual-plots">{progress.garden.map((stage,index)=>{const plantIndex=progress.gardenPlants[index]??index,plant=plants[plantIndex],grown=stage===MAX_GROWTH;return <article className={'virtual-plot '+(grown?'in-bloom':'')} key={index}><div className="plot-top"><span>PLOT {index+1}</span><strong>{growthNames[stage]}</strong></div><PlantArt stage={stage} color={plant.color}/><label>Philippine flower<select aria-label={`Flower for plot ${index+1}`} value={plantIndex} disabled={!ready||stage!==0} onChange={e=>onChoose(index,Number(e.target.value))}>{plants.map((p,i)=><option value={i} key={p.name}>{p.name}</option>)}</select></label><h3>{plant.name}</h3><p>{plant.note}</p><div className="growth-track" aria-label={`${stage} of ${MAX_GROWTH} growth steps`}><i style={{width:`${stage/MAX_GROWTH*100}%`}}/></div>{grown?<button className="replant" onClick={()=>onReplant(index)}>↻ Plant another seed</button>:<button className="water-plant" disabled={!ready||simulated||progress.tank<WATER_COST} onClick={()=>onWater(index)}>💧 Water · {WATER_COST} drops</button>}</article>})}</div>
 <p className="garden-guidance">{simulated?'Practice weather cannot water your saved garden. Return to live weather first.':progress.tank<WATER_COST?'Catch rain, fill your bucket, then empty it into storage to water your flowers.':'Your stored rain is ready. Choose a plot to water.'}</p></section>
}
