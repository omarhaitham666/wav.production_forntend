import axios from "axios";
import { API_ENDPOINT } from "../App";


// get all songs
export async function getSongs() {

    axios.get(`${API_ENDPOINT}/songs`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}

// get Recently add songs

export async function getRecentlySongs() {

    axios.get(`${API_ENDPOINT}/songs`)
    
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}

// get Trending songs

export async function getTrendingSongs() {

    axios.get(`${API_ENDPOINT}/songs`)

        .then(res => { return res.json() })
        .catch(err => console.error(err));

}

// get Trending Albums

export async function getTrendingAlbums() {

    axios.get(`${API_ENDPOINT}/albums`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));
}




