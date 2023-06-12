'use client' 

import './globals.css'
import { Fuzzy_Bubbles } from 'next/font/google'
import { v4 } from "uuid";
import {useState} from 'react'; 

const fuzzyBubbles = Fuzzy_Bubbles({ weight: '700' })

export const metadata = {
  title: 'Bubble',
  description: 'Rant your heart out',
}

const bubbliness = 4;

const xsBubbles = bubbliness*7.5; 
const smBubbles = bubbliness*5; 
const mdBubbles = bubbliness*3; 
const lgBubbles = bubbliness*2; 

type BubbleLayer = 'layer1' | 'layer2' | 'layer3' | 'layer4';
type BubbleSize = 'bubble-xs' | 'bubble-sm' | 'bubble-md' | 'bubble-lg';

const layerBubbles: { [key: string]: { size: BubbleSize, bubbliness: number }} = {
  'layer1': {size: 'bubble-xs', bubbliness: xsBubbles},
  'layer2': {size: 'bubble-sm', bubbliness: smBubbles},
  'layer3': {size: 'bubble-md', bubbliness: mdBubbles},
  'layer4': {size: 'bubble-lg', bubbliness: lgBubbles},
};

const bubbleWobbleClassname = 'bubble-wobble';
const bubblePopClassname = 'bubble-pop';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const beat = new Audio('bubble-pop-sound.mp3');
  const [mutedByUser, setMutedByUser] = useState(false);
  beat.muted = true;

  const onMouseOverBubble = (bubbleElementId: string) => {
    const bubbleElement = document.getElementById(bubbleElementId);
    if (bubbleElement?.classList.contains(bubbleWobbleClassname)) {
      if (beat.muted && !mutedByUser) {
        beat.muted = false;
      };
      !beat.muted && beat.play();
      bubbleElement.classList.add(bubblePopClassname);
      setTimeout(() => bubbleElement.classList.add('hide'), 500);
    } else {
      bubbleElement?.classList.add(bubbleWobbleClassname);
    }
  };
  
  const fillBubbleLayer = (layer: BubbleLayer) => {
    const bubbles = [];
    for(var i = 0; i < layerBubbles[layer].bubbliness; i++) {
      const topPos = `${Math.random() * 100}%`;
      const leftPos = `${Math.random() * 100}%`;
      const id = v4();
      bubbles.push(
        <div 
          className={`bubble ${layerBubbles[layer].size}`} 
          style={{top: topPos, left: leftPos}}
          onMouseOver={(e) => onMouseOverBubble(e.currentTarget.id)}
          id={id}
          key={id}
        />
      );
    }
    return bubbles;
  }

  // Mute icon by https://icons8.com
  const renderMuteButton = () => {
    if (mutedByUser) {
      return (
        <img 
          src="icons8-mute-64.png" 
          alt="Mute_Icon.svg" 
          title="Mute icon" 
          onClick={() => setMutedByUser(false)}
        />
      )
      } else {
        return (
          <img 
            src="icons8-speaker-64.png" 
            alt="Speaker_Icon.svg" 
            title="Unmute/speaker icon" 
            onClick={() => setMutedByUser(true)}
          />
        )
    }
  };

  return (
    <html lang="en">
      <body className={fuzzyBubbles.className}>
        <div className='buttonContainer'>
          {renderMuteButton()}
        </div>
        <div className='layer layer1'>
          {fillBubbleLayer('layer1')}
        </div>
        <div className='layer layer2'>
          {fillBubbleLayer('layer2')}
        </div>
        <div className='layer layer3'>
          {fillBubbleLayer('layer3')}
        </div>
        <div className='layer layer4'>
          {fillBubbleLayer('layer4')}
        </div>
        {children}
      </body>
    </html>
  )
}
