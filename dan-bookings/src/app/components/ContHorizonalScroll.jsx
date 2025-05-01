'use client'
import React, { useEffect, useRef } from 'react'

export const ContHorizonalScroll = ({children}) => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        const container = containerRef.current;
        let isMouseDown = false;
        let startX;
        let scrollLeft;

  
        const handleMouseDown = (e) => {
          isMouseDown = true;
          startX = e.pageX - container.offsetLeft;
          scrollLeft = container.scrollLeft;
        };
        const noIsDown = () => {
          isMouseDown = false;
        };
        const handleMouseMove = (e) => {
          e.preventDefault();
          if (!isMouseDown) return;
          const x = e.pageX - container.offsetLeft;
          const walk = (x - startX) * 50;
          container.scrollLeft = scrollLeft - walk;
        };
  
        const handleWheel = (e) => {
          e.preventDefault();
          if (e.deltaY !== 0) {
            container.scrollLeft += e.deltaY * 10;
          }
        };
        const isLaptop = (window.screen.width <= 1919 && window.screen.height <= 1079);
       if(!isLaptop){
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', noIsDown);
        container.addEventListener('mouseup', noIsDown);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('wheel', handleWheel);
       }
        return () => {
          container.removeEventListener('mousedown', handleMouseDown);
          container.removeEventListener('mouseleave', noIsDown);
          container.removeEventListener('mouseup', noIsDown);
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('wheel', handleWheel);
        };
    }, []);
  return (
    <div ref={containerRef} className="container-horizontal-scrolling">
        {children}
    </div>
  )
}
