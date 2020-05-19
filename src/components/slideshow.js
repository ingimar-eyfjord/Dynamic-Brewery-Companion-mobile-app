import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default function Slideshow() {
    return (
        <>
            <p className="popularP">Popular Beers</p>
            <div className="Slideshow">
                <div className="whitefade"></div>
                <SimpleBar>
                    <div className="SlideshowContainer">

                        <div className="SlideshowBeer card">
                            <p>Beer Name</p>
                            <p>125 Left</p>
                        </div>
                        <div className="SlideshowBeer card"></div>
                        <div className="SlideshowBeer card"></div>
                        <div className="SlideshowBeer card"></div>
                        <div className="SlideshowBeer card"></div>
                        <div className="SlideshowBeer card"></div>
                        <div className="SlideshowBeer card"></div>
                    </div>
                </SimpleBar>
            </div>
        </>
    )
}