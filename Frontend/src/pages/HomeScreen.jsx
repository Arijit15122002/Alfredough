import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../CSS/homescreen.css'
import '../CSS/style.css'
import { TypeAnimation } from 'react-type-animation'
import { useGlobalContext } from '../contextAPI/context'
import Footer from '../components/Footer'

function HomeScreen () {

	const {loggedIn, details} = useGlobalContext()
	console.log(details);
	const [user, setUser] = useState()

	const observerRef = useRef(null)
	const observerRef2 = useRef(null)

	useEffect(() => {
		observerRef.current = new IntersectionObserver((entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  entry.target.classList.add('show1');
			} else {
			  entry.target.classList.remove('show1');
			}
		  });
		});
		const hiddenElements = document.querySelectorAll('.customizedHidden1');
		hiddenElements.forEach((el) => observerRef.current.observe(el));
	  
		return () => {
		  if (observerRef.current) {
			observerRef.current.disconnect();
		  }
		};
	  }, []);

	  useEffect(() => {
		observerRef2.current = new IntersectionObserver((entries) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  entry.target.classList.add('show2');
			} else {
			  entry.target.classList.remove('show2');
			}
		  });
		});
		const hiddenElements = document.querySelectorAll('.customizedHidden2');
		hiddenElements.forEach((el) => observerRef2.current.observe(el));
	  
		return () => {
		  if (observerRef2.current) {
			observerRef2.current.disconnect();
		  }
		};
	  }, []);

	return (
	<>
		<div className=''>
			<div className=' mt-[100px] xl:mt-[60px] flex flex-col xl:flex-row justify-center items-center xl:h-[92vh] xl:gap-6'>
				<div className='w-full h-[80vh] mb-10 lg:w-auto flex flex-col md:flex-row items-center justify-center xl:justify-normal'>
					<div className='w-[85vw] max-w-[450px] flex flex-col items-center'>
						<div className='flex flex-row w-full max-w-[410px] h-[200px]'>
							<div className='animate-slide-left w-[70%] h-full rounded-2xl overflow-hidden p-3'>
								<img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover shadow-md shadow-black/50 object-center rounded-2xl'/>
							</div>
							<div className='animate-slide-down w-[30%] h-full rounded-2xl overflow-hidden p-3'>
								<img src="https://images.unsplash.com/photo-1500817487388-039e623edc21?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-full h-full object-cover shadow-md shadow-black/50 object-center rounded-2xl' alt="" />
							</div>
						</div>
						<div className='flex flex-row w-full max-w-[410px] h-[200px]'>
							<div className=' animate-slide-up w-[30%] h-full rounded-2xl overflow-hidden p-3'>
								<img src="https://images.unsplash.com/photo-1532767153582-b1a0e5145009?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-full h-full object-cover shadow-md shadow-black/50 object-center rounded-2xl'/>
							</div>
							<div className='animate-slide-right w-[70%] h-full rounded-2xl overflow-hidden p-3'>
								<img src="https://images.unsplash.com/photo-1610817201767-793a9130ce07?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-full h-full object-cover shadow-md shadow-black/50 object-center rounded-2xl' alt="" />
							</div>
						</div>
					</div>

					<div className=' w-[90vw] max-w-[350px] md:w-[450px] lg:w-[400px] h-auto px-2 mt-12 rounded-xl animate-slide-down'>

						<div className='text-white text-7xl' id='glowup'>
							<p id='font' className='text-center'>Alfredough</p>
						</div>
						<div className='text-[#c3c3c3] p-1' id='kanit'>Embark the journey of words</div>
					</div>
				</div>
				
				<div className='hidden mt-12 bg-violet-300 rounded-xl w-[90vw] max-w-[500px] h-[40vh] lg:h-[70vh] xl:flex items-center justify-center animate-slide-right' >
					<div className='w-[85%] h-[85%] lg:h-[50vh] rounded-xl overflow-hidden shadow-xl shadow-black/50 ' id='background_home2'>
						<div className='bg-black/55 w-full h-full text-white text-3xl flex flex-col justify-center px-10' id='kanit'>
							<div className='' id='glowup'>
								<TypeAnimation
									sequence={[
										"READ...", 1000,
										"WRITE...", 1000,
										"SHARE...", 1000
									]}
									speed={30}
									repeat={Infinity}
								/>
								<p>Stories of your Life</p>
								<p>in Alfredough</p>
							</div>
							<div className='flex flex-row items-center justify-between mt-[15%]'>
								<div className='text-md font-bold' id='cabin'>
								{
									loggedIn ? 
									<div>Hi, {details?.fullname?.split(' ')[0]}!</div> : 
									<div className='text-lg'>Start your journey with  us!</div>
								}
								</div>
								<div className=' text-[20px] w-auto text-center flex justify-end cursor-pointer hover:scale-110 duration-200 ease-in-out' id='font'>
								{
									loggedIn ? <Link to="/dashboard" className='bg-black rounded-xl shadow-sm shadow-black/50 py-1 px-3 hover:shadow-md'>Dashboard</Link> : <Link to="/signup" className='bg-black rounded-xl shadow-sm shadow-black/50 py-1 px-3 hover:shadow-md'>Sign up</Link>
								}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className=' mt-20 w-full h-[100vh] sm:h-[80vh] md:h-[80vh] flex flex-col sm:flex-row items-center'>
				<div className=' w-[80vw] h-[40vh] sm:w-[30vw] md:w-[40vw] sm:h-full text-white text-7xl flex rounded-xl overflow-hidden mx-10 customizedHidden1' id='background_home1'>
					<div className='w-[50%] h-full backdrop-blur-sm bg-black/75 flex flex-col justify-center' id='font'>
					</div>
				</div>
				<div className=' w-[90vw] sm:w-[70vw] md:w-[60vw] xl:w-[40vw] my-14 mx-10 customizedHidden1'>
					<div className='text-white text-4xl' id='little_glow'>
						<p id='kanit'>
							Craving a slice of the blogosphere but tired of the burnt toast other platforms offer? 
						</p>
					</div>
					<div className='text-violet-300 text-2xl font-semibold flex justify-end py-2 px-6 cursor-pointer hover:scale-110 duration-200 ease-in-out' id='cabin'> -> Try Alfredough! </div>
					<div className='text-[#c3c3c3] text-[18px] py-4' id='kanit'>We're the hottest new blogging site, kneaded with fresh features to make your online voice rise like perfectly golden bread. Here, you can bake up captivating posts, top them with stunning visuals, and share your delicious content with the world. We're all about keeping it fresh, simple, and oh-so-satisfying. So ditch the stale crumbs and come start your blog on Alfredough today!</div>
				</div>
			</div>
			
			<div className='h-[95vh] w-full flex justify-center items-center'>
			
				<div className='hidden md:flex flex-col h-[85%] w-[50%] items-center justify-center gap-8'>
					<div className='w-[70%]'>
						<div className='text-[#e5e5e5] text-3xl' id='little_glow'>
							<p id='cabin'>"We write to taste life twice, in the moment and in retrospect."</p>
						</div>
						<div className='text-right text-xl text-white' id='font'>- Anaïs Nin</div>
					</div>
					<div className='w-[70%] py-6 px-10 text-[#ffffff] bg-[#1a1a1a] text-xl rounded-xl shadow-md shadow-black/50' id='kanit'>
					We're the bakery of fresh-baked stories, serving up piping hot content every single day. No day is a dud here – we've got a smorgasbord of new reads to keep your mind buzzing and your blogosphere cravings satisfied. So, ditch the crumbs of the ordinary and come get your daily bread (and stories!) at Alfredough!
					</div>
				</div>
				<div className='w-[80%] md:w-[45%] h-[80%] rounded-2xl overflow-hidden customizedHidden1' id='background_home3'>
					<div className='w-[70%] h-full bg-black/85 flex items-center justify-center'>
						<div className='h-auto w-full'>
							<div className='text-white text-3xl px-6' id='kanit'>
								<p id='glowup'>Hungry for knowledge in any flavor?</p>

								<div className='text-2xl text-right text-sky-200' id='cabin'>We got you!</div>
							</div>
							<div className='text-[#d3d3d3] text-md px-6 py-4' id='kanit'>
								<p>Alfredough serves up a smorgasbord of blog categories! From techie treats to fashion feasts, travelogues to tasty recipes, we've got a slice of the blogosphere for every craving. So, ditch the bland and dive into the delicious diversity of <span className='text-lg text-violet-400' id='cabin'>Alfredough</span>!</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full flex justify-center xl:hidden customizedHidden1 pb-[50px]'>
				<div className='mt-12 bg-violet-300 rounded-xl w-[90vw] max-w-[500px] h-[40vh] lg:h-[70vh] flex items-center justify-center animate-slide-right' >
					<div className='w-[85%] h-[85%] lg:h-[50vh] rounded-xl overflow-hidden shadow-xl shadow-black/50 ' id='background_home2'>
						<div className='bg-black/55 w-full h-full text-white text-3xl flex flex-col justify-center px-10' id='kanit'>
							<div className='' id='glowup'>
								<TypeAnimation
									sequence={[
										"READ...", 1000,
										"WRITE...", 1000,
										"SHARE...", 1000
									]}
									speed={30}
									repeat={Infinity}
								/>
								<p>Stories of your Life</p>
								<p>in Alfredough</p>
							</div>
							<div className='flex flex-row items-center justify-between mt-[10%]'>
								<div className='text-md font-bold w-[60%]' id='cabin'>
								{
									loggedIn ? 
									<div>Hi, {user}!</div> : 
									<div className='text-lg'>Start your journey with  us!</div>
								}
								</div>
								<div className=' text-[20px] text-center flex justify-end cursor-pointer hover:scale-110 duration-200 ease-in-out w-[40%]' id='font'>
								{
									loggedIn ? <Link to="/dashboard" className='bg-black rounded-xl shadow-sm shadow-black/50 py-1 px-3 hover:shadow-md'>Dashboard</Link> : <Link to="/signup" className='bg-black rounded-xl shadow-sm shadow-black/50 py-1 px-3 hover:shadow-md'>Sign up</Link>
								}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</>
	)
}

export default HomeScreen

