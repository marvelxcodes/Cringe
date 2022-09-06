import { Router } from "express"
import upload from '../controllers/upload.js'
import { createPost, getPosts, getTrending, deletePost } from '../controllers/posts.js'

const Posts = Router()

Posts.get("/", getPosts)
Posts.get("/trending", getTrending)
Posts.post("/create", createPost)
Posts.delete("/delete/:postId", deletePost)
Posts.post("/upload", upload.single('image'), (req, res) => {
    res.status(200).json({status: "success!"})
})
export default Posts