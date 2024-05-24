import React, {useState, useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import UserAuthForm from './pages/UserAuthForm'
import Write from './pages/Write'
import DashBoard from './pages/Dashboard'
import Profile from './pages/Profile'
import Categories from './pages/Categories'
import { ContextProvider, useGlobalContext } from './contextAPI/context'
import BlogDetails from './pages/BlogDetails'
import SearchResults from './pages/SearchResults'
import AuthorBlogs from './pages/AuthorBlogs'
import HomeScreen from './pages/HomeScreen'
import FavoriteBlogs from './pages/FavoriteBlogs'
import WrittenBlogs from './pages/WrittenBlogs'
import WrittenAndFavBlogs from './components/WrittenAndFavBlogs'



const App = () => {

	

return (
	<>
	<ContextProvider>
		<Routes>
			<Route path='/' element={<Navbar/>}>
				<Route index element={<HomeScreen/>}/>
				<Route path='write' element={<Write/>}/>
				<Route path='signin' element={<UserAuthForm type='signin'/>}/>
				<Route path='signup' element={<UserAuthForm type='signup'/>}/>
				<Route path='dashboard' element={<DashBoard/>}/>
				<Route path='profile' element={<Profile/>}/>
				<Route path='categories' element={<Categories/>}/>
				<Route path='/blogs/:_id' element={<BlogDetails />} />
				<Route path='/searchResults' element=<SearchResults /> />
				<Route path='/author/:authorId' element=<AuthorBlogs />/>
				<Route path='/favorites' element={<FavoriteBlogs/>}/>
				<Route path='/written' element={<WrittenBlogs/>}/>
			</Route>
		</Routes>
	</ContextProvider>
	</>
	)
}

export default App
