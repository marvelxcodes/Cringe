import { Router } from "express"
import { createPost, getPosts } from '../controllers/posts.js'

const Posts = Router()

Posts.get("/", getPosts)
Posts.post("/create", createPost)

export default Posts