import React from "react";
import SvgMinus from './images/minus'
import SvgPlus from './images/plus'
import SvgX from './images/x'
export default function CartItem(props) {
    function onDelete() {
        props.deleteItem(props.name)
    }
    return (
        <div className="cartItem card">
            <div className="edit card">
                <SvgPlus onClick={() => props.editNumCart(props.howmany + 1, props.name)} className="plus" />
                <p key={props.Editid} id={props.Editid}>{props.howmany}</p>
                <SvgMinus onClick={() => props.editNumCart(props.howmany - 1, props.name)} className="minus" />
            </div>
            <div data-img={props.label} className="imgCartBeer card"></div>
            <p className="beerTitle">{props.name}</p>
            <div className="AlctitleCart">Alc: {props.alc}%</div>
            <p className="priceCart">{props.howmany * 50} DKK</p>
            <SvgX onClick={onDelete} className="deleteItem" />
        </div >
    )
}