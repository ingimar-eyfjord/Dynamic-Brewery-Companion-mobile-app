import React from "react";
import { Link } from 'react-router-dom'
import Beercomponent from "./beercomponent"
function Wishlist({ beers, openAboutBeer, makeWishList, taps, makeCart, cart }) {

    const whishlistB = localStorage.getItem("wishlist")
    const whishlist = JSON.parse(whishlistB)
    const mapped = beers.map((beer, index) => <Beercomponent cart={cart} makeCart={makeCart} beers={beers} whishlist={whishlist} taps={taps.filter(name => name.beer == beer.name)} makeWishList={makeWishList} openAboutBeer={openAboutBeer} alc={beer.alc} id={beer.name} key={index} category={beer.category} label={beer.label} name={beer.name} popularity={beer.popularity} pouringSpeed={beer.pouringSpeed} />)
    let wishmapped = []
    whishlist.forEach(e => {
        mapped.forEach(et => {
            if (et.props.name == e.name) {
                wishmapped.push(et)
            }
        })
    })
    const ontap = wishmapped.filter(e => e.props.taps.length > 0)
    const notOnTap = wishmapped.filter(e => e.props.taps.length == 0)
    return (
        <div className="background100">
            <h2>My Wishlist</h2>
            <p style={whishlist.length != 0 ? { display: "none" } : { display: "block" }}>Nothing in your wishlist</p>
            <Link style={whishlist.length != 0 ? { display: "none" } : { display: "block" }} to="/index.php"><button className="continueback back">Go back</button></Link>
            <div style={whishlist.length != 0 ? { minHeight: "100vh" } : { height: "fit-content" }} className="cataloguecontainerwish">

                {ontap}

            </div>
            {notOnTap.length == 0 ? "" : <h2 className="NotServingH2">Not serving now</h2>}
            <div className="cataloguecontainerwish">
                {notOnTap}
            </div>
        </div>
    )
}

export default Wishlist
