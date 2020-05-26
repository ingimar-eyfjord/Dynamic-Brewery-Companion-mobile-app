import React, { useState } from "react";
import { Link } from 'react-router-dom'
export default function BottomNav(props) {


    const [transfrom, Settransform] = useState(100)
    let lastScrollTop = 0;

    // check if scrolling down or up by comparing last scrollTop, if page ofset is more it's going down, if it's less it's going up.
    window.addEventListener("scroll", function () {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            Settransform(0)
        } else {
            Settransform(100)
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
    let Paralexstyle = {
        transform: `translateY(${transfrom}%)`
    }


    let style = { display: "block" }
    if (props.whishlist.length === 0) {
        style = {
            display: "none"
        }
    }
    let Cartstyle = { display: "block" }
    if (props.cart.length === 0) {
        Cartstyle = {
            display: "none"
        }
    }


    return (

        <div style={Paralexstyle} className="BottomNav cardNoRadiusBottom">
            <Link style={{ textDecoration: 'none' }} className="ContainerSVG" to="/home">
                <div className="home menuIcon"></div>
                <p>Home</p>
            </Link>
            <Link style={{ textDecoration: 'none' }} className="ContainerSVG" to="/cart">
                <div className="shopping menuIcon"></div>
                <p>My Cart</p>
                <div style={Cartstyle} className="wishLength">{props.cart.length}</div>
            </Link>
            <Link style={{ textDecoration: 'none' }} className="ContainerSVG" to="/Wishlist">
                <div className="heart menuIcon"></div>
                <p>Wishlist</p>
                <div style={style} className="wishLength">{props.whishlist.length}</div>
            </Link>
        </div>
    )
}