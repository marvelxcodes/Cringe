import axios from "axios";
import URL from "../utils/URL";
import { useQuery } from "@tanstack/react-query";

export const getLiked = email => {
    const query = useQuery(["liked"], async () => {
        const res = await axios.get(`${URL}/likes/${email}`)
        return res.data
    }, {
        enabled: false
    })
    return query
}

export const createLike = async data => {
    await axios.post(`${URL}/likes/create`, data)
}