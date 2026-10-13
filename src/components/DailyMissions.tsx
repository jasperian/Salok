'use client';
import {completedMissions,dailyMissions,dayKey,missionValue,type Progress} from '../lib/storage';

const icons:Record<string,string>={caught:'☂',filled:'▥',stored:'↓',watered:'✿',scenes:'⌖',phases:'☀'};

export default function DailyMissions({progress}:{progress:Progress}){
 const key=dayKey(),day=progress.missions?.[key],complete=completedMissions(progress,key),rewarded=progress.claimedDays?.includes(key);
 return <section className="daily-missions" aria-labelledby="daily-title"><div className="mission-head"><div><p className="eyebrow">TODAY’S LITTLE GOALS</p><h2 id="daily-title">Daily Rain Missions</h2><p>Complete any three with real play to earn one Rain Token.</p></div><div className={'token-reward '+(rewarded?'earned':'')}><span>RAIN TOKENS</span><strong>✦ {progress.tokens??0}</strong><small>{rewarded?'Today’s token earned':`${Math.min(complete,3)} / 3 for today`}</small></div></div><div className="mission-grid">{dailyMissions.map(m=>{const value=missionValue(day,m.kind),done=value>=m.goal;return <article className={done?'done':''} key={m.kind}><span className="mission-icon">{done?'✓':icons[m.kind]}</span><div><small>{done?'COMPLETE':'TODAY'}</small><h3>{m.name}</h3><p>{m.detail}</p><div className="mission-progress"><i style={{width:`${Math.min(100,value/m.goal*100)}%`}}/></div><b>{Math.min(value,m.goal)} / {m.goal}</b></div></article>})}</div><p className="mission-note">Practice weather never advances missions or awards tokens. Missions reset with your device’s local date.</p></section>;
}
