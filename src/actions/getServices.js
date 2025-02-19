import axios from "axios";
import { API_ENDPOINT } from "../App";


export async function getServices() {

    axios.get(`${API_ENDPOINT}/services`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}
