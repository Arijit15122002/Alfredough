import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../contextAPI/context'
import '../CSS/style.css'

function NormalBlogs ({blog}) {

    const {createdAt, _id} = blog

    const [authorImage, setAuthorImage] = useState()

    const [saved, setSaved] = useState(false)

    const [formattedTime, setFormattedTime] = useState('');

    const {details} = useGlobalContext()
	const {addedToFavorites} = details 

    useEffect(() => {
        const fetchAuthor = async () => {
			const author = await axios.get(`http://localhost:8000/user/${blog.author}`)
			setAuthorImage(author.data.user.avatar)
		}

		fetchAuthor();

        const formatTime = () => {
            // Use Intl.DateTimeFormat for flexible formatting options
            const formatter = new Intl.DateTimeFormat(navigator.language, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                // second: 'numeric',
                timeZone: 'UTC', // Ensure consistent time zone for formatting
                hour12: true, // Adjust to 'hour24' if preferred
            });
    
            const dateObject = new Date(createdAt);
            const formattedString = formatter.format(dateObject);
            setFormattedTime(formattedString);
            };
    
        formatTime();

        const checkFavorites = () => {
			const isFavorite = addedToFavorites.find(favoriteBlog => favoriteBlog === _id);
            setSaved(isFavorite ? true : false)
		}

		checkFavorites()
    }, [])

    const request = {
		userId:details.id,
		blogId:_id
	}

	const handleFavorties = async() => {
		try {
			const response = await axios.post('http://localhost:8000/user/favorites', request)

			if(response.data.message === 'Blog removed from favorites') setSaved(false)
				else setSaved(true)
		} catch (error) {
			
		}
	}


    return (
    <div className='lg:w-[22vw] rounded-xl bg-[#393939] flex flex-col justify-between shadow-md shadow-black/50'>
        <div className='w-full rounded-lg overflow-hidden p-4 pb-0'>
            <img src={blog.thumbnail} className='w-full h-full rounded-lg' alt="" />
        </div>
        <div className='w-full flex flex-row py-3 justify-between'>
            <div className='text-[18px] text-white py-1 mx-4 w-[90%]' id='times'>
                <Link to={`/blogs/${blog._id}`}>
                    {blog.title.length > 35 ? blog.title.substring(0, 40) + '...' : blog.title}
                </Link>
            </div>
            <div className='flex flex-col w-[20%] items-center'>
                <div className='text-white' id='font'>{blog.likes}</div>
                <div className=''><img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1715982480/hmqtbgptdq2t4eoamskm.png" alt="" className='w-6 h-6'/></div>
            </div>
        </div>
        <div className='w-full h-auto flex justify-center pb-2'>
            <div className='flex flex-row justify-between px-3 lg:w-[250px] bg-[#746f6f] items-center rounded-xl'>
                <div className=' h-full flex flex-row gap-3 py-2'>
                    <Link to={`/author/${blog.author}`} className='h-full'>
                        <img src={authorImage} alt="" className='w-12 h-12 rounded-lg'/>
                    </Link>
                    <div className='flex flex-col items-center text-white gap-2'>
                        <Link to={`/author/${blog.author}`} className='' id='times'>{blog.authorName}</Link>
                        <small id='font'>{formattedTime}</small>
                    </div>
                </div>
                <div className='cursor-pointer' onClick={handleFavorties}>
                    <img src={saved ? 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715930419/ib7w9jx478drojnv1bns.png' : 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715929784/s4qcyjla5pqbe1tbl3lg.png'} alt="" className='w-6 h-6'/>
                </div>
            </div>
        </div>
    </div>
    )
}

export default NormalBlogs