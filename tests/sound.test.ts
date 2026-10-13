import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Sound} from '../src/lib/sound';

test('music switches notes immediately, preserves unchanged playback, and stops on none',()=>{
 const notes:{frequency:{value:number};stops:number;disconnected:boolean}[]=[];
 const sound=new Sound();
 sound.ctx={currentTime:0,createOscillator(){
  const note={frequency:{value:0},stops:0,disconnected:false,type:'sine',onended:null,
   connect(){},start(){},stop(){this.stops++},disconnect(){this.disconnected=true}};
  notes.push(note);return note;
 },createGain(){return {gain:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}}}} as unknown as AudioContext;
 sound.gain={} as GainNode;
 try{
  sound.setMusic('window');
  assert.equal(notes[0].frequency.value,261.63);
  const timer=sound.musicTimer;
  sound.setMusic('window');
  assert.equal(sound.musicTimer,timer);
  assert.equal(notes.length,1);
  sound.setMusic('kanto');
  assert.equal(notes[0].stops,2);
  assert.equal(notes[0].disconnected,true);
  assert.equal(notes[1].frequency.value,220);
  sound.setMusic('province');
  assert.equal(notes[1].disconnected,true);
  assert.equal(notes[2].frequency.value,196);
  sound.setMusic('none');
  assert.equal(notes[2].disconnected,true);
  assert.equal(sound.musicTimer,null);
  assert.equal(sound.musicNotes.size,0);
 }finally{sound.setMusic('none')}
});
