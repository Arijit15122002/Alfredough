import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../CSS/style.css'
import { useGlobalContext } from '../contextAPI/context'
import axios from 'axios'
import Comments from '../components/Comments'

function BlogDetails () {
    const {_id} = useParams()
    const [blog, setBlog] = useState({})
    const [formattedCreatedAt, setFormattedCreatedAt] = useState(''); // State for formatted date
	const [commmentsOpen, setCommentsOpen] = useState(false);
	const [likedByUser, setLikedByUser] = useState(false);
	const { details } = useGlobalContext();
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs/page/${_id}`);
			setBlog(response.data.blog);
			setComments(response.data.blog.commentsByUser);

			if(response.data.blog.likedByUser.includes(details.id)) {
				setLikedByUser(true)
			} else {
				setLikedByUser(false)
			}

			

			// Format createdAt upon receiving blog data
			if (response.data.blog.createdAt) {
				const dateObject = new Date(response.data.blog.createdAt);
				const formatter = new Intl.DateTimeFormat(navigator.language, {
					year: 'numeric',
					month: 'short', // Adjust month format as needed
					day: 'numeric',
					});
				const formattedString = formatter.format(dateObject);
				setFormattedCreatedAt(formattedString);
			}
		}

		fetchData();
	}, [_id, details.id, blog]);

	const params = {
		blogId: blog._id,
		userId: details.id
	}

	const handleLikes = async () => {
		try {
			const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/blogs/likes`, params);
			setBlog(res.data.blog);
		} catch (error) {
			console.error(error);	
		}
	}

	

	const sendComment = async () => {
		try{
			const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/blogs/comments`, {...params, comment});
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/blogs/comments/${blog._id}`)
		} catch (error) {
			console.error(error);
		}
		setComment('');
	}
	
  return (
    <div className='mt-32 flex justify-center items-center'>
        <div className='w-[80vw] h-auto rounded-2xl shadow-md shadow-gray-500 overflow-hidden bg-white'>
			<div>
				<div className='flex flex-row justify-between'>
				<div className='w-full text-2xl md:text-4xl px-8 md:px-12 py-6' id='times'>{blog.title}</div>
				<div className='flex flex-row items-center gap-5 lg:gap-10 mr-5 lg:mr-10'>
					<div className='flex flex-col items-center'>
						<div id='font'>{blog.likes}</div>
						<div className='w-8 h-8 cursor-pointer'
						onClick={() => {
							handleLikes()
						}}
						><img src={likedByUser ? "/images/liked.png" : "/images/unliked.png"} alt="" /></div>
					</div>
					<div className=' mt-6 w-8 h-8 cursor-pointer' onClick={() => setCommentsOpen(!commmentsOpen)}>
						{commmentsOpen ? 
						<img src="/images/comment_opened.png" alt="" /> : <img src="/images/comment_closed.png" alt="" />
						}
					</div>
					{
						commmentsOpen ? 
						<div className='right-2 w-72 absolute backdrop-blur-2xl border-[1px] border-black rounded-xl h-[70vh] top-52'>
							<div className='px-6 py-4 flex flexx row items-center justify-center gap-2'>
								<input type="text" className='px-2 py-1 rounded-md border-[1px] border-black focus:outline-none' 
								value={comment} onChange={(e) => setComment(e.target.value)}/>
								<div className='cursor-pointer' onClick={sendComment}><img src="/images/send.png" alt="" className='h-8 w-8'/></div>
							</div>
							<div className=' mx-4 w-auto h-[1px] bg-[#232323]'></div>
							<div className='h-[60vh] backdrop-blur-2xl'>
								<Comments comments={comments}/>
							</div>
						</div> : <div className='hidden'></div>
					}
					</div>
				</div>
				<div className='w-full flex felx-row px-4 py-2 justify-end text-sm'>
					<div id='font'>Author:</div>
					<Link id='times' to={`/author/${blog.author}`} className='mx-1 hover:underline hover:text-violet-800'>{blog.authorName}</Link>
					<div id='font'>, {formattedCreatedAt}</div>

				</div>
			</div>
            <div className='w-full'>
				<div className='mx-8 rounded-xl overflow-hidden md:float-left w-full md:w-[60%]'>
					<img src={blog.thumbnail} alt="" className='w-full'/>
				</div>
				<div
					
					dangerouslySetInnerHTML={{__html: blog.content}}
					className='px-6 py-4'
				/>
			</div>
        </div>
    </div>
  )
}

export default BlogDetails