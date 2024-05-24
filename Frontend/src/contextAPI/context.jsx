import React, {createContext, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Context = createContext()

export const ContextProvider = ({children}) => {

    const navigate = useNavigate();

    
    const [loggedIn, setLoggedIn] = useState(false);
    const [hasRenderedHomeScreen, setHasRenderedHomeScreen] = useState(true);
    const [details, setDetails] = useState({
        id:'',
        fullname: '',
        username: '',
        email: '',
        avatar: '',
    });

    

    useEffect(() => {
        async function fetchUserIfTokenValid() {
            try {

                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if(token && userId) {
                    const response = await axios.post('http://localhost:8000/user/authcheck', {
                    headers:{
                        authorization: `Bearer ${token}`
                    }, 
                    userId: userId
                    });
                    console.log(response);
                    setLoggedIn(response?.data?.loggedIn)
                    setDetails({
                        id: response.data.user._id,
                        fullname: response.data.user.fullname,
                        username: response.data.user.username,
                        email: response.data.user.email,
                        avatar: response.data.user.avatar,
                        addedToFavorites: (response.data.user.addedToFavorites || []),
                    })
                } else {
                    setLoggedIn(false)
                    setDetails({
                        id:'',
                        fullname: '',
                        username: '',
                        email: '',
                        avatar: '',
                    })
                }
    
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    
        fetchUserIfTokenValid();
    }, []);

    
    useEffect(() => {
		const isLogIn = async() => {
			const token = localStorage.getItem('token')
			if (token) {
				const response = await axios.get('http://localhost:8000/user/logincheck', {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                )
                setLoggedIn(response?.data?.isLoggedIn)

            }
		}

        isLogIn()
	}, [])

    const storeTokenInLocalStorage = (token) => {
        return localStorage.setItem('token', token);
    };

    const LogoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoggedIn(false);
        setDetails({
            id:'',
            fullname: '',
            username: '',
            email: '',
            avatar: '',
        }); 
        navigate('/')
    }

    return (
        <Context.Provider value={{loggedIn, setLoggedIn, details, setDetails, hasRenderedHomeScreen, setHasRenderedHomeScreen, storeTokenInLocalStorage, LogoutUser}}>
            {children}
        </Context.Provider>
    )
}

export const useGlobalContext = () => useContext(Context)