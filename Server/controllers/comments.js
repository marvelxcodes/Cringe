import prisma from '../prisma/index.js'

export const getComments = async (req, res) => {
    const { postId } = req.params
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId
            }
        })
        res.status(200).json(comments)
    } catch (err) {
        res.send(err)
    }
}

export const createComment = async (req, res) => {
    try {
        await prisma.comment.create({
            data: req.body
        })
        res.status(200).json({status: "Success!"})
    } catch (err) {
        res.send(err)
    }
}