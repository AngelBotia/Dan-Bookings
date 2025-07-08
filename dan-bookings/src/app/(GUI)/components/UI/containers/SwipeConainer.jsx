import React, { useEffect, useRef, useState } from 'react'


export const SwipeConainer = ({children,onSwipeLeft=()=>{},onSwipeRigth=()=>{},threshold = 10 ,clasName = "",react = null}) => {
 const myElementRef = useRef(null);

 useEffect(() => {
      let hammer;

      (async () => {
        if (!myElementRef?.current) return;
      
        const Hammer = await import('hammerjs');
        hammer = new Hammer.default(myElementRef.current);
        if(!hammer) return
      
        hammer.get('pan').set({
          direction: Hammer.DIRECTION_HORIZONTAL,
          threshold,
        });
      
        hammer.on('swipeleft', onSwipeLeft);
        hammer.on('swiperight', onSwipeRigth);
      })();

    return () => {
      if (hammer) {
        hammer.stop();
        hammer.destroy();
      }
    };
  }, [react]);



  return (
    <section ref={myElementRef} className={clasName}>
      {children}
    </section>
    
  );
};

