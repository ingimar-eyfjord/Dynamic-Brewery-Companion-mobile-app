import React, { useState, useEffect } from "react";
export default function CartItemConfirmed(props) {
    return (
        <div className="cartItem card">
            <div className="edit card">
                <p>{parseInt(props.howmany)}</p>
            </div>
            <div data-img={props.label} className="imgCartBeer card"></div>
            <p className="beerTitle">{props.name}</p>
            <div className="AlctitleCart">Alc: {props.alc}%</div>
            <p className="priceCart">{props.howmany * 50} DKK</p>
        </div >
    )
}