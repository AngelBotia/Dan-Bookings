import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import'../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import { WorkPhoto } from './WorkPhoto';

const PorfolioImgs = ( {works,typeOfCollage="collage-default"} ) => {
    
  const createWorks = () => {
    if(!works.length) return;
     return works?.map((work, index) => {
      return (
         <WorkPhoto 
         key={work.ID_WORK} 
         work={work} 
         order={work?.ORDER_INDEX || index + 1}
         typeOfCollage={typeOfCollage || 'collage-default'}  />
        )
      }) || [];
    }
    
  return (
    works &&
    <div className='porfolio-container'>
    <ContHorizonalScroll>
      <div className="grid">
        {createWorks()}
      </div>
    </ContHorizonalScroll>
    </div>

  )
}

export default PorfolioImgs