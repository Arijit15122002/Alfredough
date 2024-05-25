import React, { useState, useEffect }  from 'react'
import { types } from '../constants/constants'
import { Link } from 'react-router-dom';
import '../CSS/style.css'
import '../CSS/blogcard.css'
import axios from 'axios';
import { useGlobalContext } from '../contextAPI/context';

function BlogCard ({blog}) {
    const {author, authorName, title, content, createdAt, updatedAt, likes, thumbnail, type, _id} = blog

	const [saved, setSaved] = useState(false)

	const [authorImage, setAuthorImage] = useState()

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
	}, [createdAt]);

	//likes
	const [likeCount, setLikeCount] = useState(0);

	useEffect(() => {

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

	}, []);

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
		<>
			<div className='w-[75vw] sm:w-[70vw] h-auto bg-[#525252] rounded-xl overflow-hidden flex flex-col justify-between md:w-[40vw] shadow-[#131313] shadow-md' id='blogColor'>
  				<div className=' w-full h-full md:rounded-xl overflow-hidden flex justify-center items-center'>
    				<img src={thumbnail} alt="" className='md:rounded-lg object-cover md:w-[93%] md:h-[87%]'/>
  				</div>
  				<div className='w-full gap-5 flex flex-col justify-between'>
					<div className='w-full flex flex-row'>
						<div className='text-[22px] md:text-xl px-3 py-2 md:py-0 cursor-pointer w-[90%] text-white' id='times'>
							<Link to={`/blogs/${_id}`}>{title}</Link>
						</div>
						<div className='flex flex-col items-center pr-5 pt-3'>
							<div className='text-white' id='font'>{likes}</div>
							<div><img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1715982480/hmqtbgptdq2t4eoamskm.png" alt="" className='w-6 h-6'/></div>
						</div>
					</div>
					<div className='w-full h-auto flex justify-center pb-2'>
						<div className='flex flex-row justify-between px-3 w-[340px] sm:w-[380px] md:w-[280px] bg-[#746f6f] items-center rounded-xl'>
							<div className=' h-full flex flex-row gap-3 py-2'>
								<Link to={`/author/${author}`} className='h-full'>
									<img src={authorImage} alt="" className='w-14 h-14 rounded-lg'/>
								</Link>
								<div className='flex flex-col items-center text-white gap-2'>
									<Link to={`/author/${author}`} className='' id='times'>{authorName}</Link>
									<small id='font'>{formattedTime}</small>
								</div>
							</div>
							<div className='cursor-pointer' onClick={handleFavorties}>
								<img src={saved ? 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715930419/ib7w9jx478drojnv1bns.png' : 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715929784/s4qcyjla5pqbe1tbl3lg.png'} alt="" className='w-6 h-6'/>
							</div>
						</div>
					</div>
  				</div>
			</div>

		</>
	)
}

export default BlogCard
