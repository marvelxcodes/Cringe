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

export const appendLike = async (req, res) => {
    const { likes, postId, currPostId, email } = req.body
    await prisma.liked.update({
        data: {
            postId
        },
        where: {
            email
        }
    })
    
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

export const createLiked = async (req, res) => {
    const { email } = req.body

    await prisma.liked.create({
        data: {
            postId: [], email
        }
    })
    
    res.status(200).json({status: "success"})
}