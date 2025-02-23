import React from 'react';
import PlayingHero from '../../Components/PlayingHero';
import Sidebar from '../../Components/sidebar';


const Playing = () => {
    return (
        <>
            <PlayingHero />
            <div className="py-8">
                <div className="container mx-auto">
                    <div className=''>
                        <Sidebar />
                    </div>
                </div>
            </div >
        </>
    );
}

export default Playing;
