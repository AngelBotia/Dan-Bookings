import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import '../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import Link from 'next/link';
import { useApplication } from '../context/AplicationProvider';
import { usePortfolio } from '../context/PorfolioProvider';
import { PorfolioForm } from './PorfolioForm';

const PorfolioImgs = ( {works} ) => {
  const { applicationContext:{ isLoaded },setApplicationContext } = useApplication();
  const { porfolioContext:{ typeOfCollage } } = usePortfolio();
  
  const onClickImg = (event) => {
    const mousePos = event.clientX < window.innerWidth / 2 ?  'right' : 'left';
    setApplicationContext(prev => ({ ...prev, ...{mousePos,isLoaded: true} }));
  }
  const createWorksImgs = () => {
    return works?.map((work, index) => {
      let { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE } = work || {};
      if (!ID_WORK /** || !IS_VISIBLE*/) return null;
      return (
        <Link
          key={ID_WORK}
          style={{
            backgroundImage: `url(${IMAGE_URL})`,
            viewTransitionName: `${URL}`,
            '--order-delay': `${Number(ORDER_INDEX) / 10 || Number(index) / 10}s`
          }}
          className={`img-porfolio
               ${!isLoaded ? 'fade-in-animation' : ''} 
               ${typeOfCollage || "collage-default"}${Number(ORDER_INDEX) || index + 1}`}
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
          <PorfolioForm/>
        </div>
      </ContHorizonalScroll>
    </div>

  )
}

export default PorfolioImgs