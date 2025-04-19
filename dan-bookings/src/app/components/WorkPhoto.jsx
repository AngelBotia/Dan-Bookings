'use client'
import React from 'react'
import Link from 'next/link';
import { useAplication } from '../context/AplicationProvider';

export const WorkPhoto = ({ work, order, typeOfCollage }) => {
    const { applicationContext,setApplicationContext } = useAplication();

    const fadeItAnimation = !applicationContext.isLoaded ? 'fade-in-animation': '';
    
    const setLastPosMouse = (posMouse) => {
        setApplicationContext(prev => ({ ...prev, posMouse: posMouse }));
    }
    const onClickImg = (idImg, event) => {
        const mousePos = event.clientX < window.innerWidth / 2 ? 'left' : 'right'
        setLastPosMouse(mousePos)
        // window.location.href = window.location.href.concat(idImg)
    }
    return (
        <Link   style={{
            backgroundImage: `url(${work.url})`,
            viewTransitionName: `${work.id}`,
            '--order-delay':  `${order/10}s`
        }}
        className={`img-porfolio
            ${fadeItAnimation} 
            ${typeOfCollage}${order}`}
            onClick={(event) => onClickImg(work.id, event)}
         href={`/${work.id}`}>
        <div
        style={{
            backgroundImage: `url(${work.url})`,
            viewTransitionName: `${work.id}`,
            '--order-delay':  `${order/10}s`
        }}
        className={`img-porfolio
            ${fadeItAnimation} 
            ${typeOfCollage}${order}`}
            onClick={(event) => onClickImg(work.id, event)}
            >

        </div>
        </Link>
        // 
    )
}
