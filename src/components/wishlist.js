import React from "react";
import { Link } from 'react-router-dom'
import Beercomponent from "./beercomponent"
function Wishlist({ beers, openAboutBeer, makeWishList, whishlist, taps }) {


    const mapped = beers.map((beer, index) => <Beercomponent whishlist={whishlist} taps={taps.filter(name => name.beer == beer.name)} makeWishList={makeWishList} openAboutBeer={openAboutBeer} alc={beer.alc} id={beer.name} key={index} category={beer.category} label={beer.label} name={beer.name} popularity={beer.popularity} pouringSpeed={beer.pouringSpeed} />)
    let wishmapped = []
    whishlist.forEach(e => {
        mapped.forEach(et => {
            if (et.props.name == e.name) {
                wishmapped.push(et)
            }
        })
    })
    return (
        <div className="background100">
            <h2>My Wishlist</h2>
            <p style={whishlist.length != 0 ? { display: "none" } : { display: "block" }}>Nothing in your wishlist</p>
            <Link style={whishlist.length != 0 ? { display: "none" } : { display: "block" }} to="/home"><button className="continueback back">Go back</button></Link>
            <div style={whishlist.length != 0 ? { minHeight: "100vh" } : { height: "fit-content" }} className="cataloguecontainerwish">
                {wishmapped}
            </div>
        </div>
    )
}

export default Wishlist
