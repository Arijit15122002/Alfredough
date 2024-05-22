import { Blog } from "../models/blogs.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerror.js"
import { APIresponse } from "../utils/APIresponse.js"
import { User } from "../models/user.model.js";


const fetchSingleBlog = async (req, res) => {

    try {  
        const blog = await Blog.findById(req.params.id);
        return res.status(200).json({message: "Blog fetched successfully", blog})
    } catch (error) {
        return res.status(400).json({message: "Error fetching blog", error})
    }
}

const fetchChainOfBlogs = async (req, res) => {
    try {
        const {blogIds} = req.body
        const blogs = await Blog.find({ _id: { $in: blogIds } });
        return res.status(200).json({message: "Blogs fetched successfully", blogs})
    } catch (error) {
        return res.status(400).json({message: "Error fetching blogs", error})
    }
}

const addBlogs = async (req, res) => {

    console.log(req.body)


    //getting details of a blog
    const {title, type, thumbnail, content, author} = req.body


    //validation
    if(title === "" || thumbnail === "" || type === "" || content === "" || author === "") {
        throw new APIerror(400, "All fields are required")  
    }


    //adding the blog
    try {
        const blog = await Blog.create(req.body);
        
        // Blog creation successful
        if(!blog) {
                return res.status(400).json({message: "Error creating blog"})
            }

        return res.status(201).json({message: "Blog added successfully", blog})

    } catch (error) {

        return res.status(400).json({message: "Error creating blog", error})
    }

}

const fetchBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        console.log(blogs);
        return res.status(200).json({message: "Blogs fetched successfully", blogs})
    } catch (error) {
        return res.status(400).json({message: "Error fetching blogs", error})
    }
}

const editLikes = async(req, res) => {
    const { userId, blogId } = req.body
    try{
        const blog = await Blog.findById(blogId);
        if( blog && blog.likedByUser.includes(userId) ){
            await blog.updateOne({
                $pull: { likedByUser: userId },
                $inc: { likes: -1 }
            })
            return res.status(200).json({message: "Like removed successfully", blog})
        } else {
            await blog.updateOne({
                $push: { likedByUser: userId },
                $inc: { likes: 1 }
            })
            return res.status(200).json({message: "Like added successfully", blog})
        }
    } catch(error) {
        return res.status(400).json({message: "Error updating likes", error})
    }
}

const getLikes = async(req, res) => {
    try {
        console.log(req.params.blogId)
        const blog = await Blog.findById(req.params.blogId);
        console.log(blog)
        return res.status(200).json({message: "Likes fetched successfully", blog})
    } catch (error) {
        return res.status(400).json({message: "Error fetching likes", error})
    }
}

const fetchFilteredBlogs = async(req, res) => {
    const type = req.params.type

    try {
        const blogs = await Blog.find({type});
        return res.status(200).json({message: "Blogs fetched successfully", blogs})
    } catch (error) {
        return res.status(400).json({message: "Error fetching blogs", error})
    }
}

const addComments = async (req, res) => {
    const { comment, userId, blogId } = req.body;
    console.log(comment, userId, blogId);  // Log for debugging
  
    try {
      const blog = await Blog.findOne({ _id: blogId });
      const user = await User.findOne({ _id: userId });
      if (blog && user && comment.length > 0) {
        await blog.updateOne({
          $push: { commentsByUser: { comment, userId } }
        });
        return res.status(200).json({ message: "Comment added successfully", blog });
      } else {
        return res.status(400).json({ message: "Blog not found" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Error adding comment", error });
    }
  };

const fetchComments = async(req, res) => {
    const blogId = req.params.blogId

    try {
        const blog = await Blog.findById(blogId);
        return res.status(200).json({message: "Comments fetched successfully", comments: blog.commentsByUser})
    } catch (error) {
        return res.status(400).json({message: "Error fetching comments", error})
    }
}

const searchResults = async(req, res) => {
    const query = req.params.query

    console.log(query)

    try {
        const blogs = await Blog.find({ 
            $or: [
                {type: { $regex: new RegExp(query, "i") } }, 
                {title: { $regex: new RegExp(query, "i") } },
            ]});
        return res.status(200).json({message: "Search results fetched successfully", blogs})
    } catch (error) {
        return res.status(400).json({message: "Error fetching blogs", error})
    }
    
}

const fetchMostPopularBlog = async(req, res) => {
    try{
        const blog = await Blog.find({}).sort({likes: -1}).limit(1);
        return res.status(200).json({message: "Most popular blog fetched successfully", blog})
    } catch (error) {
        return res.status(400).json({message: "Error fetching most popular blog", error})
    }
}

export {fetchSingleBlog, fetchChainOfBlogs, addBlogs, fetchBlogs, editLikes, getLikes, fetchFilteredBlogs, addComments, fetchComments, searchResults, fetchMostPopularBlog}


