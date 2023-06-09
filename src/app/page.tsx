'use client';

import { ChangeEvent } from "react";

export default function Home() {
  const onRanting = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    console.log(newValue.length);
  };

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
      {/* <div className="ball"></div> */}
      {/* <div className="shadow"></div> */}
    </main>
   </div>
  )
}
