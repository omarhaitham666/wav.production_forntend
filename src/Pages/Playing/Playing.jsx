import { useState } from "react";
import PlayingHero from "../../Components/PlayingHero";
import Sidebar from "../../Components/sidebar";
import PlayingList from "./playingList/playingList";
import { Helmet } from "react-helmet-async";



const Playing = () => {
    const [filters, setFilters] = useState({ browseFilter: "", genresFilter: "" });



    return (
        <>
                    <Helmet>
                        <title>Playing | Could.wav</title>
                    </Helmet>
            <PlayingHero />
            <div className="py-12">
                <div className="container mx-auto">
                    <div className='flex flex-col lg:flex-row gap-4'>
                        <Sidebar filters={filters} setFilters={setFilters}/>
                        <PlayingList filters={filters} />
                    </div>
                </div>
            </div >
        </>
    );
}

export default Playing;
