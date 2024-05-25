import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contextAPI/context';
import '../CSS/style.css';

function MainBlog({ blog }) {

	const {_id} = blog

	const [saved, setSaved] = useState(false)

	const handleContentTruncation = (content) => {
		if (content.length > 200) {
		return content.substring(0, 200) + '...';
		}
		return content;
	};

	const {details} = useGlobalContext()
	const {addedToFavorites} = details 

	useEffect(() => {
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
    <>
      <div className='h-full w-full'>
        <div className='h-auto'>
          <img src={blog.thumbnail} alt="" className='rounded-xl shadow-md shadow-black/50' />
        </div>
        <div className='text-3xl px-8 pt-5 pb-2 text-white flex flex-row justify-between' id='times'>
			<Link to={`/blogs/${blog._id}`}>
				{blog.title}
			</Link>
			<div className='cursor-pointer px-6' onClick={handleFavorties}>
				<img src={saved ? 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715930419/ib7w9jx478drojnv1bns.png' : 'https://res.cloudinary.com/daghlyuwh/image/upload/v1715929784/s4qcyjla5pqbe1tbl3lg.png'} alt="" className='w-6 h-6'/>
			</div>
        </div>
        <div className=' text-[#979797] text-[14px] ' id='times'>
			<div className='px-8' dangerouslySetInnerHTML={{ __html: handleContentTruncation(blog.content) }} />
		</div>
      </div>
    </>
  );
}

export default MainBlog;
