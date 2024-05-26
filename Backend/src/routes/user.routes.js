import { Router } from "express";
import { loginUser, registerUser, searchUser, addWrittenBlogs, addToFavorites, checkIfLoggedIn, checkAuthentication } from "../controllers/user.controller.js";

const router = Router();

router.route('/signup').post(registerUser);
router.route('/signin').post(loginUser);
router.route('/logincheck').get(checkIfLoggedIn)
router.route('/authcheck').post(checkAuthentication)
router.route('/:userId').get(searchUser)
router.route('/addWrittenBlog').post(addWrittenBlogs)
router.route('/favorites').post(addToFavorites)


export default router;
