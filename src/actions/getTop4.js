import axios from "axios";
import { API_ENDPOINT } from "../App";


export async function getTop4() {

    axios.get(`${API_ENDPOINT}/Top4`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}
