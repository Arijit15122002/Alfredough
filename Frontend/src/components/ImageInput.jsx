import React, { useRef, useState } from 'react'

function ImageInput ({ onImageSelected }) {

    const ref = useRef();

    const handleOnChange = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = function(e) {
                onImageSelected(e.target.result)
            }
        }
    }

    const onChooseImage = () => {
        ref.current.click()
    }

    return (
    <div className='mt-2'>
        <input 
        type="file"
        accept='image/'
        ref={ref}
        onChange={handleOnChange}
        style={{display: 'none'}}
        />
        <button
        onClick={(e) => {
            onChooseImage()
            e.preventDefault()
        }}
        className='bg-violet-600 rounded-xl px-2 text-white flex flex-row justify-between w-42 py-1 cursor-pointer hover:scale-110 hover:bg-white hover:text-violet-600 hover:border-2 hover:border-violet-600 duration-200'
        >Choose Image</button>
    </div>
    )
}

export default ImageInput