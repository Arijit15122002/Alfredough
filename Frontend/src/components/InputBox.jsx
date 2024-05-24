import React, { useState } from 'react'

function InputBox ({name, type, id, placeholder, icon, user, setUser }) {
    const [ passwordVisible, setPasswordVisible] = useState(false)

    const handleInputs = (e) => {

        if(name === 'username'){
            setUser({...user, username : e.target.value})
        } else if(name === 'fullname'){
            setUser({...user, fullname : e.target.value})
        } else if(name === 'email'){
            setUser({...user, email : e.target.value})
        } else if(name === 'password'){
            setUser({...user, password : e.target.value})
        }
    }

    return (
    <>
        <div className='w-full h-full'>
            <div className='flex flex-row gap-2'>
                <img src={icon} alt="" className='w-[30px] h-[30px] my-auto'/>
                <input 
                    type={ type == 'password' ? passwordVisible ? 'text' : "password" : type}
                    name={name}
                    onChange={handleInputs}
                    placeholder={placeholder}
                    id={id}
                    className='w-full my-auto px-4 py-[5px] rounded-xl border-[2px] border-gray-400 bg-gray-100 focus:bg-violet-200 focus:outline-none focus:border-black duration-200 font-gelasio'
                />
                {
                type == 'password' ? 
                    <img src={passwordVisible ? 'https://res.cloudinary.com/daghlyuwh/image/upload/v1713679698/pjcbxodvyf4xxveox8wh.png' : 'https://res.cloudinary.com/daghlyuwh/image/upload/v1713679666/m1nrgck2uv37fmyvyf2c.png'} alt="" className='w-[25px] h-[25px] left-4 mt-[7px] cursor-pointer' onClick={() => setPasswordVisible(!passwordVisible)}/>
                : <></>
            }
            </div>
        </div>
    </>
    )
}

export default InputBox