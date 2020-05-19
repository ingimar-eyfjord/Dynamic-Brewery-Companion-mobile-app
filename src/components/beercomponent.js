import React from "react";
import SvgHeart from "./images/heart"
export default function Beercomponent(props) {

    const IMGstyle = {
        display: "block",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    }
    let outofwish = "no"
    let whishlistSyle = "none"
    if (props.whishlist[0]) {
        props.whishlist.forEach(e => {
            if (e.name == props.name) {
                whishlistSyle = "rgb(236, 167, 2)"
                outofwish = "yes"
            }
        })
    }
    return (

        <div data-id={props.name} className="CatalogueItemOuterCont">
            <div data-id={props.name} onClick={props.makeWishList} data-outofwish={outofwish} className="addToWish">
                <SvgHeart fill={whishlistSyle} makeWishList={props.makeWishList}></SvgHeart>
            </div>
            <div data-id={props.name} onClick={props.openAboutBeer} data-img={props.label} style={IMGstyle} className="CatItemPhoto card">
            </div>
            <div data-id={props.name} className="CatItemTitle">{props.name}</div>
            <div data-id={props.name} className="Alctitle">Alc: {props.alc}%</div>
            <div data-id={props.name} className="CatItemPrice">50DKK</div>
        </div>

    )
}