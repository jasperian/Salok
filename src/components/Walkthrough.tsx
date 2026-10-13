'use client';
import {useState} from 'react';

const steps=[
 {icon:'☁',eyebrow:'WELCOME, KA-ULAN',title:'Catch the weather outside.',body:'Choose your location so the game can read fresh local weather. Collectible drops appear only when real rain is detected.',tip:'Your precise coordinates are never displayed or saved.'},
 {icon:'🪣',eyebrow:'CHOOSE YOUR PACE',title:'Move the bucket—or leave a cup.',body:'Active catcher lets you move with the arrow keys, A/D, mouse, or touch. Idle cup lets you place a cup in the street and leave it catching while the game stays open.',tip:'An idle cup must reach 100 drops before it can be poured.'},
 {icon:'▥',eyebrow:'SAVE EVERY DROP',title:'Pour collected rain into storage.',body:'Active buckets can store any amount. Your stored water stays on this device and can be spent in your virtual garden.',tip:'Practice weather never changes saved progress.'},
 {icon:'✿',eyebrow:'GROW SOMETHING LOVELY',title:'Turn rain into Philippine blooms.',body:'Visit Garden, choose flowers for three plots, and water them through Seed, Sprout, Seedling, Budding, and Bloom.',tip:'You can replant a plot after its flower blooms.'}
] as const;

export default function Walkthrough({onClose,onNeverShow}:{onClose:()=>void;onNeverShow:()=>void}){
 const [step,setStep]=useState(0),current=steps[step],last=step===steps.length-1;
 return <div className="walkthrough-backdrop"><section className="walkthrough" role="dialog" aria-modal="true" aria-labelledby="walkthrough-title"><button className="close" onClick={onClose} aria-label="Close walkthrough">×</button><div className="walk-icon" aria-hidden="true">{current.icon}</div><p className="eyebrow">{current.eyebrow}</p><h2 id="walkthrough-title">{current.title}</h2><p className="walk-body">{current.body}</p><p className="walk-tip">✦ {current.tip}</p><div className="walk-dots" aria-label={`Step ${step+1} of ${steps.length}`}>{steps.map((_,i)=><i key={i} className={i===step?'current':''}/>)}</div><div className="walk-actions"><button className="walk-never" onClick={onNeverShow}>Don’t show this again</button><span>{step>0&&<button onClick={()=>setStep(i=>i-1)}>Back</button>}<button className="primary" onClick={()=>last?onNeverShow():setStep(i=>i+1)}>{last?'Start catching':'Next'}</button></span></div></section></div>
}
