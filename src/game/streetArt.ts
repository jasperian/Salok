import {skinColors,shirtColors,type Character} from '../lib/garden';
import Phaser from 'phaser';

/** A hand-drawn, code-native pixel streetscape; no external image assets. */
export function drawStreet(g: Phaser.GameObjects.Graphics, time: number, night: boolean, wet: boolean) {
 const r=(x:number,y:number,w:number,h:number,c:number)=>{g.fillStyle(c);g.fillRect(Math.round(x),Math.round(y),w,h)};
 const wall=night?0x586875:0xc8c6ae, cream=night?0x787b77:0xe5d8b2;
 // Distant rooftops and tropical foliage.
 for(let i=0;i<14;i++){r(i*79,218+(i%3)*14,72,165,night?0x344959:0x9eafa3);r(i*79-4,214+(i%3)*14,80,7,night?0x45505b:0x82958b)}
 const palm=(x:number,y:number)=>{for(let i=0;i<9;i++)r(x+i*2,y+i*16,10,19,night?0x5e6250:0x988266);for(const direction of [-1,1])for(let i=0;i<5;i++){r(x+direction*i*17-(direction<0?16:0),y-20+i*i*2,27,10,night?0x325b51:0x648969);r(x+direction*i*12,y-30+i*6,20,8,night?0x3c6855:0x78976b)}};
 palm(873,164);palm(590,211);
 // Pastel concrete homes with corrugated roofs, jalousie windows and balcony.
 r(0,234,184,153,wall);r(8,228,176,8,0x727c78);r(18,257,52,53,night?0x2e4349:0x678b83);r(99,257,53,53,night?0x2e4349:0x678b83);
 for(let j=0;j<5;j++){r(20,261+j*9,48,3,0xa9bab0);r(101,261+j*9,49,3,0xa9bab0)}
 r(0,323,190,9,cream);for(let i=0;i<13;i++)r(i*15,331,3,50,night?0x485861:0xa0a695);r(0,345,186,4,cream);r(0,375,190,10,cream);
 r(197,217,207,170,night?0x626f71:0xc5d1ba);r(204,204,194,17,night?0x526975:0x789a9b);r(193,217,218,8,night?0x425960:0x567f80);for(let i=0;i<18;i++)r(204+i*11,205,3,12,0x9bafaa);
 r(217,240,70,51,night?0x96875b:0x7e9b90);r(226,247,53,35,night?0xf1cd88:0xb4c6ac);r(247,245,4,41,0x71837b);r(220,261,64,4,0x71837b);
 r(330,240,54,48,night?0x314753:0x708d87);for(let i=0;i<4;i++)r(334,245+i*10,45,3,0xb9c7b1);
 // Neighborhood sari-sari store: striped awning, open counter, tiny goods.
 r(210,298,186,31,night?0x75856b:0xe7d9a4);r(221,331,163,55,0x485b52);
 for(let i=0;i<12;i++){r(214+i*15,331,15,12,i%2?0xe5d6ac:0x9b6f55)}
 for(let i=0;i<11;i++){r(228+i*13,350,7,13,[0xbc9470,0x92afa0,0xd5bd79][i%3]);r(230+i*13,347,3,4,0xe1d1a5)}
 r(217,370,169,8,0xbba887);r(220,379,164,9,night?0x647669:0xa3b497);
 // A salmon house and its green gate.
 r(434,255,135,133,night?0x7b726d:0xd4aa8e);for(let i=0;i<4;i++)r(425+i*14,248-i*9,153-i*28,10,night?0x5f6870:0x8a918c);
 r(451,277,39,41,night?0xe8c386:0x92aba0);r(468,277,4,41,0x7a8273);r(451,295,39,4,0x7a8273);r(511,278,37,109,night?0x3c5d56:0x688777);for(let i=0;i<5;i++)r(515+i*7,284,2,96,0x94a594);
 // Low compound wall and hanging laundry.
 r(585,351,368,37,night?0x697676:0xc4c8b3);r(583,347,377,6,night?0x7f8780:0xdad9bd);r(626,275,4,74,0x8c8972);r(817,274,4,75,0x8c8972);r(628,279,192,2,0x696e63);
 for(let i=0;i<5;i++){const x=647+i*32,y=282+Math.sin(time*.001+i)*2,c=[0xd0ba92,0x7fa8a4,0xc6937e,0xcbd1b4,0x839ca8][i];r(x,y,22,31,c);r(x-5,y,32,10,c);r(x+3,y-3,3,5,0x695f51)}
 // Parked tricycle with sidecar and a small canvas canopy.
 for(const x of [726,810,855]){r(x,367,21,22,0x35494a);r(x+5,372,11,12,0x9ca89c)}
 r(716,346,109,23,night?0x4f7c78:0x729e90);r(758,329,64,41,night?0x608880:0xaac4b0);r(765,335,48,22,night?0x3e6268:0x72969a);r(730,317,104,8,0xd5cbb1);r(737,325,4,29,0xa2aaa0);r(818,325,4,37,0xa2aaa0);r(831,356,33,9,0x9aa9a0);r(845,339,5,24,0x566d67);r(837,337,15,4,0xc2cabb);r(719,353,10,6,0xe7d4a2);
 // Plants in repurposed pots along the sidewalk.
 for(const x of [30,166,410,577,911]){r(x,371,19,18,0x9f8166);r(x-2,369,23,5,0xc1a083);for(let i=0;i<4;i++){r(x+7,347-i*4,4,25,0x577757);r(x-9+i*5,347-i*6,14,7,night?0x44624e:0x749166)}}
 // Concrete curb and asphalt lane.
 r(0,389,960,20,night?0x737c7b:0xbcc0ae);r(0,409,960,7,night?0x4c6064:0x8e9b90);r(0,416,960,104,night?0x3f515c:0x899691);
 for(let i=0;i<12;i++){r(i*89,390,2,18,0x929e92);r(i*97+31,505,36,2,night?0x59656a:0xa4ada0)}
 for(const x of [100,603]){r(x,401,41,6,0x526961);for(let i=0;i<6;i++)r(x+4+i*6,401,2,5,0x899c8d)}
 if(wet){for(const [x,y,w] of [[53,464,107],[278,491,118],[594,442,84],[774,477,132]]){r(x,y,w,5,night?0x64868a:0xb4c9bf);r(x+14,y+5,w-30,3,night?0x577780:0x9bb7b1);r(x+22+Math.sin(time*.002)*4,y,24,2,0xd0dacf)}}
 // Utility pole and familiar overhead neighborhood wires.
 r(86,164,10,224,night?0x6a7065:0x9c9980);r(66,178,51,7,0x7b8172);r(73,170,6,12,0x565e58);r(103,170,6,12,0x565e58);
 g.lineStyle(2,night?0x263c4a:0x657e78,.8);for(let j=0;j<3;j++){g.beginPath();g.moveTo(0,166+j*10);for(let x=0;x<=960;x+=20)g.lineTo(x,166+j*10+Math.sin(x/960*Math.PI)*40);g.strokePath()}
}

