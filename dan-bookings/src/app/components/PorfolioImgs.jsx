import '../styles/PorfolioImgs.css'
import '../styles/globals.css'
import { ContHorizonalScroll } from './ContHorizonalScroll';
import { WorkPhoto } from './WorkPhoto';
const PorfolioImgs = ({ porfolioData = [] }) => {

  const createItems = () => {
    return porfolioData?.map((work, index) => {
      return (
        <WorkPhoto key={work.id} work={work} order={work?.order || index} />
      )
    }) || [];
  }


  return (
    !!porfolioData?.length &&
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