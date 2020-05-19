import React, { useState, useEffect, useRef } from "react";
import SvgCart from "./images/cart"
export default function CartPage() {
    return (
        <div className="cartpage">
            <SvgCart className="cartPageLogo" />
            <p className="CartName">My cart</p>
            <div className="cartBackground card">
            </div>
            <div className="cartItem">
                <div data-img="elhefe.png" className="imgCartBeer card"></div>
                <p className="beerTitle">Hoppily Ever After x 5</p>
                <p className="priceCart">50DKK</p>
                <div className="edit">
                    <p className="minus">-</p>
                    <p className="plus">+</p>
                </div>
                <div className="deleteItem">X</div>
            </div>
            <div className="total">
                <p>Total</p>
                <p className="totalPrice">$30.60DKK</p>
            </div>
        </div>
    )

}