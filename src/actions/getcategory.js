import axios from "axios";
import { API_ENDPOINT } from "../App";


export async function getCategory() {

    axios.get(`${API_ENDPOINT}/category`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}