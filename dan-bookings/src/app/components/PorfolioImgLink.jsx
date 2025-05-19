import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PorfolioImgLink = ({work={}}) => {
    const { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE } = work;
    let isLoaded,typeOfCollage = false;
    return (
        <Link href={`/${URL}`}
                className={`img-porfolio ${!isLoaded ? 'fade-in-animation' : ''} 
                ${typeOfCollage || "collage-default"}${Number(ORDER_INDEX) || index + 1}`}
        >
            <Image
                alt={URL}
                fill
                src={IMAGE_URL}
                style={{
                    viewTransitionName: `${URL}`,
                    '--order-delay': `${Number(ORDER_INDEX) / 10 || Number(index) / 10}s`
                }}

              
            />
        </Link>
    )
}
