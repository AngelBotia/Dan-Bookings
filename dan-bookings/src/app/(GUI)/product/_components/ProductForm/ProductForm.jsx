"use client"
import '../Porfolio/Porfolio.css'
import React from 'react'
import { useApplication } from '../../../application/application.hook';
import { ToggleHidden } from '../../../shared/components/modals/ToggleHidden'
import { InputImgs } from '../../../shared/components/inputs/InputImgs'
import { InputText } from '../../../shared/components/inputs/InputText'


export const ProductForm = ({ formState, onDelete, onSubmit }) => {
    const [formData ,setFormData] = formState;
    const { getTranslation } = useApplication();
    const {
        actions,
        porfolio: {
            errorMessages,
            labels
        } } = getTranslation();

    const onLoadForm = (e) => {
        if (!formData?.pos) return;
        const { pos: { x, y } } = formData || {};

        const formWidth = e.currentTarget.offsetWidth

        //changes the side when are close to borders
        let left = x < (window.innerWidth / 2) ? x : x - formWidth;
        //check dont overflow the view
        left = Math.max(0, Math.min(left, window.innerWidth - formWidth));

        e.currentTarget.style.left = `${left}px`
    }
    
    return (
        <ToggleHidden isOpen={formData} onClose={() => { setFormData(null) }}>
            <form onLoad={(e) => onLoadForm(e)} className='form-porfolio fade-in-animation fast-animation' onSubmit={async (e) => await onSubmit(e)}>
                {/* <InputImgs
                    form={formState}
                    name={"IMAGE_URL"}
                    required={true}
                    multiple={true}
                />

                <InputText
                    form={formState}
                    name={"WO_NAME"}
                    label={labels["WO_NAME"]}
                    title={errorMessages["WO_NAME"]}
                    required={true} />

                <InputText
                    form={formState}
                    name={"CATEGORY"}
                    label={"CATEGORY"}
                    title={errorMessages["WO_NAME"]}
                    required={true} /> */}

                <footer>
                    <button type='submit' className='button-porfolio submit-porfolio'>{actions.send}</button>
                    {formData?.ID_WORK && <button type='reset' className='button-porfolio reset-porfolio' onClick={(e) => onDelete(e)}>{actions.delete}</button>}
                </footer>
            </form>
        </ToggleHidden>
    )
}
