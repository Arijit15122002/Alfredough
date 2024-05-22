import { Router } from "express";
import { addBlogs, fetchChainOfBlogs, fetchBlogs, editLikes, getLikes, fetchSingleBlog, fetchFilteredBlogs, addComments, fetchComments, searchResults, fetchMostPopularBlog } from "../controllers/blogs.controller.js";

const router = Router();

router.route('/page/:id').get(fetchSingleBlog)
router.route('/chain').post(fetchChainOfBlogs)
router.route('/write').post(addBlogs);
router.route('/dashboard').get(fetchBlogs);
router.route('/likes').post(editLikes);
router.route('/likes/get/:blogId').get(getLikes);
router.route('/list/:type').get(fetchFilteredBlogs);
router.route('/comments').post(addComments);
router.route('/comments/:blogId').get(fetchComments);
router.route('/search/:query').get(searchResults);
router.route('/popular').get(fetchMostPopularBlog)

export default router;