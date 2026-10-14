import {palettes,mixColor,type DayPhase} from '../lib/daylight';
import {skinColors,type Character} from '../lib/garden';
import type {ShopState} from '../lib/shop';
import Phaser from 'phaser';
import {caughtByBucket} from './collision';
import {drawCatchBucket,drawCharacter,drawGarden,drawRainAtmosphere,drawSceneDecorations} from './streetArt';
import {drawBackground,type Background} from './backgrounds';
export type GameState={character:Character;shop:ShopState;garden:number[];gardenPlants?:number[];background:Background;mode:'active'|'idle';cupX:number|null;placeCup:(x:number)=>void;phase:DayPhase|null;rain:number|null;day:boolean;code:number;playing:boolean;bucket:number;catchDrop:()=>void};
export class RainScene extends Phaser.Scene {
 skyColor=0xb4d1c5; horizonColor=0xd6e2be; cloudColor=0xe2e9d8; tintColor=0xfff0ca; shade=0; light=0; sunY=54; lighting!:Phaser.GameObjects.Graphics; dropArt!:Phaser.GameObjects.Graphics; storeSign!:Phaser.GameObjects.Text; state:()=>GameState; art!:Phaser.GameObjects.Graphics; bucketArt!:Phaser.GameObjects.Graphics; drops:{x:number;y:number;speed:number}[]=[]; splashes:{x:number;y:number;life:number}[]=[]; x=480; target=480; timer=0; keys!:Record<string,Phaser.Input.Keyboard.Key>;
 bucketSprite?:Phaser.GameObjects.Image; bucketHands!:Phaser.GameObjects.Graphics;
 preload(){this.load.image('balde-bucket','/bucket-pixel.png');}
 constructor(state:()=>GameState){super('meadow');this.state=state;}
 create(){this.art=this.add.graphics();this.storeSign=this.add.text(303,313,'SARI-SARI STORE',{fontFamily:'monospace',fontSize:'14px',fontStyle:'bold',color:'#405a4e'}).setOrigin(.5);this.bucketArt=this.add.graphics();if(this.textures.exists('balde-bucket')){const texture=this.textures.get('balde-bucket');texture.add('pail',0,170,54,914,1164);this.bucketSprite=this.add.image(480,449,'balde-bucket','pail').setOrigin(.5,0).setDisplaySize(58,56);}this.bucketHands=this.add.graphics();this.lighting=this.add.graphics();this.dropArt=this.add.graphics();const keyboard=this.input.keyboard!;this.keys=keyboard.addKeys('LEFT,RIGHT,A,D') as Record<string,Phaser.Input.Keyboard.Key>;keyboard.removeCapture(['LEFT','RIGHT','A','D']);this.input.on('pointermove',(p:Phaser.Input.Pointer)=>{if(this.state().mode==='active')this.target=p.x});this.input.on('pointerdown',(p:Phaser.Input.Pointer)=>{const s=this.state(),x=Phaser.Math.Clamp(p.x,35,925);if(s.mode==='idle')s.placeCup(x);else this.target=x});}
 update(_time:number,delta:number){const s=this.state(),dt=Math.min(delta,40)/1000,g=this.art;g.clear();const phase=s.phase??'afternoon',night=phase==='evening',palette=palettes[phase],cloudy=(s.rain??0)>0||s.code>=3,blend=1-Math.exp(-dt*1.4);
 this.skyColor=mixColor(this.skyColor,cloudy?mixColor(palette.sky,0x768990,.48):palette.sky,blend);this.horizonColor=mixColor(this.horizonColor,cloudy?mixColor(palette.horizon,0x89948e,.55):palette.horizon,blend);this.cloudColor=mixColor(this.cloudColor,cloudy?mixColor(palette.cloud,0x75888a,.5):palette.cloud,blend);this.tintColor=mixColor(this.tintColor,palette.tint,blend);this.shade+=(palette.shade-this.shade)*blend;this.sunY+=(palette.celestialY-this.sunY)*blend;this.light+=((night?1:phase==='sunset'?.55:0)-this.light)*blend;
 for(let y=0;y<520;y+=8){g.fillStyle(mixColor(this.skyColor,this.horizonColor,Math.min(1,y/330)));g.fillRect(0,y,960,8)}
 const rect=(x:number,y:number,w:number,h:number,c:number)=>{g.fillStyle(c);g.fillRect(Math.round(x),Math.round(y),w,h)};
 if(night&&!cloudy){for(let i=0;i<40;i++)rect((i*173)%960,(i*67)%210,2,2,0xc3d8c4);}
 g.fillStyle(night?0xe9ebd0:phase==='sunset'?0xffd09a:0xf7e7ab,cloudy?.22:1);g.fillRect(752,this.sunY,46,46);g.fillRect(742,this.sunY+10,66,26);
 for(let i=0;i<6;i++){const x=((i*207+_time*.006)%1180)-130,y=40+(i%3)*44;rect(x,y+16,145,26,this.cloudColor);rect(x+22,y,89,48,this.cloudColor);rect(x+49,y-9,40,20,this.cloudColor);}
 drawBackground(g,_time,s.background,(s.rain??0)>0);this.storeSign.setVisible(s.background===0);
 drawGarden(g,s.garden,s.gardenPlants??[0,1,2],_time,s.shop.gardenDecorations);drawSceneDecorations(g,s.shop.streetDecorations,night);if((s.rain??0)>0)drawRainAtmosphere(g,_time,s.rain!);
 const previousX=this.x;
 const focused=document.activeElement,typing=focused instanceof HTMLInputElement||focused instanceof HTMLTextAreaElement||focused instanceof HTMLSelectElement||(focused instanceof HTMLElement&&focused.isContentEditable),blocked=typing||document.querySelector('[aria-modal="true"]')!==null;
 if(s.playing&&s.mode==='active'&&!blocked){if(this.keys.LEFT.isDown||this.keys.A.isDown)this.target=this.x-520*dt;if(this.keys.RIGHT.isDown||this.keys.D.isDown)this.target=this.x+520*dt;this.target=Phaser.Math.Clamp(this.target,35,925);this.x=Phaser.Math.Linear(this.x,this.target,Math.min(1,dt*15));}
 const catcherX=s.mode==='idle'?s.cupX:this.x,active=s.playing&&!blocked&&(s.rain??0)>0&&s.bucket<100&&catcherX!==null&&document.visibilityState==='visible';if(!active){this.drops=[];this.timer=0;}else{this.timer+=delta;const interval=s.rain!>7.5?110:s.rain!>2.5?230:450;if(this.timer>=interval){this.timer=0;this.drops.push({x:Phaser.Math.Between(25,935),y:-10,speed:Phaser.Math.Between(160,240)});}}
 const front=this.dropArt;front.clear();const frontRect=(x:number,y:number,w:number,h:number,c:number)=>{front.fillStyle(c);front.fillRect(Math.round(x),Math.round(y),w,h)};
 this.drops=this.drops.filter(d=>{const old=d.y;d.y+=d.speed*dt;const caught=catcherX!==null&&caughtByBucket(old,d.y,d.x,catcherX);if(caught){s.catchDrop();this.splashes.push({x:d.x,y:447,life:1});return false;}if(d.y>480){this.splashes.push({x:d.x,y:480,life:1});return false;}frontRect(d.x-3,d.y-8,6,12,0x276c79);frontRect(d.x-5,d.y,10,7,0x72d7db);frontRect(d.x-2,d.y-6,3,5,0xe7ffff);return true;});
 this.splashes=this.splashes.filter(p=>{p.life-=dt*3;for(let i=0;i<4;i++)frontRect(p.x+(i-1.5)*(1-p.life)*24,p.y-Math.sin(p.life*Math.PI)*15,3,3,0xc5efe0);return p.life>0});
 const spriteBucket=s.shop.bucketSkin==='bucket-classic'&&!!this.bucketSprite;
 if(s.mode==='active')drawCharacter(this.bucketArt,this.x,_time,Math.abs(this.x-previousX)>.2,s.bucket,s.character,s.shop.bucketSkin,spriteBucket);else{this.bucketArt.clear();if(s.cupX!==null){const cup=this.bucketArt,x=s.cupX;cup.fillStyle(0x334f50,.2);cup.fillEllipse(x,505,70,10);drawCatchBucket(cup,x,449,s.bucket,s.shop.bucketSkin,spriteBucket);}}
 if(this.bucketSprite){this.bucketSprite.setVisible(spriteBucket&&catcherX!==null);if(catcherX!==null)this.bucketSprite.setPosition(Math.round(catcherX),449);}
 this.bucketHands.clear();if(spriteBucket&&s.mode==='active'){this.bucketHands.fillStyle(skinColors[s.character.skin]);this.bucketHands.fillRect(Math.round(this.x)-32,449,9,9);this.bucketHands.fillRect(Math.round(this.x)+24,449,9,9);}
 const light=this.lighting;light.clear();light.fillStyle(this.tintColor,this.shade);light.fillRect(0,0,960,520);
 // Warm house windows and a streetlamp pool fade in after sunset.
 if(s.background===0){if(this.light>.01){light.fillStyle(0xffd492,this.light*.8);for(const [x,y,w,h] of [[226,247,53,35],[451,277,39,41],[334,245,45,36]])light.fillRect(x,y,w,h);light.fillStyle(0xffd699,this.light*.12);light.fillRect(216,239,74,55);light.fillRect(439,266,63,61);}light.fillStyle(0x65756e);light.fillRect(888,257,5,137);light.fillRect(871,254,22,5);light.fillStyle(this.light>.1?0xffdda4:0xbcc3ad);light.fillRect(867,259,16,5);if(this.light>.01){light.fillStyle(0xffdaa0,this.light*.1);light.fillTriangle(867,264,817,410,934,410);light.fillEllipse(876,410,112,14);light.fillStyle(0xffe9b4,this.light*.15);light.fillCircle(875,263,18);}}
 }
}




