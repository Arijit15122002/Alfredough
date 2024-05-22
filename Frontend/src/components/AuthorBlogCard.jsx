import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function AuthorBlogCard ({blog}) {
    const {author, authorName, title, content, createdAt, updatedAt, likes, thumbnail, type, _id} = blog
    const [formattedTime, setFormattedTime] = useState('');

    //date and time formatting
	useEffect(() => {
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
	}, [createdAt]);

	//likes
	const [likeCount, setLikeCount] = useState(0);

	useEffect(() => {
		const fetchLikes = async () => {
			const likes = await axios.get(`http://localhost:8000/blogs/likes/get/${_id}`)
			setLikeCount(likes.data.blog.likes)
		};
		fetchLikes();

	}, []);
  return (
    <>
        <div className=' flex justify-center '>
            <div className='w-[80%] lg:w-[95%] h-auto rounded-2xl overflow-hidden shadow-gray-500 shadow-md flex flex-col justify-between bg-white'>
                <div className=''>
                    <img src={thumbnail} alt="" />
                </div>
                <div className='flex flex-col justify-between h-auto'>
                    <div className='flex flex-row justify-between px-6'>
                        <Link to={`/blogs/${_id}`} className='text-2xl py-4 px-1 w-[80%]' id='times'>{title}</Link>
                        <div className=' flex flex-col items-center'>
                            <div>{likes}</div>
                            <div><img src="/images/number_likes.png" alt="" className='w-8 h-8'/></div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row px-7 pb-3 items-center bottom-0'>
                        <div className='text-md' id='font'>author: </div>
                        <div className='ml-1' id='times'>{authorName}</div>
                        <div className='text-sm' id='font' >, {formattedTime}</div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default AuthorBlogCard