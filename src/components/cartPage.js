import React from "react";
import SvgCart from "./images/cart"
import CartItem from "./cartitem"
import { Link } from 'react-router-dom'
export default function CartPage(props) {

    let grouped = [];
    props.cart.forEach(function (a) {

        if (!this[a[0].name]) {
            this[a[0].name] = {
                name: a[0].name,
                alc: a[0].alc,
                label: a[0].label,
                howmany: 0,
            };
            grouped.push(this[a[0].name]);
        }
        this[a[0].name].howmany = (+this[a[0].name].howmany + +1);

    }, Object.create(null));

    const mapped = grouped.map((cart, index) => <CartItem deleteItem={props.deleteItem} editNumCart={props.editNumCart} key={index} Editid={index} alc={cart.alc} name={cart.name} label={cart.label} howmany={cart.howmany} />)
    const mappedPrice = grouped.map((price) => parseInt(price.howmany))
    const total = mappedPrice.reduce((a, b) => a + b, 0) * 50
    mapped.sort(function (a, b) {
        const textA = a.props.name.toUpperCase();
        const textB = b.props.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return (
        <div className="cartpage">
            <div className="cartup">
                <SvgCart style={{ fill: "white" }} className="cartPageLogo" />
                <p className="CartName">Your cart</p>
            </div>
            <div className="cartBackground">
                <p style={props.cart.length != 0 ? { display: "none" } : { display: "block" }}>Nothing in your cart</p>
                {mapped.length === 0 ? <p style={{ color: "white" }}>Nothing in the cart</p> : mapped}
            </div>

            <div className="cartLine"></div>
            <div className="total">
                <p>Total</p>
                <p className="totalPrice">{total} DKK</p>
            </div>
            <div className="cartBtns">
                <Link to="/checkout"><button className="continueback" disabled={mapped.length === 0}>Checkout</button></Link>
                <Link to="/index.html"><button className="continueback" style={mapped.length === 0 ? { backgroundColor: "var(--orange)" } : { backgroundColor: "transparent", border: "solid", borderColor: "black", borderWidth: "1px", color: "black" }}>Continue Shopping</button></Link>
            </div>
        </div>
    )

}