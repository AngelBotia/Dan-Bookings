'use client'
import React from 'react'

export const WorkPhoto = ({ work, order,typeOfCollage}) => {
    const onClickImg = (idImg, event) => {
        const mousePos =  event.clientX < window.innerWidth / 2 ? 'left' : 'right'
        const posParam = `?pos=${mousePos}`
        window.location.href = window.location.href.concat(idImg+posParam)
    }
    return (
        <div
            style={{
                backgroundImage: `url(${work.url})`,
                viewTransitionName: `${work.id}`
            }}
            className={`img-porfolio ${typeOfCollage}${order}`}
            onClick={(event) => onClickImg(work.id, event)}
        />
    )
}
