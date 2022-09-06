import prisma from '../prisma/index.js'
import upload from './upload.js'
import { v4 as uuid } from 'uuid'

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                _count: true
            }
        })
        res.status(200).json(posts)
    } catch (err) {
        res.send(err)
    }
}

export const getTrending = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                likes: 'desc'
            },
            include: {
                _count: true
            }
        })
        res.status(200).json(posts)
    } catch (err) {
        res.send(err)
    }
}

export const createPost = async (req, res) => {
    const { caption, creator, tags, thumbnail, form } = req.body
    const imageName = uuid()
    try {
        await prisma.post.create({
            data: {
                caption,
                creator,
                thumbnail: imageName,
                tags
            }
        })
        console.log(form)
        upload(imageName).single('image')
        res.status(200).json({ status: "Success!" })
    } catch (err) {
        res.send(err)
    }
}

export const deletePost = async (req, res) => {
    const { id } = res.body
    await prisma.post.delete({
        where: {
            id
        }
    })
}