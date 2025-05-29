import Link from 'next/link'
import Image from 'next/image'
import '../../styles/porfolio/Porfolio.css'
import '../../styles/porfolio/collages/collage1.css'
import '../../styles/porfolio/collages/collageDefault.css'

//**TODO: MAKE A COMPONENT CANT KWNOW HOW IS DRAG AND CHANGE WORK SELECTED */
export const PorfolioImgs = ({works=[],formState}) => {
    const [formData ,setFormData]  = formState;
    let isLoaded,typeOfCollage = false;

    const createLinkImgs = () => {
        return works?.map((work, index) => {
          const { ID_WORK, URL, ORDER_INDEX, IMAGE_URL, IS_VISIBLE,isSelected } = work || {};
          if ( !ID_WORK ) return null;
          
          const fadeIn = !isLoaded ? 'fade-in-animation' : ''
          const order = Number(ORDER_INDEX) || index + 1
          const collage = typeOfCollage ? `${typeOfCollage}${order}` :`collage-default${order}`
         
          const className=`img-porfolio ${fadeIn} ${collage}`
          return (
                  <Link href={`/${URL}`} key={ID_WORK} className={className}> 
                          <Image
                              alt={URL}
                              fill
                              src={IMAGE_URL}
                              className={className}
                              style={{
                                  viewTransitionName: `${URL}`,
                                  '--order-delay': `${Number(ORDER_INDEX) / 10 || Number(index) / 10}s`
                              }}
                          />
                  </Link> 
                )
        }) || [];
      }
    const onWorkSelected = (event,work) => {
      const { IMAGE_URL } = work;

      const workToShow = {
        ...work,
        IMAGE_URL: [IMAGE_URL]
      }
      setFormData(workToShow)
    }
   

    return (
      formData.ID_WORK ? 
        <h1 className=''>
         esta seleccionado?  
        </h1>
        :
         createLinkImgs()
       
    )
}