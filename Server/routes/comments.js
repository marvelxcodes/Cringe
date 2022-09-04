import { Router } from "express";
import { createComment, getComments } from '../controllers/comments.js'

const Comments = Router()

Comments.get("/:postId", getComments)
Comments.post("/create", createComment)

export default Comments