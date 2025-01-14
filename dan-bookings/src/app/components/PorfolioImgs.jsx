'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../styles/PorfolioImgs.css'
const PorfolioImgs = () => {
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
  
        const handleMouseLeave = () => {
          isMouseDown = false;
        };
  
        const handleMouseUp = () => {
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
  
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('wheel', handleWheel);
        return () => {
          container.removeEventListener('mousedown', handleMouseDown);
          container.removeEventListener('mouseleave', handleMouseLeave);
          container.removeEventListener('mouseup', handleMouseUp);
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('wheel', handleWheel);
        };
    }, []);
    
  return (
    <div  ref={containerRef} className="container-horizontal-scrolling">
    <div className="grid">
        <div className="img-porfolio item1"></div>
        <div className="img-porfolio item2"></div>
        <div className="img-porfolio item3"></div>
        <div className="img-porfolio item4"></div>
        <div className="img-porfolio item5"></div>
        <div className="img-porfolio item6"></div>
        <div className="img-porfolio item7"></div>
        <div className="img-porfolio item8"></div>
        <div className="img-porfolio item9"></div>
        <div className="img-porfolio item10"></div>

      </div>
</div>
  )
}

export default PorfolioImgs