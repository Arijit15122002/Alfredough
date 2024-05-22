import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useGlobalContext } from '../contextAPI/context';
import { Link } from 'react-router-dom'

function CategoryCard ({blog}) {

	console.log(blog);

	const {author, authorName, title, content, createdAt, updatedAt, likes, thumbnail, type, _id} = blog

    const [authorImage, setAuthorImage] = useState()

    const [saved, setSaved] = useState(false)

    const {details} = useGlobalContext()
	const {addedToFavorites} = details 

	//date and time formatting
	const [formattedTime, setFormattedTime] = useState('');
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

        const fetchAuthor = async () => {
			const author = await axios.get(`http://localhost:8000/user/${blog.author}`)
			setAuthorImage(author.data.user.avatar)
		}

		fetchAuthor();

        const checkFavorites = () => {
			const isFavorite = addedToFavorites.find(favoriteBlog => favoriteBlog === _id);
            setSaved(isFavorite ? true : false)
		}

        checkFavorites()

	}, [createdAt]);


  return (
    <div className='w-[70vw] max-w-[400px] md:w-[36vw] lg:w-[30vw] xl:w-[24vw] bg-[#363636] rounded-xl p-2 pb-2 md:pb-5'>
        <div className='w-full h-[60%] flex justify-center items-center'>
            <img src={thumbnail} alt="" className='w-[96%] h-[93%] rounded-xl '/>
        </div>
        <div className=' h-[18%] md:h-[20%] flex flex-row justify-between px-2 py-1'>
            <div className='flex items-center text-xl md:text-lg text-white' id='times'>
                <Link to={`/blogs/${_id}`}>{title}</Link>
            </div>
            <div className='flex flex-col items-center w-[10%]'>
                <div className='text-white' id='font'>{likes}</div>
                <div><img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1715982480/hmqtbgptdq2t4eoamskm.png" alt="" className='w-5 h-5'/></div>
            </div>
        </div>
        <div className='w-full h-auto md:h-auto flex justify-center mt-2 mb-3'>
            <div className='flex flex-row justify-between px-3 w-[260px] md:w-[260px] bg-[#746f6f] items-center rounded-xl'>
                <div className=' h-full flex flex-row gap-3 py-2'>
                    <Link to={`/author/${author}`} className='h-full'>
                        <img src={authorImage} alt="" className='w-12 h-12 rounded-lg'/>
                    </Link>
                    <div className='flex flex-col items-center text-white gap-1'>
                        <Link to={`/author/${author}`} className='' id='times'>{authorName}</Link>
                        <small id='font'>{formattedTime}</small>
                    </div>
                </div>
                <div className=''>
                    <img src={saved ? 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715930419/ib7w9jx478drojnv1bns.png' : 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715929784/s4qcyjla5pqbe1tbl3lg.png'} alt="" className='w-5 h-5'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CategoryCard