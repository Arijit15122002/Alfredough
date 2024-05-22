import React from 'react'
import '../CSS/style.css'

function Footer () {
  return (
    <div className='bottom-0 mt-20 bg-white p-4 w-full h-auto'>
        <div className='w-full h-auto py-10'>
            <div className='flex flex-row h-[60px]'>
                <div className=' flex flex-row gap-2 items-center w-[220px] bg-[#232323] ml-6 px-5 rounded-3xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40px" height="40px">
                        <path fill="#acb7d0" d="M59 48L29 48 25 43 59 43z" />
                        <path fill="#c2cde7" d="M54,53H28.448c-0.936,0-1.842,0.328-2.561,0.927l-9.247,7.706c-0.651,0.543-1.64,0.08-1.64-0.768 L15,54c0-0.552-0.448-1-1-1h-4c-2.761,0-5-2.239-5-5V16c0-2.761,2.239-5,5-5h44c2.761,0,5,2.239,5,5v32C59,50.761,56.761,53,54,53z" />
                        <path fill="#5dbc9d" d="M15.004,5L15,30.8l8,9l8-9V5c0-1.105-0.895-2-2-2H17.004C15.899,3,15.004,3.895,15.004,5z" />
                        <path fill="#faefde" d="M15 30.107L23 28 31 30.107 25 37 22 37z" />
                        <path fill="#72caaf" d="M23,29h-8V3h5c1.657,0,3,1.343,3,3V29z" />
                        <path fill="#acb7d0" d="M32 53L25 43 59 43 58.581 50 56 53z" />
                        <path fill="#8d6c9f" d="M54,10H32V5c0-1.65-1.35-3-3-3H17c-1.65,0-3,1.35-3,3v5h-4c-3.31,0-6,2.69-6,6v32 c0,3.31,2.69,6,6,6h4v6.87c0,0.78,0.44,1.47,1.15,1.81c0.28,0.12,0.57,0.19,0.85,0.19c0.46,0,0.91-0.16,1.28-0.47l9.25-7.7 c0.54-0.45,1.22-0.7,1.92-0.7H32h22c3.31,0,6-2.69,6-6v-5V16C60,12.69,57.31,10,54,10z M16,5c0-0.55,0.45-1,1-1h12 c0.55,0,1,0.45,1,1v5v2v16.72l-6-1.5V15c0-0.553-0.448-1-1-1s-1,0.447-1,1v12.22l-6,1.5V12v-2V5z M25.926,35h-5.853l-3.811-4.285 L23,29.031l6.738,1.684L25.926,35z M25.25,53.16L16,60.87V54c0-1.1-0.9-2-2-2h-4c-2.21,0-4-1.79-4-4V16c0-2.21,1.79-4,4-4h4v18.8 c0,0.24,0.09,0.48,0.25,0.66l4.621,5.198c0.002,0.002,0.002,0.004,0.004,0.006l3.378,3.8c0.043,0.048,0.102,0.073,0.153,0.112 C22.577,40.709,22.777,40.8,23,40.8s0.423-0.091,0.595-0.224c0.05-0.039,0.11-0.064,0.153-0.112l3.378-3.8 c0.002-0.002,0.002-0.004,0.004-0.006l4.621-5.198C31.91,31.28,32,31.04,32,30.8V12h22c2.21,0,4,1.79,4,4v26H25 c-0.373,0-0.715,0.207-0.887,0.538c-0.172,0.331-0.146,0.729,0.068,1.035L30.079,52H28.45C27.28,52,26.14,52.41,25.25,53.16z M32.521,52l-2.583-3.69C29.97,48.211,30,48.11,30,48v-1c0-0.553-0.448-1-1-1c-0.208,0-0.389,0.078-0.549,0.186L26.92,44H58v4 c0,2.206-1.794,4-4,4H32.521z" />
                        <path fill="#8d6c9f" d="M34 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C35 46.447 34.552 46 34 46zM39 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C40 46.447 39.552 46 39 46zM44 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C45 46.447 44.552 46 44 46zM49 46c-.552 0-1 .447-1 1v2c0 .553.448 1 1 1s1-.447 1-1v-2C50 46.447 49.552 46 49 46zM55 49v-2c0-.553-.448-1-1-1s-1 .447-1 1v2c0 .553.448 1 1 1S55 49.553 55 49zM23 12c.552 0 1-.447 1-1V7c0-.553-.448-1-1-1s-1 .447-1 1v4C22 11.553 22.448 12 23 12z" />
                    </svg>
                    <div className='text-3xl text-white 'id='font'>Alfredough</div>
                </div>
                <div className='h-full flex justify-end items-end text-3xl font-bold'>...</div>
                <div className='text-[#676767] text-md sm:text-lg lg:text-xl px-6 flex items-end ' id='kanit'>
                    Sharing a slice of life through stories.
                </div>
            </div>
            <div className='text-[#232323] text-4xl font-semibold text-center pt-10 pb-10' id='kanit'>
                ' Let's start '
            </div>
            <div className='w-full flex flex-col md:flex-row'>
                <div className='bg-purple-200 shadow-md shadow-[#232323]/50 h-auto w-[75%] md:max-w-[400px] md:ml-6 mx-auto px-10 flex flex-col p-2 rounded-xl'>
                    <div className='w-[250px] p-4 bg-[#232323] text-white rounded-lg' id='kanit'>
                        Enter your email  here to receive the latest updates and newsletter.
                    </div>
                    <div className='py-6 flex flex-col gap-3 w-full justify-end'>
                        <input type="text" className='text-lg px-4 py-1 rounded-xl focus:outline-none' id='kanit'/>
                        <div className='w-full flex justify-end'>
                            <div className=' flex right-1 px-4 py-2 bg-[#232323] text-white rounded-lg font-semibold hover:bg-white hover:text-[#232323] hover:border-[1px] hover:border-[#232323] hover:scale-110 cursor-pointer duration-200 ease-in-out shadow-sm shadow-black/50' id='font'>Sign me up</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row w-[80%] p-4 rounded-lg justify-between mx-auto'>
                    <div className='' id='kanit'>
                        <div className='text-lg px-6 py-2 w-[170px]'>Connect with us at,</div>
                        <div className='text-[#4f4f4f] px-6 flex flex-row md:flex-col' id=''>
                            <div className='p-1 cursor-pointer'><img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1716322462/h4vtstotryrnxlixvk3t.png" alt="" className='w-8 h-8'/></div>
                            <div className='p-1 cursor-pointer'><img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1716322462/z1rrltqo6lbph62flzy3.png" alt="" className='w-8 h-8'/></div>
                            <div className='p-1 cursor-pointer'><img src="https://res.cloudinary.com/daghlyuwh/image/upload/v1716322462/fzpice1yahdhqlffvp57.png" alt="" className='w-8 h-8'/></div>
                        </div>
                    </div>
                    <div className='' id='kanit'>
                        <div className='text-lg px-6 py-2 w-[170px]'>Find out more about us,</div>
                        <ul className='text-[#4f4f4f] px-6' id=''>
                            <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Help</li>
                            <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>About</li>
                            <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Privacy Policy</li>
                            <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>The Dailiy Grind</li>
                        </ul>
                    </div>
                    <div className='hidden lg:flex flex-col '>
                        <div className='text-lg px-6 py-2 w-[170px]' id='kanit'>Find out more about us,</div>
                            <ul className='text-[#4f4f4f] px-6' id='kanit'>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Contact</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>FAQ</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Creators Handbook Policy</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Creator Terms </li>
                            </ul>
                    </div>
                    <div className='hidden xl:flex flex-col '>
                        <div className='text-lg px-6 py-2 w-[170px]' id='kanit'>Find out more about us,</div>
                            <ul className='text-[#4f4f4f] px-6' id='kanit'>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Pricing</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Mac App</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Teams</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>Creators</li>
                                <li className='cursor-pointer hover:text-black duration-200 ease-in-out hover:underline'>API</li>
                            </ul>
                    </div>
                </div>
            </div>
        </div>
        <small className='text-[#959595]' id='kanit'>
            © Copy Right Alfredoug, 2024. All rights are reserved.
        </small>
    </div>
  )
}

export default Footer