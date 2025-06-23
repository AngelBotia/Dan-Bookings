import '../../../styles/UI.css';
import Image from 'next/image'
import { useEffect, useState } from "react";
import { ImgsContainer } from '../../UI/containers/ImgsContainer';
import { UploadImgsIcon } from '../icons/UploadImgsIcon'


export const InputImgs = ({form,name,required,multiple=false}) => {
    const [formData, setformData] = form;

    const [imgs, setImgs] = useState(formData[name]);
    const  onChangeInput = async ({currentTarget}) =>{
        const { name:inputName, files } = currentTarget
        if (!files.length) return;
        
        const imgs = await prepareImgsBase64(files) || [];
        setformData(prev => ({...prev,[inputName]:imgs}))

        const allUrl = imgs?.map(img => img.URL_MEDIA)
        setImgs(allUrl);
    }
    const prepareImgsBase64 = (files) =>{
        return Promise.all([...files].map(async (file) => {
            const base64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const result = reader.result;
                const img = result.split(',')[1];
                resolve({img,URL_MEDIA:result});
              };
              reader.onerror = reject;
              reader.readAsDataURL(file);
            });
            let { img,URL_MEDIA } = base64;
            let { type } = file;
            return { img, URL_MEDIA, type };
        }));
    }
    const removeImg = (img) => {
      const updateImg = formData[name].filter(formImg =>formImg.URL_MEDIA != img);
      setformData(prev => ({...prev,[name]:updateImg}))
    }
    

    const showImgs = () =>{
      return imgs?.map((img,i) =>{ 
        return (
        <label key={name+i} className='img-InputImgs'>
          <Image 
            fill
            alt={name}   
            className='img-InputImgs'
            src={img.URL_MEDIA || img}
            onClick={(e)=> removeImg(img)} 
            />
        </label>
        
        )}) || null
          
    }
    useEffect(() => {
      if (formData[name]) {
        const allUrl = formData[name].map(img => img.URL_MEDIA);
        setImgs(allUrl);
      }
    }, [formData[name]]);

    return (
    !formData[name]?.length ?
    <label className='label-InputImgs' >
        <input 
            multiple = {multiple}
            type="file"
            name={name}
            onChange={(e)=>onChangeInput(e)}
            required={!!required}
            className='input-InputImgs'
            accept="image/jpeg, image/png, image/webp, image/gif, image/heic, image/heif, image/tiff, image/bmp, image/x-icon"
            />
        <UploadImgsIcon/>
    </label>
    :
    <ImgsContainer>
        {showImgs()}
    </ImgsContainer>

    )
}

