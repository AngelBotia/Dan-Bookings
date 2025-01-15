'use client'
import React, { useEffect, useRef, useState } from 'react'
import '../styles/PorfolioImgs.css'
import { useRouter } from 'next/router';
const PorfolioImgs = ({porfolioData = []}) => {
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
  
        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mouseleave', noIsDown);
        container.addEventListener('mouseup', noIsDown);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('wheel', handleWheel);
        return () => {
          container.removeEventListener('mousedown', handleMouseDown);
          container.removeEventListener('mouseleave', noIsDown);
          container.removeEventListener('mouseup', noIsDown);
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    const onClickImg = (idImg,event) =>{
      window.location.href = window.location.href.concat(idImg)
    }
    
    const createItems = ()=>{
      return porfolioData?.map((item,index)=>{
        return (
          <div 
          key={item.id}
          style={{backgroundImage:`url(${item.url})`,
                  viewTransitionName:`${item.id}`}}
          className={`img-porfolio item${index + 1}`}
          onClick={(event)=>onClickImg(item.id,event)}

          />
        )
      }) || [];
    }


  return (
  !!porfolioData?.length &&
    <div  ref={containerRef} className="container-horizontal-scrolling">
      <div className="grid">
        {createItems()}
      </div>
    </div>
  )
}

export default PorfolioImgs