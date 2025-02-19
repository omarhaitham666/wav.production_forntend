import axios from "axios";
import { API_ENDPOINT } from "../App";


export async function getPlans() {

    axios.get(`${API_ENDPOINT}/plans`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}