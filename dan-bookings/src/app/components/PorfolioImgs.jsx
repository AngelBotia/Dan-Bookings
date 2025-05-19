import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import '../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import Link from 'next/link';
import { usePortfolio } from '../context/PorfolioProvider';
import { PorfolioForm } from './PorfolioForm';
import { getUserSession } from '../hooks/useUser';
import { useState } from 'react';
import {PorfolioImgLink} from './PorfolioImgLink';

const PorfolioImgs = ( {works} ) => {  
  const [workSelected, setWorkSelected] = useState({ID_WORK:null});
  const { porfolioContext:{ typeOfCollage,isLoaded,mousePos },setPorfolioContext } = usePortfolio();
  const { user, isAdmin } = getUserSession();
  
  
  const onClickImg = (event) => {
    const mousePos = event.clientX < window.innerWidth / 2 ?  'right' : 'left';
    setPorfolioContext(prev => ({ ...prev, ...{mousePos,isLoaded: true} }));
  }
  const createWorksImgs = () => {
    return works?.map((work, index) => {
      let { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE } = work || {};
      if (!ID_WORK /** || !IS_VISIBLE*/) return null;
      return (
        <PorfolioImgLink key={ID_WORK} work={work}/>
      )
    }) || [];
  }

  //**TODO: MAKE A COMPONENT CANT KWNOW HOW IS DRAG AND CHANGE WORK SELECTED */
  return (
    works &&
    <div className='porfolio-container'>
      <ContHorizonalScroll>
        <div className="grid-porfolio">
          {createWorksImgs()}
          {isAdmin && <PorfolioForm work={workSelected}/>}
        </div>
      </ContHorizonalScroll>
    </div>

  )
}

export default PorfolioImgs