import React, { useState } from "react";
import SvgCart from "./images/cart"
import SvgArrow from "./images/arrow"
import SvgHeart from "./images/heart"
import { Link } from 'react-router-dom'
import SvgMinus from './images/minus'
import SvgPlus from './images/plus'
import { Redirect } from 'react-router-dom';
export default function AboutBeer(props) {
    const [count2, setCount2] = useState(0)
    const [seemore, setSee] = useState("none")
    const [seemoreP, setSeep] = useState("See more...")

    // If about.length (which is the beer I want to display on this page) is 0 (empty)
    // Then I redirect the user back to the home page
    if (props.about.length == 0) {
        return (
            <Redirect to="/index.html"></Redirect>
        )
    } else {

        function changeNumOfBeer(e) {
            setCount2(e.target.value)
        }
        let outofwish = "no"
        let whishlistSyle = "none"
        if (props.about[0]) {
            if (props.whishlist[0]) {
                props.whishlist.forEach(e => {
                    if (e.name === props.about[0].name) {
                        whishlistSyle = "rgb(236, 167, 2)"
                        outofwish = "yes"
                    }
                })
            }
        }
        function addtocart(event) {
            if (count2 !== 0) {
                const name = event.target.dataset.id
                const newArr = [...props.beers];
                const whatBeer = newArr.filter(e => e.name === name)
                props.makeCart(whatBeer, count2)
            }
        }
        let Cartstyle = { display: "block" }
        if (props.cart.length === 0) {
            Cartstyle = {
                display: "none"
            }
        }

        const seeeMoreSyle = {
            display: seemore
        }
        function seemorefunc() {
            if (seemore === "none") {
                setSee("block")
                setSeep("See Less...")
            } else {
                setSee("none")
                setSeep("See more...")
            }
        }
        const label2Sp = props.about[0].label.split(".");
        const label2 = `` + label2Sp[0] + `2.` + label2Sp[1];
        let displayNotServingM = {}
        if (props.taps.length < 1) {
            displayNotServingM = {
                display: "none"
            }
        } else {
            displayNotServingM = {
                display: "flex"
            }
        }

        function handleClick(e) {
            if (e.target.dataset.click === "plus") {
                setCount2(prevCount => prevCount + 1)
            } else if (e.target.dataset.click === "minus" && count2 !== 0) {
                setCount2(prevCount => prevCount - 1)
            }
        }
        return (
            <div className="aboutBeer" >
                <div className="Slideshow">

                    <div className="SlideshowContainer">
                        <div data-img={props.about[0].label} className="SlideshowBeer"></div>
                        <div data-img={label2} className="SlideshowBeer"></div>

                    </div>
                </div>
                <div className="Beerinfo">
                    <div>
                        <div className="titleAbout">{props.about[0].name}</div>
                        <p className="ml">500ml</p>
                        <div data-id={props.about[0].name} onClick={props.makeWishList} data-outofwish={outofwish} className="addToWishAbout">
                            <SvgHeart fill={whishlistSyle} makeWishList={props.makeWishList}></SvgHeart>
                        </div>
                        <div className="priceAbout">50 DKK</div>
                    </div>
                    <div></div>
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
                    <div style={displayNotServingM} className="quantityCont">
                        <p>Quantity</p>
                        <div className="counter">

                            <SvgMinus onClick={handleClick} data-click="minus" className="minus" />
                            <input type="number" onChange={changeNumOfBeer} className="nopointer" value={count2}></input>
                            <SvgPlus onClick={handleClick} data-click="plus" className="plus" />
                        </div>
                    </div>
                    <div className="buttons">
                        <Link to="/index.html">
                            <div className="absvgcont">
                                <SvgArrow className="SVGAbout" />
                            </div>
                        </Link>
                        <div className="absvgcont">
                            <Link to="/cart">
                                <SvgCart className="SVGAbout" />
                                <div style={Cartstyle} className="wishLength2">{props.cart.length}</div>
                            </Link>
                        </div>

                        <button disabled={props.taps.length < 1 && count2 <= 0} data-id={props.about[0].name} onClick={addtocart} className="addtoCart">Add to cart</button>
                    </div>
                </div>
            </div >
        )


    }
}