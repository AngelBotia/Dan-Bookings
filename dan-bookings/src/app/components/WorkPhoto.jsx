'use client'
import React from 'react'
import Link from 'next/link';
import { useApplication } from '../context/AplicationProvider';

export const WorkPhoto = ({ work, order, typeOfCollage }) => {
    const { applicationContext,setApplicationContext } = useApplication();
    let { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE} = work;

    const fadeItAnimation = !applicationContext.isLoaded ? 'fade-in-animation': '';
    let orderItem = (Number(ORDER_INDEX) || Number(order))/10;
    
    const setLastPosMouse = (posMouse) => {
        setApplicationContext(prev => ({ ...prev, posMouse }));
    }
    const onClickImg = (event) => {
        const mousePos = event.clientX < window.innerWidth / 2 ?  'right' : 'left';
        setLastPosMouse(mousePos)
    }
    return (
        <Link   
        style={{
            backgroundImage: `url(${IMAGE_URL})`,
            viewTransitionName: `${URL}`, //TODO: CHECK VIEW TRANSITION
            '--order-delay':  `${orderItem}s`}}
        className={`img-porfolio
            ${fadeItAnimation} 
            ${typeOfCollage}${ORDER_INDEX}`}
        onClick={(event) => onClickImg(event)}
        href={`/${URL}`}>
        </Link>
    
    )
}
