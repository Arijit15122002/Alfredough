import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { types } from '../constants/constants'
import '../CSS/style.css'
import axios from 'axios';
import SearchResults from './SearchResults';


function Categories () {

	const navigate = useNavigate()
	const handleResultOnClick = async ({type}) => {
		const actualType = type.type
		const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs/list/${actualType}`)
		if(response.statusText === 'OK')
		{
			navigate('/searchResults', {state: {blogs: response.data.blogs}})
		}
	}


	return (
		<div className='mt-20 flex flex-col justify-center items-center'>
			<div className='text-white text-3xl p-3 flex justify-start w-[80vw]' id='cabin'>Unleash your curiosity</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4 w-[80vw] p-6'>
				{
					types.map((type) => (
						<div className='bg-[#404040] flex flex-col justify-between overflow-hidden items-center rounded-2xl hover:scale-105 hover:bg-violet-600 cursor-pointer duration-200 shadow-md shadow-black/50 hover:shadow-violet-600/50' key={type.type} onClick={() => handleResultOnClick({type})}>
							<div className='w-full h-[180px] flex justify-center items-center p-4 pb-0'>
								<img src={type.img} alt="" className='w-full h-full object-cover rounded-xl'/>
							</div>
							<div className='w-full px-8 flex flex-row items-center py-2 gap-4 justify-between'>
								<div className='text-white text-xl ' id='times'>{type.type}</div>
								<div>
									<img src={type.icon} alt="" className='w-10 h-10'/>
								</div>
							</div>
							<div className='px-6 text-[14px] text-[#d5d5d5] py-2'>
								{
									type?.para?.length > 80 ? type.para.substring(0, 80) + '...' : type.para
								}
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Categories