import React, { useState, useEffect } from "react";
import SvgMinus from './images/minus'
import SvgPlus from './images/plus'
import SvgX from './images/x'
export default function CartItem(props) {
    const [count, setCount] = useState(parseInt(props.howmany))
    function onDelete() {
        props.deleteItem(props.name)
    }

    useEffect(() => {
        props.editNumCart(count, props.name)
    }, [count])

    return (
        <div className="cartItem card">
            <div className="edit card">
                <SvgPlus onClick={() => setCount(prevCount => prevCount + 1)} className="plus" />
                <p key={props.Editid} id={props.Editid}>{count}</p>
                <SvgMinus onClick={() => setCount(prevCount => prevCount - 1)} className="minus" />
            </div>
            <div data-img={props.label} className="imgCartBeer card"></div>
            <p className="beerTitle">{props.name}</p>
            <div className="AlctitleCart">Alc: {props.alc}%</div>
            <p className="priceCart">{props.howmany * 50} DKK</p>
            <SvgX onClick={onDelete} className="deleteItem" />
        </div >
    )
}