import prisma from '../prisma/index.js'

export const getComments = async (req, res) => {
    const {} = req.params
    try {
        const posts = await prisma.post.findMany()
        res.status(200).json(posts)
    } catch (err) {
        res.send(err)
    }
}

export const createComment = async (req, res) => {
    try {
        await prisma.comment.create({
            data: res.body
        })
        res.status(200).json({status: "Success!"})
    } catch (err) {
        res.send(err)
    }
}

export const deleteComment = async (req, res) => {
    const { id } = res.body
    await prisma.post.delete({
        where: {
            id
        }
    })
}