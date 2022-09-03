import { Router } from "express";
import { createLike, getLikes } from '../controllers/likes'

const Likes = Router()

Likes.get("/:email", getLikes)
Likes.post("/create", createLike)

export default Likes