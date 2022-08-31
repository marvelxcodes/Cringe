import prisma from '../prisma/index.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany()
        res.status(200).json(posts)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

export const createPost = async (req, res) => {
    const { body } = res
    try {
        await prisma.post.create({
            data: body
        })
        res.status(200).json({status: "Success!"})
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}