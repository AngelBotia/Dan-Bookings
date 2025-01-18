import '../styles/PorfolioImgs.css'
import '../styles/porfolioCollages/collage1.css'
import'../styles/porfolioCollages/collageDefault.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import { WorkPhoto } from './WorkPhoto';
const PorfolioImgs = ({ porfolioData = {} }) => {
  const createItems = () => {
    return porfolioData?.works?.map((work, index) => {
      return (
        <WorkPhoto 
        key={work.id} 
        work={work} 
        order={work?.order || index+1}
        typeOfCollage={porfolioData?.typeOfCollage || 'collage-defaul'}  />
      )
    }) || [];
  }


  return (
    porfolioData &&
    <div className='porfolio-container'>
    <ContHorizonalScroll>
      <div className="grid">
        {createItems()}
      </div>
    </ContHorizonalScroll>
    </div>

  )
}

export default PorfolioImgs