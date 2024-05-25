import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'

function AuthorBlogs () {
	const {authorId} = useParams()
	const [user, setUser] = useState({})
	const [blogs, setBlogs] = useState([])


	//fetching user
	useEffect(() => {
		async function fetchUser() {
			const response  = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${authorId}`)
			console.log(response);
			setUser(response.data.user)
		}
		fetchUser()
	}, [])


	//fetching blogs
	useEffect(() => {
		const fetchBlogs = async() => {
			try {
				const blogIds = user.writtenBlogs || []
				const response = await Promise.all(blogIds.map(async (id) => {
					const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs/page/${id}`)
					return response.data.blog
				}))
				setBlogs(response)
			} catch (error) {
				console.log(error)
			}
		}

		fetchBlogs()
	}, [user])

return (
	<div className='mt-32 flex justify-center flex-col xl:flex-row items-center xl:mt-0 lg:justify-between'>
		<div className='w-full flex justify-center items-center xl:fixed xl:top-[27vh] xl:w-[45%]'>
			<div className='w-[80%] max-w-[400px] h-auto rounded-xl border-[1px] border-white flex items-center flex-col'>
				<div className='w-full flex flex-col items-center p-6'>
					<img src={user?.avatar} alt="" className='w-40 h-40 rounded-xl'/><span className='text-white text-lg' id='times'>{user?.username}</span>
				</div>
				<div className='w-full text-white' id='font'>
					<div className='flex flex-row pl-28 gap-5 py-2'>
						<div>Author:</div>
						<div>{user?.fullname}</div>
					</div>
					<div className='flex flex-row pl-28 gap-5 py-2'>
						<div>Email:</div>
						<div>{user?.email}</div>
					</div>
					<div className='flex flex-row pl-28 gap-5 pt-2 pb-6 text-[#b7b7b8]'>
						<div>Blogs, by {user?.fullname?.split(' ')[0]}:</div>
						<div>{user?.writtenBlogs?.length}</div>
					</div>
				</div>
			</div>
		</div>




			<div className='mt-20 flex justify-center xl:pl-[45vw] xl:w-full'>

				{/* author's blogs */}
				<div className=' w-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3 md:gap-4 mx-auto'>
					{
						blogs.map((blog) => <CategoryCard key={blog._id} blog={blog} />)
					}
				</div>
			</div>
		</div>
)
}

export default AuthorBlogs