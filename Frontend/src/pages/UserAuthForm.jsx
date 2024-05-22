import React, {useState, useEffect, useRef} from 'react'
import InputBox from '../components/InputBox'
import { Link, useNavigate } from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import axios from 'axios'
import { useGlobalContext } from '../contextAPI/context'
import '../CSS/style.css'
import Footer from '../components/Footer'

function UserAuthForm ({type}) {

	//to redirect on another page
	const navigate = useNavigate();


	const { loggedIn, setLoggedIn, details, setDetails, storeTokenInLocalStorage } = useGlobalContext()



	useEffect(() => {
		if (loggedIn) {
			navigate('/dashboard')
		}
	}, [loggedIn])


	const inputImage = useRef(null);


	


	//creating user that will be passed at the backend
	const [user, setUser] = useState({
		fullname: '',
		username: '',
		email: '',
		password: '',
		avatar: ''
	})


	//image handling on form data
	const handleImageClick = () => {
		inputImage.current.click();
	}


	//cloudinary upload
	const handleImageChange = (e) => {

		const file = e.target.files[0];
		const formData = new FormData();
		console.log(file);
		formData.append('file', file);
		formData.append('upload_preset', 'blogs_own');
		axios.post('https://api.cloudinary.com/v1_1/daghlyuwh/image/upload', formData)
		.then((res) => {
			console.log(res)
			setUser({...user, avatar: res.data.url})
		})
		.catch((err) => console.log(err))
	}


	//user authentication
	const userAuthThroughServer = async (serverRoute, user) => {
		let response = '';
		try {
			const userData = (serverRoute === '/signin') ? {email: user.email, password: user.password} : user
			response = await axios.post('http://localhost:8000' + '/user' + `${serverRoute}`, userData)
			console.log(response)
		} catch (error) {
			console.log("Error: ", error)
		}
		if(serverRoute === '/signin' && response?.statusText === 'OK')
		{
			console.log(response)
			setLoggedIn(true)
			storeTokenInLocalStorage(response?.data?.token)
			setDetails({
				id: response.data.user._id,
				fullname: response.data.user.fullname,
				username: response.data.user.username,
				email: response.data.user.email,
				avatar: response.data.user.avatar,
				addedToFavorites: (response.data.user.addedToFavorites || []),
			})
			localStorage.setItem('userId',response.data.user._id)
			navigate('/dashboard')
		} else if (serverRoute === '/signup' && response?.statusText === 'Created') {
			navigate('/signin')
		}
	}


	//handling submit
	const handleSubmit = (e) => {

		e.preventDefault();

		let serverRoute = (type == 'signin') ? '/signin' : '/signup'

		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
		// let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
		// saving fomrData
		let {fullname, username, password, email, avatar} = user 


		//form validation
		if(fullname){
			if(fullname.length < 3) {
				return toast.error("Fullname must be atleast 3 letters long")
			}
		} 
		if(!email.length){
			return toast.error("Enter Email")
		}
		if(!emailRegex.test(email)){
			return toast.error("Email is invalid")
		}
		// if(!passwordRegex.test(password)){
		// 	return toast.error("Password should be 6 to 20 characters long with a numeric, one lowerrcase  and one uppercase letter.")
		// }
		userAuthThroughServer(serverRoute, user)

	}
	

	return (
		<>
			<div className={`h-screen w-full flex justify-center ${type === 'signin' ? 'mt-52' : 'mt-28'}`}>
			<Toaster/>
			<form  action="" className='w-[80%] sm:w-[70%] md:w-[60%] max-w-[500px] '>
				<h1 className=' text-2xl text-center mb-10 text-white' id='times'>
					{type == 'signin' ? "Welcome Back" : "Join us Today"}
				</h1>

				{
					type == 'signin' ? 
					<div>
						
					</div> : 
					<div>
						<div className='flex items-center justify-center h-48 w-full' onClick={handleImageClick}>
							{
								user.avatar ? (
									<div className='flex justify-center items-center h-[170px] w-[170px] p-[2px] rounded-[20px] overflow-hidden border-[2.5px] border-black'>
										<img src={user.avatar} alt="" className='flex justify-center items-center cursor-pointer rounded-[17px]'/>
									</div>
								) : (
									<img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1713679670/n6oqyszels8ughmn5k5d.png" alt="" className='flex justify-center items-center h-40 w-40 cursor-pointer'/>
								)
							}
							<input type="file" ref={inputImage} onChange={handleImageChange}  name="profileImage" id="" className='hidden'/>
						</div>
						<div>
							<InputBox
								user={user}
								setUser={setUser}
								name="fullname"
								type="text"
								placeholder="full name"
								icon='https://res.cloudinary.com/daghlyuwh/image/upload/v1713679668/nqp9pgaq8txhsxoyzh9y.png'
							/>
						</div>
						<div className='mt-4'>
							<InputBox
							user={user}
							setUser={setUser}
							name="username"
							type="text"
							placeholder="user name"
							icon='https://res.cloudinary.com/daghlyuwh/image/upload/v1713679671/ijbtxwky9yjqttp0cv9q.png'
							/>
						</div>
					</div>
				}
				<div className='mt-4'>
					<InputBox 
						user={user}
						setUser={setUser}
						name="email"
						type="email"
						placeholder="email"
						icon='https://res.cloudinary.com/daghlyuwh/image/upload/v1713679667/uuhrybcsqr9pumnnstst.png'
					/>
				</div>
				<div className='mt-4'>
					<InputBox 
							user={user}
							setUser={setUser}
							name="password"
							type="password"
							placeholder="password"
							icon='https://res.cloudinary.com/daghlyuwh/image/upload/v1713679669/z6rqesy6zdwpkr12we76.png'
						/>
					</div>
					<div className=' h-16 flex justify-center items-center mt-10'>
						<button class="px-8 py-1 h-12 rounded-full text-white text-md bg-[#464646] border-[1px] border-white hover:border-none hover:bg-violet-600 hover:shadow-md hover:shadow-violet-600/50 hover:scale-110 duration-200" id='font'
						onClick={handleSubmit}
						>
							{type == "signin" ? <p>Sign-In</p> : <p>Sign-Up</p>}
						</button>
					</div>
					<div className='flex flex-row justify-center py-6'>
						<div className='w-[40%] bg-gray-300 h-[1px] my-auto'></div>
						<div className='text-gray-300 px-2 font-gelasio'>Or</div>
						<div className='w-[40%] bg-gray-300 h-[1px] my-auto'></div>
					</div>
					<div className='h-16  flex justify-center items-center'>
						<button className='flex flex-row gap-2 bg-[#464646] px-4 py-2 rounded-full text-white border-[1px] border-white hover:bg-violet-600 hover:border-none hover:scale-110 duration-200' id='font'>
							<img src="/images/google.png" alt="" className='h-[20px] w-[20px] my-auto '/>
							<div className=''>Continue with Google</div>
						</button>
					</div>
					<div className='my-5 pb-5'>
					{
						type == 'signin' ? 
						<div className='flex flex-row justify-center'>
							<p className='text-[14px] my-auto text-white'>Don't have an account? </p>
							<Link to='/signup' className='my-auto text-blue-600 px-2 font-gelasio'>Sign-Up</Link>
						</div> 
						: 
						<div className='flex flex-row justify-center'>
							<p className='text-[14px] my-auto text-white'>Already have an account? </p>
							<Link to='/signin' className='my-auto text-blue-600 px-2 font-gelasio'>Sign-In</Link>
						</div>
					}
					</div>
				</form>
			</div>
			<Footer />
		</>
	)
}

export default UserAuthForm