import React, { useState } from 'react';
import Back from './back';
import Front from './front';
import styles from './body.module.css';
import CUIButton from '../customUI/cui-button';

export default function BodySvg({
  bodyPart,
  setBodyPart,
  exerciseInit,
  flipFront,
  setFlipFront,
}) {
  /*  motion的whileHover對於svg內的支援很差,當hover上去後,改動過的css效果會持續在那. */
  // const [flipFront, setFlipFront] = useState(true);
  // const [bodyPart, setBodyPart] = useState(null);

  const motionVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
    },
  };

  return (
    <>
      <div className={`${styles.container} `}>
        <div className={`${styles['flipped-container']}`}>
          {/* {flipFront ? (
          <Front
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            motionVariants={motionVariants}
          />
        ) : (
          <Back bodyPart={bodyPart} setBodyPart={setBodyPart} motionVariants={motionVariants} />
        )} */}
          <Front
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            flipFront={flipFront}
            motionVariants={motionVariants}
          />
          <Back
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            flipFront={flipFront}
            motionVariants={motionVariants}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CUIButton
          onClick={() => {
            setFlipFront((prev) => !prev);
          }}
          color={'light_grey'}
          sx={{ m: 1 }}
        >
          翻轉
        </CUIButton>
        <CUIButton
          onClick={() => {
            setBodyPart([exerciseInit]);
          }}
          color={'steel_grey'}
          sx={{ m: 1 }}
        >
          重置部位
        </CUIButton>
        {/* <div>{bodyPart && `所選部位: ${bodyPart[0].value}`}</div> */}
      </div>
    </>
  );
}
