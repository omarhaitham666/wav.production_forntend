import axios from "axios";
import { API_ENDPOINT } from "../App";


export async function getVideosOrder() {

    axios.get(`${API_ENDPOINT}/VideosOrder`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}
