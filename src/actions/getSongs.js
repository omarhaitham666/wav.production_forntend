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

// get Recently add songs by artisit

export async function getRecentlyAddedByArtist(artistId) {

    axios.get(`${API_ENDPOINT}/songs?artistId=${artistId}`)
    
        .then(res => { return res.json() })
        .catch(err => console.error(err));
}


// get Trending songs

export async function getTrendingSongs() {

    axios.get(`${API_ENDPOINT}/songs`)

        .then(res => { return res.json() })
        .catch(err => console.error(err));

}

// get Trending songs by artisit

export async function getTrendingByArtist(artistId) {

    axios.get(`${API_ENDPOINT}/songs?artistId=${artistId}`)

        .then(res => { return res.json() })
        .catch(err => console.error(err));

}


// get Trending Albums

export async function getTrendingAlbums() {

    axios.get(`${API_ENDPOINT}/albums`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));
}

// get Trending Albums by artisit

export async function getTrendingByAlbumArtist(artistId) {

    axios.get(`${API_ENDPOINT}/albums?artistId=${artistId}`)

        .then(res => { return res.json() })
        .catch(err => console.error(err));

}


// get songs from album

export async function getSongsFromAlbum(albumId) {

    axios.get(`${API_ENDPOINT}/songs?albumId=${albumId}`)
        .then(res => { return res.json() })
        .catch(err => console.error(err));

}






