import { Router } from "express"
import { createPost, getPosts, getTrending, deletePost } from '../controllers/posts.js'

const Posts = Router()

Posts.get("/", getPosts)
Posts.get("/trending", getTrending)
Posts.post("/create", createPost)
Posts.delete("/delete/:postId", deletePost)

export default Posts