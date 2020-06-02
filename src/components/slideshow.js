import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export default function Slideshow({ beers, openAboutBeer, taps }) {
    const [popular, setpopular] = useState([])
    const [display, setstate] = useState([])

    function Counter() {
        useInterval(() => {
            fetch("https://foobarorders-577e.restdb.io/rest/popular", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "x-apikey": "5ecd2b70ae488b280ef33345",
                    "cache-control": "no-cache"
                }
            }).then(res => res.json().then(data => setpopular(data)))

            let arr = []
            popular.forEach(e => {
                beers.forEach(et => {
                    if (e.name === et.name) {
                        arr.push(e)
                    }
                })
            })
            setstate(arr)
        }, 5000);
    }

    function useInterval(callback, delay) {
        const savedCallback = useRef();
        // Remember the latest function.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay != null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    Counter()

    console.log(taps)
    let array = []
    taps.forEach(e => {
        display.forEach(et => {
            console.log(e)
            if (e.beer === et.name) {
                array.push(e)
            }
        })
    })

    const map = display.map((e, index) => <Link to="/aboutBeer" key={index} data-id={e.name} onClick={openAboutBeer}> <div className="onclickDiv" className="SlideshowBeer card" data-id={e.name} data-img={`` + e.name.toLowerCase().replace(/ /g, "") + `.png`} key={index}><p>{e.name}</p><p>{Math.floor(array[index].level / 50)}  Left on keg</p></div></Link>)

    if (map == 0) {

        return (
            <>
                <p className="popularP">Popular Beers</p>
                <div className="Slideshow">
                    <div className="slideloader">
                        <div className="gooey">
                            <span className="dot"></span>
                            <div className="dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    } else {
        return (
            <>
                <p className="popularP">Popular Beers</p>
                <div className="Slideshow">
                    <div className="whitefade"></div>
                    <SimpleBar>
                        <div className="SlideshowContainer">
                            {map}
                        </div>
                    </SimpleBar>
                </div>
            </>
        )
    }
}