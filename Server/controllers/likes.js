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
    const { email, liked, likes, postId, currPostId } = req.body

    if (liked===undefined) {
        await prisma.liked.create({
            data: {
                postId, email
            }
        })
    } else {
        await prisma.liked.update({
            data: {
                postId: [...liked, postId]
            }
        })
    }
    await prisma.post.update({
        where: {
            id: currPostId
        },
        data: {
            likes: likes+1
        }
    })
    res.status(200).json({status: "success"})
}