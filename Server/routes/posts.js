import { Router } from "express"
import { createPost, getPosts, deletePost } from '../controllers/posts.js'

const Posts = Router()

Posts.get("/", getPosts)
Posts.post("/create", createPost)
Posts.delete("/delete/:postId", deletePost)

export default Posts