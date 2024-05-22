import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../CSS/style.css'

function Comments ({comments}) {

	const [fullNames, setFullNames] = useState([])

	useEffect(() => {
		const fetchUserFullNames = async() => {
			const fetchedFullNames = await Promise.all(
				comments.map(async(comment) => {
					const response = await axios.get(`http://localhost:8000/user/${comment.userId}`)
					const fullName = response.data.user.fullname
					return fullName
				})	
			)

			setFullNames(fetchedFullNames)
		}

		fetchUserFullNames()
	}, [comments])

	let index = 0

  return (
	<>
		<div>
			{
				comments.length == 0 ? 
				<div className='text-center w-full h-[60vh] flex justify-center items-center text-lg font-semibold' id='font'>
					No comments yet
				</div> : 
				<ul className='overflow-y-auto h-[60vh] overflow-hidden' id='scrollComment'>
				{
					comments.map((comment) => (
						<li key={comment.comment} className='backdrop-blur-3xl bg-white shadow-sm rounded-xl text-black my-2 py-1 mx-4 px-2 '>
							{
								fullNames[index] &&
								<div>
									<p className='px-2 text-[15px]' id='font'>{fullNames[index++]}:</p>
									<p className='px-2 py-1 font-semibold' id='font'>{comment.comment}</p>
								</div>
							}
							
						</li>
					))
				}
			</ul>
			}
		</div>
	</>
  )
}

export default Comments