export function drawCharacter(g:Phaser.GameObjects.Graphics,x:number,time:number,moving:boolean,fill:number,character:Character){
 const r=(dx:number,y:number,w:number,h:number,c:number)=>{g.fillStyle(c);g.fillRect(Math.round(x+dx),Math.round(y),w,h)};
 const step=moving?Math.sin(time*.018)*4:0,bob=moving?Math.abs(step)*.4:Math.sin(time*.003)*.7;
 g.clear();g.fillStyle(0x334f50,.25);g.fillEllipse(x,506,79,12);
 // Sandals, legs and shorts; animated steps follow the bucket movement.
 r(-17,481+step,12,17,skinColors[character.skin]);r(6,481-step,12,17,skinColors[character.skin]);r(-21,497+step,19,6,0x425c58);r(5,497-step,19,6,0x425c58);r(-18,471,37,15,0x476a6b);
 // Teal shirt and a round, dark-haired face.
 r(-22,424+bob,44,49,0x547f78);r(-16,425+bob,31,29,shirtColors[character.shirt]);r(-7,417+bob,14,12,skinColors[character.skin]);
 r(-21,381+bob,41,18,0x3d4741);r(-25,391+bob,49,22,0x3d4741);r(-19,396+bob,38,24,skinColors[character.skin]);r(-13,416+bob,26,7,skinColors[character.skin]);r(-24,401+bob,6,12,skinColors[character.skin]);r(19,401+bob,6,12,skinColors[character.skin]);
 r(-18,391+bob,16,8,0x3d4741);r(-2,388+bob,21,9,0x3d4741);r(-11,403+bob,4,4,0x364742);r(8,403+bob,4,4,0x364742);r(-3,414+bob,8,2,0x956a57);r(-16,410+bob,6,3,0xca8d6d);r(12,410+bob,6,3,0xca8d6d);
 if(character.hair===1){r(-27,390+bob,8,35,0x3d4741);r(20,390+bob,8,35,0x3d4741)}if(character.hair===2){r(-10,370+bob,22,16,0x3d4741);r(-6,367+bob,14,6,0x3d4741)}
 // Both arms reach forward to grip the rim. Its collision line stays at y=449.
 r(-29,430+bob,11,17,shirtColors[character.shirt]);r(20,430+bob,11,17,shirtColors[character.shirt]);r(-32,442,10,16,skinColors[character.skin]);r(23,442,10,16,skinColors[character.skin]);
 g.lineStyle(3,0xdad8b9);g.strokeCircle(x,453,22);r(-28,451,56,36,0x3d665d);r(-24,454,48,31,0xb8c5a7);r(-20,481-fill*.23,40,4+fill*.23,0x79b6b0);r(-30,449,60,6,0xe4e5c7);r(-20,460,5,18,0xe1e1c2);r(-22,485,44,5,0x52695e);r(-32,449,9,9,skinColors[character.skin]);r(24,449,9,9,skinColors[character.skin]);
}


