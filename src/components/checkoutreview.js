import React, { useState } from "react";
import CartItem from "./cartitem"
import { Link, Redirect } from 'react-router-dom'
export default function CheckoutRewview(props) {
    const date = new Date()
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    const datePrint = `` + day + ` ` + monthName[month] + `, ` + year + ``


    let grouped = [];
    props.cart.forEach(function (a) {

        if (!this[a[0].name]) {
            this[a[0].name] = {
                name: a[0].name,
                alc: a[0].alc,
                label: a[0].label,
                howmany: "0",
            };
            grouped.push(this[a[0].name]);
        }
        this[a[0].name].howmany = (+this[a[0].name].howmany + +1).toString();

    }, Object.create(null));

    const mapped = grouped.map((cart, index) => <CartItem deleteItem={props.deleteItem} editNumCart={props.editNumCart} key={index} alc={cart.alc} name={cart.name} label={cart.label} howmany={cart.howmany} />)
    const total = props.cart.length >= 1 ? props.cart.length * 50 : 0;

    const ConfirmedOrNotState = false;
    const [confirmed, setConfirmation] = useState(ConfirmedOrNotState)
    function confirmorder(e) {
        e.preventDefault()
        setConfirmation(true)
    }

    if (confirmed === true) {
        return (
            <Redirect to="/PaymentConfirm"></Redirect>
        )
    } else {
        return (
            <>
                <div className="checkoutCont">
                    <h2 className="checkTitle">Check out</h2>
                    <div className="cartLine"></div>
                    <div className="billInfo">
                        <p className="col1 justleft">Date</p>
                        <p className="date col2 justright">{datePrint}</p>
                        <p className="col1 justleft">Total Bill:</p>
                        <p className=" col2 justright">{total} DKK</p>
                    </div>
                </div>
                <h3>Please Review your order</h3>
                <div className="contactTitle">
                    <div className="blackCirlce">1</div>
                    <p>Contact Info</p>
                </div>

                <div className="contactInput">
                    <div>
                        <label htmlFor="Firstname">First Name</label>
                        <p id="Firstname" className="Firstname">{props.paymentForm.Firstname}</p>
                    </div>
                    <div>
                        <label htmlFor="Lastname">Last Name</label>
                        <p id="Lastname" className="Firstname">{props.paymentForm.Lastname}</p>
                    </div>
                    <div>
                        <label htmlFor="Phone">Phone</label>
                        <p id="Phone" className="Firstname">{props.paymentForm.Phone}</p>
                    </div>
                    <div>
                        <label htmlFor="Email">Email</label>
                        <p id="Email" className="Firstname">{props.paymentForm.Email}</p>
                    </div>
                </div>

                <div className="contactTitle">
                    <div className="blackCirlce">2</div>
                    <p>Payment Info</p>
                </div>

                <div className="cardsSelect">
                    <div data-cardtype={props.paymentForm.CardType} className="cardImage visa card"></div>
                </div>

                <div className="contactInput">
                    <div>
                        <label htmlFor="cardholder">Cardholder Name</label>
                        <p id="cardholder" className="Firstname">{props.paymentForm.cardholder}</p>
                    </div>
                    <div>
                        <label htmlFor="cardnum">Card Number</label>
                        <p id="cardnum" className="Firstname">{props.paymentForm.cardnum}</p>
                    </div>
                    <div>
                        <label htmlFor="CVV">CVC</label>
                        <p id="CVV" className="Firstname">{props.paymentForm.CVC}</p>
                    </div>
                    <div>
                        <label htmlFor="ExpirationDate">Expiration Date</label>
                        <p id="ExpirationDate" className="Firstname">{props.paymentForm.ExpirationDate}</p>
                    </div>
                </div>

                <div className="contactTitle">
                    <div className="blackCirlce">3</div>
                    <p>Your Order</p>
                </div>

                <div className="cartpage checkoutreviewcont">
                    <div className="cartBackground">

                        {mapped.length === 0 ? <p style={{ color: "white" }}>Nothing in the cart</p> : mapped}
                    </div>

                    <div className="cartLine"></div>
                    <div className="total">
                        <p>Total</p>
                        <p className="totalPrice">{total} DKK</p>
                    </div>
                </div>

                <button disabled={props.cart.length === 0} onClick={confirmorder} className="continueback orange whitetext">Confirm</button>
                <Link to="/checkout" > <button className="continueback back">Back</button></Link>
            </>
        )
    }
}