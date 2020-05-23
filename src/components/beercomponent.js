import React from "react";
import SvgHeart from "./images/heart"
import { Link } from 'react-router-dom'
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
            if (e.name === props.name) {
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
            <Link to="/aboutBeer"> <div data-id={props.name} onClick={props.openAboutBeer} data-img={props.label} style={IMGstyle} className="CatItemPhoto card">
            </div></Link>
            <div className="catalogueInfo">
                <div data-id={props.name} className="CatItemTitle">{props.name}</div>
                <div data-id={props.name} className="Alctitle">500ml / {props.alc}%.vol</div>
                <div data-id={props.name} className="CatItemPrice">50 DKK</div>
                {props.taps.length > 0 ? <p className="NowServing">Now serving</p> : <p className="NotServing">Not serving</p>}
            </div>
        </div>

    )
}