import axios from 'axios'
import URL from '../utils/URL'
import { useQuery } from '@tanstack/react-query'

export const getPosts = () => {
    const query = useQuery(["posts"], async() => {
        const res = await axios.get(`${URL}/posts`)
        return res.data
    }, {
        enabled: false
    })
    return query
}

export const createPost = async data => {
    await axios.post(`${URL}/posts/create`, data)
}

export const deletePost = async id => {
    await axios.delete(`${URL}/posts/delete/${id}`)
}