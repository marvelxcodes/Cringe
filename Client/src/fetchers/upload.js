import axios from "axios";
import URL from "../utils/URL";

export const upload = (thumbnail) => {
    const data = new FormData()
    data.append("image", thumbnail)
    axios.post(`${URL}/upload`, data)
}