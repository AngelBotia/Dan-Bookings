export const InputText = ({form,name,label,required,type="text",title}) => {
    const [formData, setformData] = form;
    const onChangeInput=(e)=>{
        const { name, value } = e.currentTarget;
        setformData(prev => ({...prev,[name]:value}))
    }
  return (
    <div className="form-item">
        <input
          className="input-InputText"
          id={name}
          name={name}
          type={type}
          value={formData[name] ?? ""}
          placeholder=" "
          pattern={type !== "email" ? "^[a-zA-ZñÑ ]+$" : undefined}
          onInput={(e) => onChangeInput(e)}
          title={title || "No se permiten caracteres especiales"}
          required={!!required}
          autoComplete="off"
        />
        <label className="label-InputText" htmlFor={name}>
          {label || "(?)"}
        </label>
    </div>
  
    )
}