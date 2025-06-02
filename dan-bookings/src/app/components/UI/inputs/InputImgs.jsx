import '../../../styles/UI.css';
import Image from 'next/image'
import { useEffect, useState } from "react";
import { IconSvg } from '../IconSvg'
import { ImgsContainer } from '../../UI/containers/ImgsContainer';



export const InputImgs = ({form,name,required,multiple=false}) => {
    const [formData, setformData] = form;

    const [imgs, setImgs] = useState(formData[name]);
    const  onChangeInput = async ({currentTarget}) =>{
        const { name:inputName, files } = currentTarget
        if (!files.length) return;
        
        const imgs = await prepareImgsBase64(files) || [];
        setformData(prev => ({...prev,[inputName]:imgs}))

        const allUrl = imgs?.map(img => img.imgSrc)
        setImgs(allUrl);
    }
    const prepareImgsBase64 = (files) =>{
        return Promise.all([...files].map(async (file) => {
            const base64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const result = reader.result;
                const img = result.split(',')[1];
                resolve({img,imgSrc:result});
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
            let { img,imgSrc } = base64;
            let { type } = file;
            return { img, imgSrc, type };
        }));
    }

    const showImgs = () =>{
      return imgs?.map((img,i) =>{ return (
        <Image key={name+i}  alt={name} fill  className='img-InputImgs'  src={img}/>)}) || null
    }
    useEffect(() => {
      if (formData[name]) {
        const allUrl = formData[name].map(img => 
          typeof img === 'string' ? img : img.imgSrc
        );
        setImgs(allUrl);
      }
    }, [formData[name]]);

    return (
    !formData[name] ?
    <label className='label-InputImgs' >
      <IconSvg svg={"/icons/upload-Icon.svg"} className={"Icon-InputImgs-upload"}/>
        <input 
            multiple = {multiple}
            type="file"
            name={name}
            onChange={(e)=>onChangeInput(e)}
            required={!!required}
            className='input-InputImgs'
            accept="image/jpeg, image/png, image/webp, image/gif, image/heic, image/heif, image/tiff, image/bmp, image/x-icon"
            />
    </label>
    :
    <ImgsContainer>
        <button style={{zIndex:3,position:'absolute'}} type='button' onClick={()=> setformData(prev => ({...prev,[name]:""}))}>ClearAll</button>
        {showImgs()}
    </ImgsContainer>

    )
}

