export type ShopCategory='bucket'|'seed'|'garden'|'street';
export type ShopItem={id:string;category:ShopCategory;name:string;detail:string;cost:number;icon:string;colors:[string,string]};
export type ShopState={owned:string[];bucketSkin:string;gardenDecorations:string[];streetDecorations:string[]};

export const shopItems:ShopItem[]=[
 {id:'bucket-sky',category:'bucket',name:'Sky Blue Pail',detail:'A cool blue-and-cream rain catcher.',cost:1,icon:'▥',colors:['#2387bd','#e9e5c9']},
 {id:'bucket-sunshine',category:'bucket',name:'Sunshine Pail',detail:'Warm yellow with a terracotta band.',cost:2,icon:'▥',colors:['#e1bb3e','#bd6249']},
 {id:'bucket-sampaguita',category:'bucket',name:'Sampaguita Pail',detail:'A soft ivory pail with leafy green trim.',cost:3,icon:'✿',colors:['#f3eed9','#538069']},
 {id:'seed-6',category:'seed',name:'Jade Vine Seeds',detail:'Unlock Jade Vine for every garden plot.',cost:5,icon:'❧',colors:['#55c9af','#287b72']},
 {id:'seed-7',category:'seed',name:'Bougainvillea Seeds',detail:'Unlock bright Bougainvillea for every plot.',cost:2,icon:'✿',colors:['#d65b9e','#8b416d']},
 {id:'seed-8',category:'seed',name:'Dama de Noche Seeds',detail:'Unlock fragrant night-blooming flowers.',cost:3,icon:'☾',colors:['#e9efc6','#72835e']},
 {id:'seed-9',category:'seed',name:'Cadena de Amor Seeds',detail:'Unlock cascading pink flower chains.',cost:2,icon:'❀',colors:['#e78ca8','#9a5870']},
 {id:'seed-10',category:'seed',name:'Anahaw Seedling',detail:'Unlock an iconic Anahaw garden accent.',cost:3,icon:'♧',colors:['#d7c75d','#63845b']},
 {id:'seed-11',category:'seed',name:'Banaba Seeds',detail:'Unlock native purple Banaba blossoms.',cost:4,icon:'✾',colors:['#a878c2','#66517e']},
 {id:'garden-fence',category:'garden',name:'Bamboo Fence',detail:'A tiny bamboo border for your flower plots.',cost:2,icon:'╫',colors:['#c39b62','#7c6748']},
 {id:'garden-butterflies',category:'garden',name:'Butterfly Visitors',detail:'Little visitors flutter near your blooms.',cost:3,icon:'❀',colors:['#dc8b66','#8a6ba5']},
 {id:'garden-lantern',category:'garden',name:'Garden Lantern',detail:'A warm lamp beside the evening garden.',cost:4,icon:'◇',colors:['#e7bf69','#536e58']},
 {id:'street-bench',category:'street',name:'Kanto Bench',detail:'A small wooden bench by the roadside.',cost:3,icon:'▰',colors:['#9a704f','#5c685d']},
 {id:'street-bike',category:'street',name:'Neighborhood Bike',detail:'A parked bicycle for the street scene.',cost:4,icon:'○',colors:['#6b8790','#d2c69d']},
 {id:'street-parol',category:'street',name:'Parol Lights',detail:'Colorful star lanterns that glow at night.',cost:5,icon:'✦',colors:['#df8069','#edcf67']}
];
export const shopIds=new Set(shopItems.map(item=>item.id));
export const defaultShop=():ShopState=>({owned:['bucket-classic'],bucketSkin:'bucket-classic',gardenDecorations:[],streetDecorations:[]});
