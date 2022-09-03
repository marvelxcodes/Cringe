import axios from "axios";
import URL from "../utils/URL";

export const getLiked = async () => {
    return await axios.get(`${URL}/`)
}