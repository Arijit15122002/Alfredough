import React, {useState} from 'react'
import {Link, NavLink, Outlet} from 'react-router-dom'
import { useGlobalContext } from '../contextAPI/context';
import '../CSS/style.css'
import 'boxicons'
import Search from './Search';

function Navbar() {

	const { loggedIn, details } = useGlobalContext()

	const [isOpen, setIsOpen] = useState(false);
	
	const toggleNavbar = () => {
		setIsOpen(!isOpen)
	}

	const [searchBarVisible, setSearchBarVisible] = useState(false)
	const handleSearchBar = () => {
		setSearchBarVisible(!searchBarVisible)
	}

  return (
	<>
    <nav className=' bg-[#232323] fixed top-0 w-full h-15 p-2 items-center flex flex-row justify-between  mb-5 z-50'>
		<Link to={"/"} className='flex flex-row '>
			<div className='px-4'>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="50px" height="50px">
					<path fill="#acb7d0" d="M59 48L29 48 25 43 59 43z" />
					<path fill="#c2cde7" d="M54,53H28.448c-0.936,0-1.842,0.328-2.561,0.927l-9.247,7.706c-0.651,0.543-1.64,0.08-1.64-0.768 L15,54c0-0.552-0.448-1-1-1h-4c-2.761,0-5-2.239-5-5V16c0-2.761,2.239-5,5-5h44c2.761,0,5,2.239,5,5v32C59,50.761,56.761,53,54,53z" />
					<path fill="#5dbc9d" d="M15.004,5L15,30.8l8,9l8-9V5c0-1.105-0.895-2-2-2H17.004C15.899,3,15.004,3.895,15.004,5z" />
					<path fill="#faefde" d="M15 30.107L23 28 31 30.107 25 37 22 37z" />
					<path fill="#72caaf" d="M23,29h-8V3h5c1.657,0,3,1.343,3,3V29z" />
					<path fill="#acb7d0" d="M32 53L25 43 59 43 58.581 50 56 53z" />
					<path fill="#8d6c9f" d="M54,10H32V5c0-1.65-1.35-3-3-3H17c-1.65,0-3,1.35-3,3v5h-4c-3.31,0-6,2.69-6,6v32 c0,3.31,2.69,6,6,6h4v6.87c0,0.78,0.44,1.47,1.15,1.81c0.28,0.12,0.57,0.19,0.85,0.19c0.46,0,0.91-0.16,1.28-0.47l9.25-7.7 c0.54-0.45,1.22-0.7,1.92-0.7H32h22c3.31,0,6-2.69,6-6v-5V16C60,12.69,57.31,10,54,10z M16,5c0-0.55,0.45-1,1-1h12 c0.55,0,1,0.45,1,1v5v2v16.72l-6-1.5V15c0-0.553-0.448-1-1-1s-1,0.447-1,1v12.22l-6,1.5V12v-2V5z M25.926,35h-5.853l-3.811-4.285 L23,29.031l6.738,1.684L25.926,35z M25.25,53.16L16,60.87V54c0-1.1-0.9-2-2-2h-4c-2.21,0-4-1.79-4-4V16c0-2.21,1.79-4,4-4h4v18.8 c0,0.24,0.09,0.48,0.25,0.66l4.621,5.198c0.002,0.002,0.002,0.004,0.004,0.006l3.378,3.8c0.043,0.048,0.102,0.073,0.153,0.112 C22.577,40.709,22.777,40.8,23,40.8s0.423-0.091,0.595-0.224c0.05-0.039,0.11-0.064,0.153-0.112l3.378-3.8 c0.002-0.002,0.002-0.004,0.004-0.006l4.621-5.198C31.91,31.28,32,31.04,32,30.8V12h22c2.21,0,4,1.79,4,4v26H25 c-0.373,0-0.715,0.207-0.887,0.538c-0.172,0.331-0.146,0.729,0.068,1.035L30.079,52H28.45C27.28,52,26.14,52.41,25.25,53.16z M32.521,52l-2.583-3.69C29.97,48.211,30,48.11,30,48v-1c0-0.553-0.448-1-1-1c-0.208,0-0.389,0.078-0.549,0.186L26.92,44H58v4 c0,2.206-1.794,4-4,4H32.521z" />
					<path fill="#8d6c9f" d="M34 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C35 46.447 34.552 46 34 46zM39 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C40 46.447 39.552 46 39 46zM44 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C45 46.447 44.552 46 44 46zM49 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C50 46.447 49.552 46 49 46zM55 49v-2c0-.553-.448-1-1-1s-1 .447-1 1v2c0 .553.448 1 1 1S55 49.553 55 49zM23 12c.552 0 1-.447 1-1V7c0-.553-.448-1-1-1s-1 .447-1 1v4C22 11.553 22.448 12 23 12z" />
				</svg>
			</div>
			<div className='hidden my-auto sm:flex text-2xl md:text-[35px] text-white' id='font'>
				Alfredough
			</div>
		</Link>


		<div className='w-[55%] max-w-[300px]'>
			<Search />
		</div>

		<div>
			{
				loggedIn ? 


				<div className='hidden lg:mr-10 lg:flex lg:flex-row lg:gap-4 ld:mr-10 xl:mr-14 xl:gap-6 '>
					<NavLink to={'/dashboard'} className={({isActive}) => `${ isActive ? 'bg-violet-500 shadow-lg shadow-violet-500/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>

							<p className=' my-auto text-md' id='font'>Dashboard</p>
					</NavLink>
					<NavLink to={'/categories'} className={({isActive}) => `${ isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>
							{/* <img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679666/istnneftcrlkoek8f72z.png" alt="" className='h-[30px] w-[30px] mt-1'/> */}
							<p className=' my-auto text-md' id='font'>Categories</p>
						</NavLink>
					<NavLink to={'/write'} className={({isActive}) => `${ isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>
							{/* <img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679667/hjsgsx1kunrbokhqeiqr.png" alt="" className='h-[30px] w-[30px] mt-1'/> */}
							<p className=' my-auto text-md' id='font'>Write</p>
					</NavLink>
					<NavLink to={'/profile'} className={({isActive}) => `${ isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>
								{/* <img src={details.avatar} alt="" className='h-[40px] w-[40px] rounded-2xl'/> */}
								<p className=' my-auto text-md' id='font'>Profile</p>
					</NavLink>
				</div> 
				
				
				: 


				<div className='hidden lg:mr-10 lg:flex lg:flex-row lg:gap-8 xl:mr-14 xl:gap-10 bg-inherit'>
					<NavLink to={'/signup'} className={({isActive}) => `${ isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>
						{/* <img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679669/albfv99nkeuchyxpst77.png" alt="" className='h-[30px] w-[30px] mt-1'/> */}
						<p className=' my-auto text-lg' id='font'>Sign up</p>
					</NavLink>
					<NavLink to={'/signin'} className={({isActive}) => `${ isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>
						{/* <img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679668/t7q7cn2937nw49perk1u.png" alt="" className='h-[30px] w-[30px] mt-1'/> */}
						<p className=' my-auto text-lg' id='font'>Sign in</p>
					</NavLink>
					<NavLink to={'/help'} className={({isActive}) => `${ isActive ? 'bg-violet-600 shadow-lg shadow-violet-600/50 text-white scale-110' : 'text-white'} hover:scale-110 duration-200 rounded-lg overflow-hidden py-1 px-4 flex flex-row gap-1 `}>
						<p className=' my-auto text-lg' id='font'>Help</p>
					</NavLink>
				</div>


			}
			<div className='lg:hidden'>
				<button data-collapse-toggle="navbar-default" type='button' className=''
				onClick={toggleNavbar}
				>
				{
					isOpen ? 
					<>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25px" height="25px" className='mx-[0.7rem]'>
					<path d="M11 0.7H13V23.3H11z" transform="rotate(-45.001 12 12)" fill="white" />
					<path d="M0.7 11H23.3V13H0.7z" transform="rotate(-45.001 12 12)" fill="white" />
					</svg> 
					{
						loggedIn ? 


						<div className='flex flex-col absolute w-44 h-auto right-1 mt-6 rounded-xl bg-opacity-85 bg-violet-500' style={{
							border: '1px solid #232323',
						}}>
						<NavLink to={'/dashboard'} className={({isActive}) => `${ isActive ? 'bg-white text-black' : 'text-white'} flex flex-row pl-8 w-[97%] py-2 my-1 gap-3 rounded-xl mx-auto `}>

							<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679667/cp6zrv1v8badmciparqs.png" alt="" className='h-[19px] w-[19px] mt-1'/>
							<p className=' my-auto text-lg' id='font'>Dashboard</p>

						</NavLink>

						<div className='w-full flex justify-center'>
							<div className='w-[95%] h-[0.5px] bg-black'></div>
						</div>
						
						<NavLink to={'/categories'} className={({isActive}) => `${ isActive ? 'bg-white text-black' : 'text-white'} flex flex-row pl-8 w-[97%] py-2 my-1 gap-3 rounded-xl mx-auto `}>
							
							<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679666/istnneftcrlkoek8f72z.png" alt="" className='h-[22px] w-[22px] mt-1'/>
							<p className=' my-auto text-lg' id='font'>Categories</p>

						</NavLink>

						<div className='w-full flex justify-center'>
							<div className='w-[95%] h-[1px] bg-black'></div>
						</div>

						<NavLink to={'/write'} className={({isActive}) => `${ isActive ? 'bg-white text-black' : 'text-white'} flex flex-row pl-8 w-[97%] py-2 my-1 gap-3 rounded-xl mx-auto `}>
								
							<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679667/hjsgsx1kunrbokhqeiqr.png" alt="" className='h-[25px] w-[25px] mt-1'/>
							<p className=' my-auto text-lg' id='font'>Write</p>

						</NavLink>

						<div className='w-full flex justify-center'>
							<div className='w-[95%] h-[1px] bg-black'></div>
						</div>

						<NavLink to={'/profile'} className={({isActive}) => `${ isActive ? 'bg-white text-black' : 'text-white'} flex flex-row pl-8 w-[97%] py-1 my-1 gap-3 rounded-xl mx-auto `}>
								
								<img src={details.avatar} alt="" className='h-[35px] w-[35px] rounded-xl'/>
								<p className=' my-auto text-lg' id='font'>Profile</p>

						</NavLink>
						</div>
						
						 : 


						<div className='flex flex-col absolute w-44 h-auto py-1 px-1 right-1 mt-6 rounded-xl items-center bg-opacity-85 bg-violet-500' style={{
							border: '1px solid #232323',
						}}>
							<NavLink to={'/signup'} className={({isActive}) => `${isActive ? 'bg-white text-black' : 'text-white'} flex flex-row px-2 py-2 rounded-xl gap-3 my-auto w-full items-center justify-center h-full`}>
								<img src="/images/sign_up.png" alt="" className='h-[30px] my-auto'
								/>
								<p className='text-lg' id='font'>Sign-Up</p>
							</NavLink>

							<div className='w-full flex justify-center py-1'>
								<div className='w-[95%] h-[0.5px] bg-black'></div>
							</div>

							<NavLink to={'/signin'} className={({isActive}) => `${isActive ? 'bg-white text-black' : 'text-white'} flex flex-row px-2 py-2 rounded-xl gap-3 my-auto w-full h-full items-center justify-center`}>
								<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679668/t7q7cn2937nw49perk1u.png" alt="" className='h-[30px] my-auto'
								/>
								<p className='text-lg' id='font'>Sign-In</p>
							</NavLink>
						</div>
					}
					</>
					
					:
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="22px" height="22px" className='mx-3'>
					<path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" fill="white" />
					</svg>
				}
				</button>
			</div>
		</div>
	</nav>
	<Outlet/>
	</>
)
}

export default Navbar