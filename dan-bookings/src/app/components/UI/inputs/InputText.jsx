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