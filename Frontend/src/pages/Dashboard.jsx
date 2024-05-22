import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import MainBlog from '../components/MainBlog';
import PopularBlogs from '../components/PopularBlogs';
import NormalBlogs from '../components/NormalBlogs';
import Footer from '../components/Footer';

function Dashboard () {
	const [blogs, setBlogs] = useState([]);
	const [mainBlog, setMainBlog] = useState([])
	const [type, setType] = useState()

	useEffect(() => {

		const fetchMainBlog = async() =>{
			try {
				const response = await axios.get('http://localhost:8000/blogs/popular')
				setMainBlog(response.data.blog)
				setType(response.data.blog[0].type)
			} catch (error) {
				console.log("Error fetching mainBlog", error);
			}
		}
	
		fetchMainBlog()
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:8000/blogs/dashboard');
				setBlogs(response.data.blogs); // Assuming "blogs" is within the response data
			} catch (error) {
				console.log("Error occured while fetching blogs:", error);
			}
		};

		fetchData(); // Call the function to fetch data when the component mounts

  	}, []);

	return (
	<>
	<div className='mt-40 lg:mt-28 flex justify-center h-auto xl:pl-4'>
		<div className=' gap-10 md:gap-5 grid grid-cols-1 md:grid-cols-2 lg:hidden'>
			{blogs.map((blog) => 
				<BlogCard key={blog.id} blog={blog} />
			)}
		</div>
		<div className='hidden lg:flex lg:flex-col lg:w-[85vw] xl:w-[83vw]  '>
			<div className='flex flex-row h-[72%] w-full justify-between'>
				{
					mainBlog ? 
						mainBlog.map((blog) => {
							return (
								<>
									<div className='w-[52%] h-full'>
										<MainBlog key={blog._id} blog={blog} />
									</div>
									<div className='w-[45%] h-full'>
										<div className='h-[10%]'>
											<span className='text-[#232323] bg-white text-lg rounded-xl px-4 py-1' id='font'>Popular</span>
										</div>
										<div className='h-[118%] overflow-y-auto' id='scroll'>
											<PopularBlogs type={blog.type} id={blog._id} />
										</div>
									</div>
								</>
							)
						}) : <div className='text-white' id='font'>Loading...</div>
				}
				
			</div>
			<div className='mt-16 lg:w-[80%] xl:w-[85%] mx-auto h-full'>
				<div className=' h-auto w-auto grid grid-cols-3 gap-y-6 my-6'>
				{
					blogs.map((blog) => (
						blog.type !== type ? <NormalBlogs key={blog.id} blog={blog} /> : ''
					))
				}
				</div>
			</div>
		</div>
	</div>
	<Footer />
	</>
	)
}

export default Dashboard