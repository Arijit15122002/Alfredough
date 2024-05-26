import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../contextAPI/context'
import axios from 'axios'
import WrittenAndFavBlogs from '../components/WrittenAndFavBlogs'

function WrittenBlogs () {

	const {details} = useGlobalContext()
	const {writtenBlogs} = details
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		async function fetchBlogs(blogIds) {
			const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/blogs/chain`, {blogIds});
			setBlogs(response.data.blogs);
		}

		fetchBlogs(writtenBlogs)
	},[])
return (
	<div className='mt-[70px] h-[calc(100vh - 70px)] w-full flex flex-col justify-center items-center'>
		<div className=' text-2xl text-bold py-4 w-[80%] text-white' id='cabin'>Blogs written by you!</div>
		<div className='w-[80%] sm:w-[70%] md:w-[80%] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center rounded-xl gap- bg-violet-300'>
		{
			blogs?.map((blog) => <WrittenAndFavBlogs blog={blog} type={'written'}/>)
		}
		</div>
	</div>
	)
}

export default WrittenBlogs