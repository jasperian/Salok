'use client';
import {useEffect,useRef} from 'react';
import Phaser from 'phaser';
import {RainScene, type GameState} from '../game/RainScene';
export default function GameCanvas({state}:{state:GameState}){const host=useRef<HTMLDivElement>(null),latest=useRef(state);latest.current=state;useEffect(()=>{if(!host.current)return;const game=new Phaser.Game({type:Phaser.AUTO,parent:host.current,width:960,height:520,pixelArt:true,backgroundColor:'#b4d1c5',scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:new RainScene(()=>latest.current),input:{keyboard:true,touch:true},audio:{noAudio:true}});return()=>game.destroy(true)},[]);return <div ref={host} className="game-canvas" aria-label="Interactive Philippine neighborhood street. Move the character holding the bucket with arrow keys, A and D, mouse, or touch." role="application"/>}


