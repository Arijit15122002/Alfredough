import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../contextAPI/context'
import axios from 'axios'

function PopularBlogs ({type, id}) {

    const [blogs, setBlogs] = useState([])

    const {details} = useGlobalContext()
	const {addedToFavorites} = details 

    useEffect(() => {
        const fetchBlogs = async() => {
            const response = await axios.get(`http://localhost:8000/blogs/list/${type}`)
            setBlogs(response.data.blogs.filter((blog) => blog._id !== id))
        }

        fetchBlogs()
    }, [id])


    const formatTime = (createdAt) => {
        const date = new Date(createdAt);

        const userFriendlyDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', // Use 'short' for abbreviated month names (e.g., Apr)
            day: 'numeric',
        });

        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });

        return `${userFriendlyDate} ${formattedTime}`;
    }
  return (
    <div className='w-full overflow-y-auto'>
        <div className='w-full'>
            {
                blogs.map((blog) => (
                    <div key={blog.id} className='rounded-xl overflow-hidden flex flex-row justify-between items-center gap-4 my-4 shadow-md shadow-black/50 bg-[#323232]'>
                        <div className='flex flex-row gap-5 items-center'>
                            <div className='h-24'>
                                <img src={blog.thumbnail} alt="" className='h-24'/>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='text-xl text-white' id='times'>
                                    <Link to={`/blogs/${blog._id}`}>
                                        {
                                            blog.title.length > 35 ? blog.title.substring(0, 35) + '...' : blog.title
                                        }
                                    </Link>
                                </div>
                                <div className='text-white' id='font'>
                                    <small>{formatTime(blog.createdAt)}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PopularBlogs