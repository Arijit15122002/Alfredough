import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../CSS/style.css'
import { useGlobalContext } from '../contextAPI/context'

function Search () {

    const [search, setSearch] = useState('')
    const [blogs, setBlogs] = useState([])
	const navigate = useNavigate()
	const {loggedIn} = useGlobalContext()

    let searchValue;
    const handleSearch = (e) => {
		setSearch(e.target.value)
    }

	useEffect(() => {
		if(search.length >= 2){
			searchSuggestions()	
		}
		else {
			setBlogs([])
		}
	}, [search])

    const searchSuggestions = async () => {
		let query = search
		const response = await axios.get(`http://localhost:8000/blogs/search/${query}`);
		setBlogs(response.data.blogs)
    }

	const goToSearchResults =() => {
		navigate('/searchResults', {state: {
			query: search, blogs: blogs}})
	}


  return (
    <div className={(loggedIn ? 'block' : 'hidden')}>
        <div className='flex flex-row w-full h-[38px] sm:h-10 rounded-3xl overflow-hidden bg-[#4c4c4c]'>
			<input 
                type="text" placeholder='search' 
                className=' w-[calc(100%-50px)] py-2 px-5 -mt-[4px] focus:bg-[#4c4c4c] focus:outline-none bg-inherit text-white ' 
                id='font'
                value={search}
                onChange={handleSearch}
                />
			<div className='m-auto cursor-pointer' onClick={() => {
				goToSearchResults()
				setSearch('')
			}}>
				<img src="images/Search.png" alt="" className='w-[25px] h-[25px] mx-auto mb-[4px]'/>
			</div>
		</div>

		<div className={(search.length < 2 || blogs.length === 0) ? 'hidden' : 'absolute flex flex-col w-auto sm:w-[300px] backdrop-blur-3xl rounded-xl px-2 border-black border-[1px] mt-2 h-auto overflow-y-hidden'} id='scroll' >
		{
			blogs?.slice(0,8).map((blog, index) => (
			<div key={blog._id}>
				<Link 
				key={blog._id} 
				to={`/blogs/${blog._id}`}
				onClick={() => setSearch('')}
				>
				<div className='px-6 py-2 my-[5px] rounded-xl duration-200 bg-white hover:bg-[#232323] hover:text-white'>
					{blog.title.length > 25 ? (
					`${blog.title.substring(0, 25)}...`
					) : (
					blog.title
					)}
				</div>
				</Link>

				{/* Conditionally render the horizontal line */}
				{index < blogs.length - 1 && <hr className='border-black' />}

			
			</div>
			))
		}
		{blogs.length > 7 && ( // Check if there are more than 8 blogs
			<div onClick={() => {
				goToSearchResults()
				setSearch('')
				}
			}>
				<div className='px-6 py-2 my-[5px] rounded-xl hover:bg-violet-300 duration-200 bg-white'>
					More...
				</div>
			</div>
		)}
		</div>
    </div>
  )
}

export default Search