import React from "react";
import SvgHeart from "./images/heart"
import SvgCart from "./images/cart"
import SvgRoundPLus from "./images/roundplus"
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
    let Cartstyle = { display: "block" }
    // if (props.cart.length === 0) {
    //     Cartstyle = {
    //         display: "none"
    //     }
    // }
    function addtocart() {
        const newArr = [...props.beers];
        const whatBeer = newArr.filter(e => e.name === props.name)
        props.makeCart(whatBeer, 1)
    }
    const cart = [...props.cart];
    const cartFilter = cart.filter(e => e[0].name == props.name)
    return (
        <div data-id={props.name} className="CatalogueItemOuterCont">
            <div className="CatItemPhotoCont card">
                <Link to="/aboutBeer">   <div data-id={props.name} onClick={props.openAboutBeer} data-img={props.label} style={IMGstyle} className="CatItemPhoto"></div></Link>

                <div data-id={props.name} onClick={props.makeWishList} data-outofwish={outofwish} className="addToWish">
                    <SvgHeart fill={whishlistSyle} makeWishList={props.makeWishList}></SvgHeart>

                </div>

                {props.taps.length > 0 ? <div data-id={props.name} onClick={props.makeWishList} data-outofwish={outofwish} className="addTocart2">
                    <SvgCart style={{ fill: 'var(--orange)' }} to="/cart">
                    </SvgCart>
                    <div style={Cartstyle} className="cartLength">{cartFilter.length}</div>
                </div> : ""}

                {props.taps.length > 0 ? <SvgRoundPLus className="CatAddToCart" onClick={addtocart}></SvgRoundPLus> : ""}
            </div>
            <div className="catalogueInfo">
                <div data-id={props.name} className="CatItemTitle">{props.name}</div>
                <div data-id={props.name} className="Alctitle">500ml / {props.alc}%.vol</div>
                <div data-id={props.name} className="CatItemPrice">50 DKK</div>
            </div>
        </div>

    )
}