import type Phaser from 'phaser';
import {drawStreet} from './streetArt';

export const backgroundNames=['Barangay street','Seaside promenade','Rice-field path'] as const;
export type Background=0|1|2;
export function validBackground(value:unknown):Background{return value===1||value===2?value:0;}

export function drawBackground(g:Phaser.GameObjects.Graphics,time:number,background:Background,wet:boolean){
 if(background===0){drawStreet(g,time,false,wet);return;}
 const r=(x:number,y:number,w:number,h:number,c:number)=>{g.fillStyle(c);g.fillRect(Math.round(x),Math.round(y),w,h)};
 if(background===1){
  // A coastal barangay: distant islands, bancas, palms, and a walk by the sea.
  for(let i=0;i<7;i++){const x=i*170-40;r(x,246+(i%3)*9,210,47,0x849f9a);r(x+32,230+(i%3)*9,122,20,0x849f9a)}
  r(0,288,960,93,0x77aaa8);for(let i=0;i<13;i++){const x=(i*97+time*.007)%1000-30,y=307+i%4*18;r(x,y,43,3,0xb5d6cb);r(x+55,y+9,22,2,0xcde2d0)}
  for(const x of [151,700]){r(x,315,92,6,0x694f42);r(x+16,322,62,4,0x8c6850);r(x+43,271,3,44,0xeee7ca);g.fillStyle(0xe4d7ad);g.fillTriangle(x+44,274,x+44,308,x+73,305)}
  for(const x of [55,883]){r(x,249,13,148,0x927c5c);for(let j=0;j<4;j++){r(x+j*3,256+j*34,12,12,0x927c5c)}for(const direction of [-1,1])for(let j=0;j<4;j++)r(x+direction*j*19-(direction<0?20:0),238+j*7,31,9,0x5f8e6b)}
  r(0,371,960,32,0xe3d2a8);for(let i=0;i<29;i++)r(i*35,379,23,3,0xf4e6c5);
  r(0,401,960,15,0xb8b6a0);r(0,416,960,104,0x8a9990);for(let i=0;i<11;i++)r(i*94+24,504,45,3,0xd0d2b7);
  for(const x of [280,540,819]){r(x,346,6,48,0x6e7770);r(x-5,342,16,6,0xd6bf82);r(x-12,392,32,5,0x657f72)}
 }else{
  // A rural path with layered hills, paddies, coconut trees, and a nipa hut.
  g.fillStyle(0x91aaa0);g.fillTriangle(0,311,160,183,341,311);g.fillTriangle(223,313,468,171,714,313);g.fillTriangle(604,318,839,203,960,318);
  g.fillStyle(0x719b78);g.fillTriangle(0,343,225,259,510,343);g.fillTriangle(339,349,731,251,960,349);
  r(0,337,960,58,0x83ab79);for(let i=0;i<12;i++){const x=i*88;r(x,352+(i%3)*7,82,5,0xb4bd78);r(x+3,365+(i%3)*7,77,3,0xcee09a)}
  r(688,282,146,103,0x9b8461);r(708,308,35,35,0x536a5a);r(783,306,33,34,0x536a5a);g.fillStyle(0x705f4e);g.fillTriangle(664,286,759,226,859,286);r(678,285,166,11,0x886d51);
  for(const x of [82,572,900]){r(x,249,11,143,0x927b5f);for(const direction of [-1,1])for(let j=0;j<5;j++)r(x+direction*j*17-(direction<0?22:0),235+j*8,27,8,0x618c62)}
  r(0,392,960,18,0xb1aa7e);r(0,410,960,110,0xa39b78);for(let i=0;i<12;i++){r(i*85,430+i%2*16,52,3,0xc4ba90);r(i*91+25,503,45,3,0xcac398)}
  for(const x of [36,359,625,870]){r(x,375,24,16,0x927354);r(x-2,372,28,5,0xc3a276);r(x+9,350,4,23,0x548568);r(x+1,356,13,5,0x6f9b72);r(x+13,346,12,5,0x6f9b72)}
 }
 if(wet){for(const [x,y,w] of [[83,467,100],[340,488,132],[666,451,112]]){r(x,y,w,5,0xacc8ba);r(x+17,y+5,w-29,2,0xd2ded0)}}
}
