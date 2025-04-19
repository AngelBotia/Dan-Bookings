import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import'../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import { WorkPhoto } from './WorkPhoto';

const PorfolioImgs = ( {porfolio} ) => {
  

  const createWorks = () => {
    if(!porfolio.works.length) return;
     return porfolio?.works?.map((work, index) => {
       return (
         <WorkPhoto 
         key={work.id} 
         work={work} 
         order={work?.order || index+1}
         typeOfCollage={porfolio?.typeOfCollage || 'collage-default'}  />
        )
      }) || [];
    }
    
  return (
    porfolio.works &&
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