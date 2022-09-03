import { Router } from "express";
import { createComment, deleteComment, getComments } from '../controllers/comments.js'

const Comments = Router()

Comments.get("/:postId", getComments)
Comments.post("/create", createComment)
Comments.delete("/delete", deleteComment)

export default Comments