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
 {name:'Rosal',color:'#fff8e9',note:'Creamy gardenia blooms with a gentle scent.'}
] as const;
export const growthNames=['Seed','Sprout','Seedling','Budding','Bloom'] as const;
export const WATER_COST=25;
export const MAX_GROWTH=4;
