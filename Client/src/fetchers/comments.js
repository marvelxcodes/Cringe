import axios from "axios";
import URL from "../utils/URL";

export const createComment = async () => {
    return await axios.post(`${URL}/`)
}