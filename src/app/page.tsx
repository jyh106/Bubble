'use client';

import { ChangeEvent, useEffect, useState} from "react";

const RantBubbleHeightDefault = 100;
const RantBubbleWidthDefault = 100;

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default function Home() {
  const [topLayerBubbles, setTopLayerBubbles] = useState<HTMLElement[]>();
  const [rantLength, setRantLength] = useState(0);
  const [rantBubbleHeight, setRantBubbleHeight] = useState(RantBubbleHeightDefault);
  const [rantBubbleWidth, setRantBubbleWidth] = useState(RantBubbleWidthDefault);
  const [selectedRantBubble, setSelectedRantBubble] = useState<HTMLElement>();
  
  const beat = new Audio('bubble-pop-sound.mp3');

  let oldValue = 0;
  const onRanting = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValueLength = e.target.value.length;
    setRantLength(newValueLength - oldValue);
    oldValue = newValueLength;
  };

  useEffect(() => {
    const bubbles = Array.from(document.getElementsByClassName('bubble') as HTMLCollectionOf<HTMLElement>);
    const selectedBubble = bubbles[randomNumber(0, bubbles.length)];
    setTopLayerBubbles(bubbles);
    setSelectedRantBubble(selectedBubble);
    selectedBubble.style.width = `${rantBubbleWidth}px`;
    selectedBubble.style.height = `${rantBubbleHeight}px`;
  }, []);

  useEffect(() => {
    setRantBubbleHeight(rantBubbleHeight + (rantLength * 0.02));
    setRantBubbleWidth(rantBubbleWidth + (rantLength * 0.02));

    const pumpBubble = () => {
      if (!selectedRantBubble) {
        return;
      }
      selectedRantBubble.style.width = `${rantBubbleWidth}px`;
      selectedRantBubble.style.height = `${rantBubbleHeight}px`;

      if (Number(selectedRantBubble.style.opacity) < 1 && (rantBubbleHeight < 200)) {
        selectedRantBubble.style.opacity = `${Number(selectedRantBubble.style.opacity) + 0.1}`;
        if (Number(selectedRantBubble.style.zIndex) < 1) {
          selectedRantBubble.style.zIndex = '1';
        }
      }
    };

    const selectNewBubble = () => {
      setRantBubbleHeight(RantBubbleHeightDefault);
      setRantBubbleWidth(RantBubbleWidthDefault);
      topLayerBubbles && setSelectedRantBubble(topLayerBubbles[randomNumber(0, topLayerBubbles.length)]);
    };

    const popBubble = () => {
      if (!selectedRantBubble) {
        return;
      }
      console.log('called pop');
      
      beat.play();
      console.log('played');
      selectedRantBubble.classList.add('hide');

      selectNewBubble();
    };

    pumpBubble();

    const debouncePop = debounce(popBubble, 410);

    if (selectedRantBubble && rantBubbleHeight > 450 && !selectedRantBubble?.classList.contains('bubble-pop')) {
      selectedRantBubble.classList.add('rant-bubble-wobble');
      selectedRantBubble.classList.add('bubble-pop');
      debouncePop();
    }

  }, [rantLength]);

  return (
   <div>
    <main>
      <div className="textareaContainer">
        <textarea
          className="rantArea"
          placeholder="The Gremlin is saying..."
          onChange={onRanting}
        />
      </div>
    </main>
   </div>
  )
}
