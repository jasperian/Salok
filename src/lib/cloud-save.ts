import type {SupabaseClient} from '@supabase/supabase-js';
import {hasMeaningfulProgress,type Progress,validateProgress} from './storage';

export const SAVE_SCHEMA_VERSION=1;
export type CloudSave={progress:Progress;revision:number;updatedAt:string};
export type SyncChoice='local'|'cloud'|'same'|'none';

export function decideInitialSync(local:Progress,cloud:Progress|null):SyncChoice{
 if(!cloud)return hasMeaningfulProgress(local)?'local':'none';
 if(JSON.stringify(local)===JSON.stringify(cloud))return 'same';
 const localUsed=hasMeaningfulProgress(local),cloudUsed=hasMeaningfulProgress(cloud);
 if(localUsed&&cloudUsed)return 'none';
 return localUsed?'local':'cloud';
}

export async function loadCloudSave(client:SupabaseClient,userId:string):Promise<CloudSave|null>{
 const {data,error}=await client.from('player_saves').select('progress,schema_version,revision,updated_at').eq('user_id',userId).maybeSingle();
 if(error)throw error;if(!data)return null;
 if(data.schema_version!==SAVE_SCHEMA_VERSION)throw new Error('This cloud save uses a newer version of Salok.');
 const progress=validateProgress(data.progress);if(!progress)throw new Error('The cloud save could not be read safely.');
 return {progress,revision:data.revision,updatedAt:data.updated_at};
}

export async function createCloudSave(client:SupabaseClient,userId:string,progress:Progress){
 const {data,error}=await client.from('player_saves').insert({user_id:userId,progress,schema_version:SAVE_SCHEMA_VERSION}).select('progress,revision,updated_at').single();
 if(error)throw error;return {progress:validateProgress(data.progress)!,revision:data.revision,updatedAt:data.updated_at} as CloudSave;
}

export async function updateCloudSave(client:SupabaseClient,userId:string,progress:Progress,expectedRevision:number):Promise<CloudSave|null>{
 const {data,error}=await client.from('player_saves').update({progress,schema_version:SAVE_SCHEMA_VERSION,revision:expectedRevision+1}).eq('user_id',userId).eq('revision',expectedRevision).select('progress,revision,updated_at').maybeSingle();
 if(error)throw error;if(!data)return null;
 return {progress:validateProgress(data.progress)!,revision:data.revision,updatedAt:data.updated_at};
}
