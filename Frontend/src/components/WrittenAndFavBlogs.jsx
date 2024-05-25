import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

function WrittenAndFavBlogs ({blog, type}) {

    const [author, setAuthor] = useState({
        fullname: '',
        avatar: ''  
    })

    useEffect(() => {
        async function fetchAuthor() {
            const response = await axios.get(`http://localhost:8000/user/${blog.author}`)
            setAuthor({
                fullname: response.data.user.fullname,
                avatar: response.data.user.avatar
            })
        }
        fetchAuthor()
    }, [])
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
		<div className='w-full h-auto flex justify-center py-3'>
            <div className='w-[80%] xl:w-[75%] h-auto bg-[#232323] hover:bg-violet-600 duration-200 ease-in-out rounded-2xl flex flex-col '>
                <div className='p-4 pb-0'>
                    <img src={blog?.thumbnail} alt="" className='rounded-xl'/>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <Link to={`/blogs/${blog._id}`} className={`text-xl text-white px-6 w-[90%] ${type==='written' ? 'pt-4 pb-2' : 'pt-4'}`} id='times' >{blog.title.length > 35 ? blog.title.substring(0, 35) + '...' : blog.title}</Link>
                        <div className='flex flex-col items-center justify-center w-[20%] p-2'>
                            <div className='text-white' id='font'>
                                {blog.likes}
                            </div>
                            <div>
                                <img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1715982480/hmqtbgptdq2t4eoamskm.png" alt="" className='w-6 h-6'/>
                            </div>
                        </div>
                    </div>
                    <div className={`${type === 'written' ? 'block pb-2' : 'hidden'} `}>
                        <small className='text-white px-6 ' id='font'>
                            {formatTime(blog.createdAt)}
                        </small>
                    </div>
                    <div className={`${type === 'written' ? 'hidden' : 'flex justify-center'} `}>
                        <Link to={`/author/${blog.author}`} className='w-[60%] flex flex-row items-center pl-3 py-2 bg-[#6d6d6d] rounded-xl my-2 hover:scale-110 hover:bg-white text-white hover:border-[1px] hover:border-[#232323] hover:text-black duration-200 ease-in-out'>
                            <div className=''><img src={author?.avatar} alt="" className='w-10 h-10 rounded-md'/></div>
                            <div className='pl-4 pr-1' id='times'>by: {author?.fullname}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WrittenAndFavBlogs