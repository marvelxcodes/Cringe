import { Prisma } from '@prisma/client'
import prisma from '../prisma/index.js'

export const getLikes = async (req, res) => {
    const { email } = req.params
    try {
        const posts = await prisma.liked.findUnique({
            where: {
                email
            }
        })
        res.status(200).json(posts)
    } catch (err) {
        res.send(err)
    }
}

export const createLike = async (req, res) => {
    const { email, liked, postId } = res.body
    try {
        await prisma.liked.create({
            data: {
                postId, email
            }
        })
        res.status(200).json({status: "UserCreated!"})
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
            await prisma.liked.update({
                data: {
                    postId: [...liked, postId]
                }
            })
            res.status(200).json({status: "LikeAdded!"})
        } else {
            res.send("Error Occured!")
        }
    }
}