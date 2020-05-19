import React, { useState, useEffect, useRef } from "react";
import SvgCart from "./images/cart"
import SvgArrow from "./images/arrow"
import SvgHeart from "./images/heart"


export default function AboutBeer(props) {
    let outofwish = "no"
    let whishlistSyle = "none"
    if (props.about[0]) {
        if (props.whishlist[0]) {
            props.whishlist.forEach(e => {
                if (e.name == props.about[0].name) {
                    whishlistSyle = "rgb(236, 167, 2)"
                    outofwish = "yes"
                }
            })
        }
    }

    function addtocart(event) {
        const number = document.querySelector(".number").value
        if (number != 0) {
            const name = event.target.dataset.id
            const newArr = [...props.beers];
            const whatBeer = newArr.filter(e => e.name == name)
            props.makeCart(whatBeer, number)
        }
    }
    let Cartstyle = { display: "block" }
    if (props.cart.length == 0) {
        Cartstyle = {
            display: "none"
        }
    }

    const [seemore, setSee] = useState("none")
    const [seemoreP, setSeep] = useState("See more...")
    const seeeMoreSyle = {
        display: seemore
    }
    function seemorefunc() {
        if (seemore == "none") {
            setSee("block")
            setSeep("See Less...")
        } else {
            setSee("none")
            setSeep("See more...")
        }
    }
    const style = {
        display: props.display
    }
    if (props.display == "block") {
        return (
            <div className="aboutBeer" style={style}>
                <div className="Slideshow">

                    <div className="SlideshowContainer">
                        <div data-img="elhefe.png" className="SlideshowBeer"></div>
                        <div data-img="elhefe.png" className="SlideshowBeer"></div>
                        <div data-img="elhefe.png" className="SlideshowBeer"></div>
                        <div data-img="elhefe.png" className="SlideshowBeer"></div>
                        <div data-img="elhefe.png" className="SlideshowBeer"></div>
                        <div data-img="elhefe.png" className="SlideshowBeer"></div>
                    </div>
                </div>
                <div className="Beerinfo">
                    <div>
                        <div data-id={props.about[0].name} onClick={props.makeWishList} data-outofwish={outofwish} className="addToWishAbout">
                            <SvgHeart fill={whishlistSyle} makeWishList={props.makeWishList}></SvgHeart>
                        </div>
                        <div className="titleAbout">{props.about[0].name}</div>
                    </div>
                    <div>
                        <div className="priceAbout">50 DKK</div>
                    </div>
                    <div className="descriptioincont">
                        <p className="strong">Product description</p>
                        <p className="strong">Appearance:</p>
                        <p className="productDesr">{props.about[0].description.appearance}</p>
                        <div style={seeeMoreSyle} className="seemore">
                            <p className="strong">Aroma:</p>
                            <p className="productDesr">{props.about[0].description.aroma}</p>
                            <p className="strong">Flavor:</p>
                            <p className="productDesr">{props.about[0].description.flavor}</p>
                            <p className="strong">Mouthfeal:</p>
                            <p className="productDesr">{props.about[0].description.mouthfeal}</p>
                            <p className="strong">Overall Impression:</p>
                            <p className="productDesr">{props.about[0].description.overallImpression}</p>
                        </div>
                        <p className="strong" className="cursor" onClick={seemorefunc}>{seemoreP}</p>
                    </div>
                    <div className="quantityCont">
                        <p>Quantity</p>
                        <div className="counter">
                            <button className="down" type="button">-</button>
                            <input className="number" defaultValue="0" type="number" min="0" step="1"></input>
                            <button className="up" type="button">+</button>
                        </div>
                    </div>
                    <div className="buttons">
                        <div onClick={props.CloseAboutBeer} className="absvgcont">
                            <SvgArrow className="SVGAbout" />

                        </div>
                        <div className="absvgcont">
                            <SvgCart className="SVGAbout" />
                            <div style={Cartstyle} className="wishLength2">{props.cart.length}</div>
                        </div>
                        <button data-id={props.about[0].name} onClick={addtocart} className="addtoCart">Add to cart</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="aboutBeer card" style={style}>

            </div>
        )
    }

}