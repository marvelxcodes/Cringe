import axios from "axios";
import URL from "../utils/URL";
import { useQuery } from "@tanstack/react-query";

export const createComment = data => {
    return axios.post(`${URL}/comments/create`, data)
}

export const getComments = postId => {
    const query = useQuery(["comments", postId], () => {
        return axios.get(`${URL}/comments/${postId}`)
    })
    return query
}