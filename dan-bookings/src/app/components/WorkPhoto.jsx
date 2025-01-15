'use client'
import React from 'react'

export const WorkPhoto = ({ work, order }) => {
    const onClickImg = (idImg, event) => {
        window.location.href = window.location.href.concat(idImg)
    }
    return (
        <div
            style={{
                backgroundImage: `url(${work.url})`,
                viewTransitionName: `${work.id}`
            }}
            className={`img-porfolio item${order + 1}`}
            onClick={(event) => onClickImg(work.id, event)}
        />
    )
}
