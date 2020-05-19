import React from 'react';
import Beercomponent from "./beercomponent"
export default function Catalogue({ beers, openAboutBeer, makeWishList, whishlist }) {

    const mapped = beers.map((beer, index) => <Beercomponent whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} alc={beer.alc} id={beer.name} key={index} category={beer.category} label={beer.label} name={beer.name} popularity={beer.popularity} pouringSpeed={beer.pouringSpeed} />)

    return (
        <div className="cataloguecontainer">
            {mapped}
        </div>
    )
}