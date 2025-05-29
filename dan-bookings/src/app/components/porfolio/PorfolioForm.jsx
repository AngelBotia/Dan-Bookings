import { useState } from 'react';
import { InputImgs, } from '../UI/inputs/InputImgs';
import { InputText } from '../UI/inputs/InputText'
import { ToggleHidden } from '../UI/ToggleHidden';

export const PorfolioForm = ({errorMessages,labels,formState,onSubmit,children}) => {
  const [formData, setformData] = formState;

  return (
        <form className='form ' onSubmit={async (e)=> await onSubmit(e)}>
            
          <div style={{
           position:'relative',
           width:'30vw',
           height: '30vh'}}>
            <InputImgs
               form={formState}
               name={"IMAGE_URL"}
               required={true}
            />
          </div>

            <InputText 
                form={formState} 
                name={"WO_NAME"} 
                label={labels["WO_NAME"]} 
                title={errorMessages["WO_NAME"] } 
                required={true}/>

        

            {/* <InputText 
              form={formState} 
              name={"ORDER_INDEX"} 
              label={labels["title"]} 
              title={errorMessages["title"] } 
              required={false}/>

            <InputText 
              form={formState} 
              name={"IS_VISIBLE"} 
              label={labels["title"]} 
              title={errorMessages["title"] } 
              required={false}/> */}

              {children}
        </form>
    )
}