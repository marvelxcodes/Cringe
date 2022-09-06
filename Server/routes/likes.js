import { Router } from "express";
import { appendLike, createLiked, getLikes } from '../controllers/likes.js'

const Likes = Router()

Likes.get("/:email", getLikes)
Likes.post("/create", createLiked)
Likes.post("/append", appendLike)

export default Likes