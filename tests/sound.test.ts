import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Sound} from '../src/lib/sound';

test('music switches MP3 tracks, loops, updates volume, and stops on none',()=>{
 const created:MockAudio[]=[];
 class MockAudio {
  src:string;loop=false;preload='';volume=1;paused=true;currentTime=0;pauseCalls=0;playCalls=0;
  constructor(src:string){this.src=src;created.push(this)}
  play(){this.paused=false;this.playCalls++;return Promise.resolve()}
  pause(){this.paused=true;this.pauseCalls++}
 }
 const previous=globalThis.Audio;
 globalThis.Audio=MockAudio as unknown as typeof Audio;
 const sound=new Sound();
 try{
  sound.setMusic('window');
  assert.equal(created[0].src,'/Morning%20Sun.mp3');
  assert.equal(created[0].loop,true);
  assert.equal(created[0].playCalls,1);
  sound.setMusic('window');
  assert.equal(created.length,1);
  sound.volume(.2,false);
  assert.equal(created[0].volume,.2);
  sound.setMusic('kanto');
  assert.equal(created[0].pauseCalls,1);
  assert.equal(created[1].src,'/Kanto%20Daydream.mp3');
  sound.setMusic('province');
  assert.equal(created[2].src,'/Quiet%20Courtyard.mp3');
  sound.setMusic('none');
  assert.equal(created[2].pauseCalls,1);
  assert.equal(sound.musicAudio,null);
 }finally{sound.setMusic('none');globalThis.Audio=previous}
});