export function drawGarden(g:Phaser.GameObjects.Graphics,growth:number[],time:number){
 growth.forEach((stage,i)=>{const x=600+i*45;g.fillStyle(0x9e7a62);g.fillRect(x,376,26,14);g.fillStyle(0xccaa81);g.fillRect(x-2,373,30,5);g.fillStyle(0x665e4a);g.fillRect(x+3,373,20,3);if(!stage)return;const y=373-stage*9;g.fillStyle(0x66896a);g.fillRect(x+11,y,4,375-y);for(let j=0;j<stage;j++){g.fillRect(x+2+(j%2)*12,365-j*8,13,5)}if(stage===4){const sway=Math.round(Math.sin(time*.001+i));g.fillStyle([0xd88c83,0xd5ba65,0xf2efcf][i]);g.fillRect(x+5+sway,y-8,16,12);g.fillRect(x+9+sway,y-12,8,20);g.fillStyle(0xdac786);g.fillRect(x+11+sway,y-4,4,4)}});
}
export function drawRainAtmosphere(g:Phaser.GameObjects.Graphics,time:number,rain:number){
 const count=rain>7.5?75:rain>2.5?45:24;g.lineStyle(1,0xd0e6df,.24);
 for(let i=0;i<count;i++){const x=(i*137+time*.013)%960,y=(i*79+time*.27)%510;g.lineBetween(x,y,x-3,y+9)}
 for(const [i,x] of [193,408,425,578].entries()){const y=250+((time*.18+i*42)%158);g.fillStyle(0xb7d8d0,.6);g.fillRect(x,y,2,7)}
 for(let i=0;i<9;i++){const phase=(time*.0008+i*.17)%1;g.lineStyle(1,0xd6e6dc,(1-phase)*.45);g.strokeEllipse(60+i*104,445+(i%3)*22,4+phase*25,2+phase*6)}
}
