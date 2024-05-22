import React from 'react'
import { useLocation } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard'

function SearchResults () {
    const location = useLocation()
    const {blogs} = location.state
    console.log(blogs);
  return (
    <div className='mt-32 flex justify-center'>
        {
            blogs.length == 0 ? 
            <div className='w-full h-full text-xl flex justify-center items-center'>
                <p className='p-4 border-[1px] bg-white border-black shadow-black/50 shadow-md rounded-xl' id='font'>We are sorry, till now there are no blogs on this topic</p>
            </div> : 
            <div className='grid grid-cols-1 md:grid-cols-2 w-[full] md:w-[70vw] lg:w-[64vw] xl:w-[52vw] mx-auto gap-3 md:gap-5'>
                {
                    blogs.map((blog) => <CategoryCard key={blog._id} blog={blog}/>)
                }
            </div>
        }
    </div>
  )
}

export default SearchResults