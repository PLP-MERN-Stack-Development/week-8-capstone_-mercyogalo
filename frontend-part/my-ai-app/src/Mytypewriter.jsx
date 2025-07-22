import Typewriter from 'react-typewriter-animate';
import "react-typewriter-animate/dist/Typewriter.css";
import React from 'react'

const Demo = () => {
  return (
    <div className='text-2xl mb-3 text-center text-red-500'>



      <Typewriter
        dataToRotate={[
          [{ type: "word", text: "Welcome" }],
          [{ type: "word", text: "Enter the female vaginal health question you have" }]
        ]}
      />

    </div>
  );
};

export default Demo;