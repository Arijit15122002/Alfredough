import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useGlobalContext } from '../contextAPI/context'
import WrittenAndFavBlogs from '../components/WrittenAndFavBlogs'

function Profile () {
	const { details, LogoutUser } = useGlobalContext();

	const [user, setUser] = useState({});
	const [writtenBlogs, setWrittenBlogs] = useState([])
	const [favoriteBlogs, setFavoriteBlogs] = useState([])
	const [isLoading, setIsLoading] = useState(true); // Initial loading state

	useEffect(() => {
		async function fetchUser() {
			const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/${details.id}`);
			setUser(response.data.user);
			setIsLoading(false); // Set to false after data is fetched
		}

		fetchUser();
	}, []);

	async function fetchBlogs(blogIds) {
		const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/blogs/chain`, {blogIds});
		if(blogIds === user.writtenBlogs) {
			setWrittenBlogs(response.data.blogs);
		} else {
			setFavoriteBlogs(response.data.blogs);
		}
	}

	useEffect(() => {
		if(user) {
			fetchBlogs(user.writtenBlogs)
			fetchBlogs(user.addedToFavorites)
		}
	}, [user])




return (
	<div className='w-full h-auto flex justify-center'>
		<div className='mt-28 w-[80vw] md:w-[92vw] xl:w-[85vw] h-full flex flex-col md:flex-row gap-6'>
			<div className=' lg:h-[calc(100vh-200px)] md:w-[65%] lg:w-[25%] flex flex-col items-center justify-between'>
				<div className='rounded-2xl border-[1px] border-[#b8b8b8] w-full' >
					<div className='w-full p-4'><img src={user?.avatar} alt="" className='w-52 h-52 rounded-xl mx-auto object-cover'/></div>
					<div className='text-center text-xl text-white py-3' id='font'>{user?.fullname}</div>
					<div className='w-full flex flex-row justify-center items-center py-2'>
						<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679667/uuhrybcsqr9pumnnstst.png" alt="" className='w-7 h-7'/>
						<div className='text-white' id='font'>: {user.email}</div>
					</div> 
						<>
							<div className='flex flex-row w-full justify-between items-center text-[#8f8f8f] py-2 max-w-[400px] mx-auto' id='font'>
							<div className='flex flex-row gap-2 items-center px-12'>
								<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1716134575/itti0ksncxt2nhyz8gfu.png" alt="" className='w-5 h-5'/>
								<div>Your blogs:</div>
							</div>
							<div className='pr-12'>{user?.writtenBlogs?.length}</div>
							</div>
							<div className='flex flex-row justify-between items-center py-2 text-[#8f8f8f] max-w-[400px] mx-auto' id='font'>
								<div className='flex flex-row gap-2 items-center px-11'>
									<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1716134732/vbsoje9thpias3nsghon.png" alt="" className='w-6 h-6'/>
									<div className=''>Your Favorites:</div>
								</div>
								<div className='pr-12'>{user?.addedToFavorites?.length}</div>
							</div>
						</>
				</div>
				<div className='hidden lg:flex w-full justify-center'>
					<div className=' hidden lg:block py-2 w-[70%] text-center bg-[#545454] text-white rounded-xl border-[1px] border-white text-lg hover:bg-white hover:text-black duration-200 ease-in-out cursor-pointer' id='font' onClick={LogoutUser}>Log out</div>
				</div>
			</div>
			<div className='hidden lg:w-[37.5%] h-[calc(100vh-150px)] rounded-xl bg-[#111111] lg:flex flex-col'>
				<div className=' px-6 pt-4 pb-6 text-white text-2xl' id='font'>
					Blogs, written by You:
				</div>
				<div className=' w-full h-full my-2 overflow-y-auto' id='scroll'>
				{
					writtenBlogs?.length === 0 ? 
					<div className='w-full h-[80%] text-white text-xl flex items-center justify-center' id='cabin'>You haven't created any blog yet</div> :
					writtenBlogs?.map((writtenBlogs) => <WrittenAndFavBlogs key={writtenBlogs._id} blog={writtenBlogs} type={'written'} />)
				}
				</div>
			</div>
			<div className='hidden lg:w-[37.5%] h-[calc(100vh-150px)] rounded-xl bg-[#111111] lg:flex flex-col'>
				<div className=' px-6 pt-4 pb-6 text-white text-2xl' id='font'>
					Your favorites:
				</div>
				<div className=' w-full h-full my-2 overflow-y-auto' id='scroll'>
				{
					favoriteBlogs?.length === 0 ?
					<div className='w-full h-[80%] text-white text-xl flex items-center justify-center' id='cabin'>You haven't added any blog to your favorites</div> :
					favoriteBlogs?.map((favoriteBlog) => <WrittenAndFavBlogs key={favoriteBlog._id} blog={favoriteBlog} type={'favorite'} />)
				}
				</div>
			</div>
			<div className=' lg:hidden md:w-[35%] flex flex-col py-6 gap-5 items-center md:justify-center'>
				<Link to={'/written'} className='w-full flex justify-center'>
					<div className='py-2 w-[55%] md:w-full text-center bg-[#545454] text-white rounded-xl border-[1px] border-white text-lg hover:bg-white hover:text-black duration-200 ease-in-out cursor-pointer' id='font'>Your Blogs</div>
				</Link>
				<Link to={'/favorites'} className='w-full flex justify-center'>
					<div className='py-2 w-[55%] md:w-full text-center bg-[#545454] text-white rounded-xl border-[1px] border-white text-lg hover:bg-white hover:text-black duration-200 ease-in-out cursor-pointer' id='font'>Favorites </div>
				</Link>
				<div className='py-2 w-[55%] md:w-full text-center bg-[#545454] text-white rounded-xl border-[1px] border-white text-lg hover:bg-white hover:text-black duration-200 ease-in-out cursor-pointer' id='font' onClick={() => LogoutUser()}>Log out</div>
			</div>
		</div>
	</div>
)
}

export default Profile