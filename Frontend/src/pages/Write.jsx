import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'boxicons'
import { types } from '../constants/constants'
import ImageInput from '../components/ImageInput'
import ImageCropper from '../components/ImageCropper'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import '../CSS/style.css'
import {Toaster, toast} from 'react-hot-toast'
import { useGlobalContext } from '../contextAPI/context'

function Write () {
	const {details} = useGlobalContext()
	const [isOpen, setIsOpen] = useState(false)
	const [type, setType] = useState('category')
	const [currentPage, setCurrentPage] = useState('choose-img')
	const [imageAfterCrop, setImageAfterCrop] = useState('')
	const [image, setImage] = useState('')
	const [icon, setIcon] = useState('')
	const editor = useRef(null)
	const navigate = useNavigate()

	const handleDropDown = () => {
		setIsOpen(!isOpen)
	}

    //functions when an image is selected 
    const onImageSelected = (selectedImage) => {
        setImage(selectedImage)
		setCurrentPage('crop-img')
    }

	//functions when cropping is done
	const onCropDone = (imageCroppedArea) => {
		const canvasEle = document.createElement('canvas')
		canvasEle.width = imageCroppedArea.width
		canvasEle.height = imageCroppedArea.height
		const ctx = canvasEle.getContext('2d')

		let imageObj = new Image();
		imageObj.src = image
		imageObj.onload = () => {

			//credentials
			const yourApiKey = '664958136775432';
			const yourApiSecret = 'Y-LC-Cvpkk0ZeUkEpkyaGDMLH9Y';

			ctx.drawImage(
				imageObj, 
				imageCroppedArea.x, 
				imageCroppedArea.y, 
				imageCroppedArea.width, 
				imageCroppedArea.height, 
				0, 
				0, 
				imageCroppedArea.width, 
				imageCroppedArea.height)
			setImageAfterCrop(canvasEle.toDataURL('image/jpeg'))
			console.log(canvasEle.toDataURL('image/jpeg'));
			setCurrentPage('image-cropped')

			const dataURL = canvasEle.toDataURL('image/jpeg')


			//uploading image to cloudinary
			const uploadURL = 'https://api.cloudinary.com/v1_1/daghlyuwh/image/upload'

			const formData = new FormData()
			formData.append('file', dataURL)
			formData.append('upload_preset', 'blogs_own')
			axios.post(uploadURL, formData).then((response) => {
				setImageAfterCrop(response.data.url);
				setBlog({...blog, thumbnail: response.data.url})
				setCurrentPage('image-cropped');
			  }).catch((error) => {
				console.error('Error uploading image:', error);
			  })
		}
	}

	//function when cropping is cancelled
	const onCropCancel = () => {
		setCurrentPage('choose-img')
		setImage('')
	}


	//setting blog
	const [blog, setBlog] = useState({
		title:'', type:'', thumbnail:'', content:'', author:''
	})

	const characterCount = blog.title.length
	const handleInputChange = (e) => {
		setBlog({...blog, title:e.target.value.substring(0, 40)})
	}

	
	const updateBlog = () => {
		console.log(blog)
		setBlog({...blog, content:editor.current.value, author:details.id, authorName:details.fullname})

	}
	

	const userId = details.id

	//posting theblog
	const handleSubmit = async() => {
		console.log(blog);
		const response = await axios.post('http://localhost:8000' + '/blogs' + '/write', blog)
		if(response.data.message === 'Blog added successfully')
		{
			const blogId = response.data.blog._id
			const data = {
				userId,
				blogId
			}
			const res = await axios.post('http://localhost:8000/user/addWrittenBlog', data)
			console.log(res)
			navigate('/dashboard')
		}
	} 




return (
	<>
		<div className='mt-20 flex justify-center items-center flex-col'>
			<div className='flex flex-row gap-4 py-4'>
				<div id='font' className='text-xl font-semibold text-white'>Select Type: </div>
				<div className={isOpen ? ' bg-gray-700 rounded-xl px-2 py-[4px] text-white flex flex-row justify-between w-28 cursor-pointer' : 'bg-violet-600 rounded-xl px-2 py-[4px] text-white flex flex-row justify-between w-28 cursor-pointer'}
				onClick={handleDropDown}
				>
					<p className=' mb-[1px]' id='normal'>{type}</p>
					<div className='h-5 animate-bounce mt-1' >
						{
							isOpen ? (
								<box-icon name='up-arrow-alt' color='white'></box-icon>
							) : (	
								<box-icon name='down-arrow-alt' color='white'></box-icon>
							)
						}
					</div>
				</div>
				<div className='absolute mt-10 z-50 ml-0 bg-violet-600 rounded-xl' >
					{
						isOpen ? (
							<div className='z-50 h-48 w-52 overflow-y-auto' id='scroll'>
								<ul className='my-1'>
									{
										types.map(({type, icon}) => (
											<>
												<li key={type} className=' py-3 px-4 cursor-pointer text-white hover:bg-white hover:text-violet-600 rounded-xl mx-1 duration-200 flex flex-row justify-between' id='normal'
												onClick={() => {
													handleDropDown()
													setType(type)
													setBlog({...blog, type: type})
													setIcon(icon)
												}}
												>
													<div>{type}</div>
													<img src={icon} alt="" className='h-8 w-8 -my-1'/>
												</li>	
												<div className='flex justify-center'>
													{
														type === 'Other' ? (
															<div className='h-[0.5px] w-full'></div>
														) : (
															<div className='bg-white w-[90%] h-[0.5px] my-1'></div>
														)
													}
												</div>
											</>
										))
									}
								</ul>
							</div>
						) : (
							<div>

							</div>
						)
					}
				</div>
			</div>
			
			<div className='flex flex-col gap-4 xl:gap-0 xl:flex-row w-[90vw] md:w-[80vw] xl:w-[70vw]'>

				<div className=' flex flex-col justify-center xl:w-1/2 '>
					<div className='text-3xl px-6 py-2 text-white' id='font'  >
						Image: 
					</div>
					{
						currentPage === 'choose-img' ? (
							<ImageInput onImageSelected={onImageSelected}/>
						) : currentPage === 'crop-img' ? (
								<ImageCropper 
								image={image}
								onCropDone = {onCropDone}
								onCropCancel = {onCropCancel}
								/>
						) : (
							<div>
								<div className='p-6'>
									<img src={imageAfterCrop} alt="" className='w-full rounded-xl overflow-hidden'/>
								</div>

								<div className='flex flex-row w-full justify-center'>
									<div
									onClick={() => {
										setCurrentPage('crop-img')
									}}
									className='px-6 py-2 text-white hover:scale-110 cursor-pointer duration-200 bg-blue-600 rounded-xl mx-4' id='normal'
									>
										Edit
									</div>
									<div
									onClick={() => {
										setCurrentPage('choose-img')
										setImage('')
									}}
									className='px-6 py-2 text-white hover:scale-110 cursor-pointer duration-200 bg-blue-600 rounded-xl mx-4' id='normal'
									>
										New Image
									</div>
								</div>
							</div>
						)
					}
				</div>
				<div className='flex flex-col justify-center'>
					<div className='text-3xl px-6 py-1 text-white' id='font'>Title:</div>
					<div className='flex flex- gap-3 items-center'>
						<input
						type="text" 
						value={blog.title}
						onChange={handleInputChange}
						disabled={characterCount >= 40}
						className=' px-6 py-6 text-lg w-[600px] bg-white h-10 rounded-xl focus:outline-none' id='blog' />
						{
							icon === '' ? 
							<div></div> : 
							<img src={icon} alt="" className='h-16 w-16 '/>
						}
					</div>
				</div>
			</div>


			<div className='rounded-xl overflow-hidden border-none xl:flex-row w-[90vw] md:w-[80vw] xl:w-[70vw] my-10'>
				<JoditEditor
					ref={editor}
					config={{
						height: 600,
					}}
				/>
    		</div>

			
			<div className='flex flex-row justify-center w-full gap-10 h-12 -mt-5 mb-10'>

				<div  
				onClick={updateBlog}
				className='h-auto w-auto my-auto rounded-xl px-6 py-2 bg-sky-600 text-white cursor-pointer hover:scale-110 hover:bg-white hover:text-sky-600 hover:shadow-lg hover:shadow-sky-600/50 hover:border-2 hover:border-sky-600 duration-200' id='kanit'>
					Save
				</div>

				<div  
				onClick={handleSubmit}
				className='h-auto w-auto my-auto rounded-xl px-6 py-2 bg-green-600 text-white cursor-pointer hover:scale-110 hover:bg-white hover:text-green-600 hover:shadow-lg hover:shadow-green-600/50 hover:border-2 hover:border-green-600 duration-200' id='kanit'>
					Post
				</div>

				<Link to={'/dashboard'} className=' h-auto w-auto my-auto rounded-xl px-6 py-2 text-white cursor-pointer bg-red-600 hover:scale-110 hover:border-2 hover:bg-white hover:border-red-600 hover:text-red-600 hover:shadow-lg hover:shadow-red-600/50 duration-200' id='kanit'>
					Cancel
				</Link>
			</div>

		</div>
	</>
)
}

export default Write