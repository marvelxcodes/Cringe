import axios from 'axios'
import URL from '../utils/URL'

export const getPosts = async () => {
    const res = await axios.get(`${URL}/posts`)
    return res
}

export const createPost = async (data) => {
    await axios.post(`${URL}/posts/create`, data)
    return data
}