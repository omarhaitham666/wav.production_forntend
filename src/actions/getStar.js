import axios from "axios";
import { API_ENDPOINT } from "../App";

export async function getStars() {

    axios.get(`${API_ENDPOINT}/Stars`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}


export async function getStarByName(name) {
    axios.get(`${API_ENDPOINT}/Stars/${name}`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));
}