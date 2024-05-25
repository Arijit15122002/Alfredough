import {asyncHandler} from "../utils/asyncHandler.js"
import {APIerror} from "../utils/APIerror.js"
import { APIresponse } from "../utils/APIresponse.js"
import { User } from "../models/user.model.js"
import { Blog } from "../models/blogs.models.js"
import jwt from 'jsonwebtoken'


const registerUser = async (req, res) => {
    // get user details from frontend 
    const {username, email, fullname, password, avatar} = req.body

    // validation - if empty or not
    if(fullname === "" || username === "" || email === "" || password === "") {
        return res.status(400).json({message: 'All fields are required'})
    }
    if(email?.substring(email.length - 10, email.length) !== "@gmail.com") {
        return res.status(400).json({message: "Invalid email"})
    }

    // check if user already exists 
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if(existedUser){
        return res.status(400).json({message: 'User already exists'})
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        password,
        avatar: avatar,
    })
    
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-_id username email fullname avatar")

    // check for user creation
    if(!createdUser) {
        return res.status(400).json({message: 'User creation failed'})
    } else {
        return res.status(201).json({message: 'User Created successfully', user})
    }

    //return response
    return res.status(201).json({message: 'User Created successfully', token: await createdUser.generateToken()})
}

const checkIfLoggedIn = async(req, res) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if(token) {

            const decoded = jwt.decode(token);
            // If token couldn't be decoded, return true (invalid token)
            if (!decoded) {
                return res.status(400).json({isLoggedIn: false});
            }

            // Get the current time (in seconds)
            const currentTime = Math.floor(Date.now() / 1000);

            // Check if the token is expired
            let isExpired =  decoded.exp < currentTime;
            return res.status(200).json({isLoggedIn: !isExpired});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

const checkAuthentication = async(req, res) => {
    try {
        const token = req?.body?.headers?.authorization?.split(" ")[1];
        const userId = req?.body?.userId
        if(token) {
            const decoded = jwt.decode(token);
            if(decoded._id === userId) {
                const user = await User.findById(userId)
                return res.status(200).json({loggedIn: true, user})
            } else {
                return res.status(401).json({loggedIn: false})
            }
        } else {
            return res.status(401).json({message: "Unauthorized"}, false)
        }
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

const loginUser = asyncHandler(async (req, res) => {

    //validation
    const {email, password} = req.body
    if(email === "" || password === "") {
        throw new APIerror(400, "All fields are required")
    }

    //check if user exists
    const existedUser = await User.findOne({
        $or: [{ email }, { password }]
    })

    //return response           
    if(!existedUser) {
        return res.status(400).json({message: 'User does not exist'})
    } else {
        return res.status(200).json({message: 'User logged in successfully', user: existedUser, token: await existedUser.generateToken()})
    }
})

const searchUser = async(req, res) => {
    const id = req.params.userId 
    const user = await User.findById(id)

    if(!user){
        return res.status(400).json({message: "User does not exist"})
    } else {
        return res.status(200).json({user})
    }
}

const addWrittenBlogs = async(req, res) => {
    const {userId, blogId} = req.body
    const blog = await Blog.findById(blogId)

    if(blog){
        const user = await User.findById(userId)

        if(user){   
            user.writtenBlogs.push(blogId)
            await user.save()
            return res.status(200).json({message: "Blog added successfully"})
        } else {
            return res.status(400).json({message: "User does not exist"})
        }
    } else {
        return res.status(400).json({message: "Blog does not exist"})
    }
}

const addToFavorites = async (req, res) => {
    try {
        const { userId, blogId } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({ message: "Blog does not exist" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isFavorite = user.addedToFavorites.includes(blogId);
        if (isFavorite) {
            user.addedToFavorites.pull(blogId); // Remove from favorites
            await user.save();
            return res.status(201).json({ message: "Blog removed from favorites" });
        } else {
            user.addedToFavorites.push(blogId); // Add to favorites
            await user.save();
            return res.status(201).json({ message: "Blog added to favorites" });
        }
    } catch (error) {
        console.error(error); // Log the actual error
        return res.status(500).json({ message: "Internal server error" });
    }
};


export {registerUser, loginUser, searchUser, addWrittenBlogs, addToFavorites, checkIfLoggedIn, checkAuthentication}