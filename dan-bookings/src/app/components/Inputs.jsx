import { useState } from "react";

export const InputImgs = ({form,name,label,imgsForm,required}) => {
    const [formData, setformData] = form;
    const [imgs, setImgs] = useState(imgsForm);

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
  return (
    !formData[name] ?
        <input //TODO: STYLE
            // multiple
            type="file"
            name={name}
            onChange={(e)=>onChangeInput(e)}
            required={!!required}
            //TODO: accept=
            />
    :
    imgs?.map((img,i) =>{ return (<img key={name+i} src={img}/>)}) || null
    )

}

export const InputText = ({form,name,label,required,type="text",title}) => {
    const [formData, setformData] = form;
    const onChangeInput=(e)=>{
        const { name, value } = e.currentTarget;
        setformData(prev => ({...prev,[name]:value}))
    }
  return (
    <label>
        {label || "(?)"}
        <input 
            type={type}
            name={name} 
            value={formData[name] ?? ""} 
            pattern={type != "email" ? "^[a-zA-ZñÑ ]+$" : undefined} 
            onInput={(e)=>onChangeInput(e)}
            title={title || "No se permiten cararcteres especiales"}
            required={!!required}/>
    </label>  
    )
}