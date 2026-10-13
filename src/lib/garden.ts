export const skinColors=[0xd9a67c,0xb98059,0x895b43];
export const shirtColors=[0x7aa399,0xc48772,0x839ac0,0xc2ad69];
export const hairNames=['Short','Bob','Bun','Side braid'];
export const outfitNames=['Everyday tee','Raincoat','Patterned poncho'];
export const accessoryNames=['None','Rain cap','Bucket hat','Rain boots'];
export type Character={skin:number;shirt:number;hair:number;outfit:number;accessory:number};
export const defaultCharacter:Character={skin:0,shirt:0,hair:0,outfit:0,accessory:0};
export const plants=[
 {name:'Gumamela',color:'#d86663',note:'Bright hibiscus blooms loved in Filipino gardens.'},
 {name:'Sampaguita',color:'#f5f0d8',note:'Small, fragrant flowers and the national flower.'},
 {name:'Waling-waling',color:'#a76bb1',note:'A celebrated Philippine orchid with regal color.'},
 {name:'Ylang-ylang',color:'#e1cf65',note:'Star-like flowers with a sweet evening fragrance.'},
 {name:'Santan',color:'#ef8b6d',note:'Clusters of tiny flowers often found by the roadside.'},
 {name:'Rosal',color:'#fff8e9',note:'Creamy gardenia blooms with a gentle scent.'},
 {name:'Jade Vine',color:'#55c9af',note:'Rare turquoise flower clusters native to Philippine forests.'},
 {name:'Bougainvillea',color:'#d65b9e',note:'Bright paper-like blooms that thrive along sunny fences.'},
 {name:'Dama de Noche',color:'#e9efc6',note:'A night-blooming favorite with a powerful evening fragrance.'},
 {name:'Cadena de Amor',color:'#e78ca8',note:'Delicate pink flower chains that tumble over garden edges.'},
 {name:'Anahaw',color:'#d7c75d',note:'The Philippine national leaf, grown here as a garden accent.'},
 {name:'Banaba',color:'#a878c2',note:'Lavender-purple blossoms from a beloved native shade tree.'}
] as const;
export const growthNames=['Seed','Sprout','Seedling','Budding','Bloom'] as const;
export const GARDEN_PLOTS=6;
export const WATER_COST=25;
export const MAX_GROWTH=4;
export const BLOOM_DURATION=3*24*60*60*1000;
export const MOISTURE_DURATION=2*24*60*60*1000;
export type GardenMeta={lastWateredAt:number|null;bloomedAt:number|null;seedHarvested:boolean};
export const emptyGardenMeta=():GardenMeta=>({lastWateredAt:null,bloomedAt:null,seedHarvested:false});
export function moistureLevel(meta:GardenMeta,now=Date.now()){if(!meta.lastWateredAt)return 0;return Math.max(0,Math.round(100-(now-meta.lastWateredAt)/MOISTURE_DURATION*100));}
export function bloomRemaining(meta:GardenMeta,now=Date.now()){return meta.bloomedAt===null?BLOOM_DURATION:Math.max(0,BLOOM_DURATION-(now-meta.bloomedAt));}
