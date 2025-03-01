import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArtist } from '../../actions/getArtists';

const Artist = () => {
    const { artistId } = useParams();
    const [artist, setArtist] = useState();
    // const [artistData, setArtistData] = useState([]);



    //     useEffect(() => {
    //         setArtist(artistId)
    //         const artistData = getArtist(artistId)
    //         setArtistData(artistData)

    // }, [artistId]);



    return (
        <div>
            
        </div>
    );
}

export default Artist;
