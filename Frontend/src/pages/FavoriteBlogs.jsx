import React, {useState, useEffect} from 'react'
import { useGlobalContext } from '../contextAPI/context'
import axios from 'axios'
import WrittenAndFavBlogs from '../components/WrittenAndFavBlogs'

function FavoriteBlogs () {
  const {details} = useGlobalContext()
	const {addedToFavorites} = details
	const [blogs, setBlogs] = useState([])

	useEffect(() => {
		async function fetchBlogs(blogIds) {
			const response = await axios.post(`http://localhost:8000/blogs/chain`, {blogIds});
			setBlogs(response.data.blogs);
		}

		fetchBlogs(addedToFavorites)
	},[])

return (
	<div className='w-full h-full flex items-center justify-center'>
		<div className='mt-[80px] w-[80%] sm:w-[70%] md:w-[80%] grid grid-cols-1 md:grid-cols-2 rounded-xl gap- bg-violet-300 items-center'>
		{
			blogs?.map((blog) => <WrittenAndFavBlogs blog={blog} type={'favorites'}/>)
		}
		</div>
	</div>
	)
}

export default FavoriteBlogs