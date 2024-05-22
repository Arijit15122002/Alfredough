import React, { useState } from 'react'
import '../CSS/style.css'
import Cropper from 'react-easy-crop'

function ImageCropper ({image, onCropDone, onCropCancel}) {

    const [crop, setCrop] = useState({x:0, y:0})
    const [zoom, setZoom] = useState(1)
    const [croppedArea, setCroppedArea] = useState(null)
    const aspectRatio = 16 / 9

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels)
    }
    


  return (
    <div className=' pt-10 flex flex-col gap-5 w-[60vw] h-auto md:w-[60vw]'>
        <div className='relative flex justify-center overflow-hidden rounded-2xl h-[60vh] w-[60vw] md:h-[65vh] md:w-[60vw]'>
            <Cropper
                image={image}
                aspect={aspectRatio}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
            />
        </div>

        <div className='w-[60vw] md:w-[60vw] flex flex-col gap-8 items-center '>
            <div className='flex flex-row justify-center gap-5 h-12'>
                    <div className='px-4 py-1 first-letter text-md text-white bg-blue-500 rounded-xl hover:bg-blue-200 hover:text-blue-700 hover:scale-125 hover:border-2 hover:border-blue-700 duration-200 cursor-pointer h-[34px] ' id='normal'
                    onClick={() => onCropDone(croppedArea)}>Crop & Apply</div>
                    
                    <div className='px-4 py-1 first-letter text-md text-white bg-red-600 rounded-xl hover:bg-red-200 hover:text-red-700 hover:scale-125 hover:border-2 hover:border-red-700 duration-200 cursor-pointer h-[34px]' id='normal' onClick={onCropCancel}>Cancel</div>
            </div>
        </div>
    </div>
  )
}

export default ImageCropper