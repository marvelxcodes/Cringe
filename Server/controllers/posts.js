import prisma from '../prisma/index.js'

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
    try {
        const res = await prisma.post.create({
            data: req.body
        })
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