import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import '../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import Link from 'next/link';
import { useApplication } from '../context/AplicationProvider';
import { usePortfolio } from '../context/PorfolioProvider';

const PorfolioImgs = ( {works} ) => {
  const { applicationContext:{ isLoaded },setApplicationContext } = useApplication();
  const { porfolioContext:{ typeOfCollage } } = usePortfolio();
  
  const onClickImg = (event) => {
    const mousePos = event.clientX < window.innerWidth / 2 ?  'right' : 'left';
    setApplicationContext(prev => ({ ...prev, ...{mousePos,isLoaded: true} }));
  }
  const createWorksImgs = () => {
    if(!works.length) return;
     return works?.map((work, index) => {
      let { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE} = work;
      const fadeItAnimation = !isLoaded ? 'fade-in-animation': '';
      let orderItem = (Number(ORDER_INDEX) || Number(order))/10;
      return (
        <Link 
          key={ID_WORK}
          style={{
            backgroundImage: `url(${IMAGE_URL || "/edit-icon.png"})`,
            viewTransitionName: `${URL}`, 
            '--order-delay': `${orderItem || index}s`
          }}
          className={`img-porfolio
            ${fadeItAnimation} 
            ${typeOfCollage || "collage-default"}${ORDER_INDEX || order}`}
          onClick={(event) => onClickImg(event)}
          href={`/${URL || ""}`}>
        </Link>
        )
      }) || [];
  }
  return (
    works &&
    <div className='porfolio-container'>
      <ContHorizonalScroll>
        <div className="grid-porfolio">
          {createWorksImgs()}
        </div>
      </ContHorizonalScroll>
    </div>

  )
}

export default PorfolioImgs