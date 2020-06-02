import React, { useState } from "react";
import CartItemConfirmed from "./cartitemsConfirmed"
import { Link, Redirect } from 'react-router-dom'
export default function CheckoutRewview(props) {
    const date = new Date()
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    const datePrint = `` + day + ` ` + monthName[month] + `, ` + year + ``

    const ConfirmedOrNotState = false;
    const [confirmed, setConfirmation] = useState(ConfirmedOrNotState)
    function confirmorder(e) {
        e.preventDefault()
        setConfirmation(true)
    }
    if (props.cart.length == 0) {
        return (
            <Redirect to="/home"></Redirect>
        )
    } else {

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

        const mapped = grouped.map((cart, index) => <CartItemConfirmed deleteItem={props.deleteItem} editNumCart={props.editNumCart} key={index} alc={cart.alc} name={cart.name} label={cart.label} howmany={cart.howmany} />)
        const total = props.cart.length >= 1 ? props.cart.length * 50 : 0;


        if (confirmed === true) {


            const URL = "https://foobar-app-3.herokuapp.com/order"
            let grouped = [];
            props.cart.forEach(function (a) {
                if (!this[a[0].name]) {
                    this[a[0].name] = {
                        name: a[0].name,
                        amount: 0
                    };
                    grouped.push(this[a[0].name]);
                }
                this[a[0].name].amount = (+this[a[0].name].amount + +1);

            }, Object.create(null));

            const postData = JSON.stringify(grouped)
            console.log(postData)
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: postData
            }).then(res => res.json().then(data => {
                const bodyis = {
                    orderID: data.id,
                    GuestName: props.paymentForm.Firstname
                }
                const postData2 = JSON.stringify(bodyis)
                fetch("https://foobarorders-577e.restdb.io/rest/orders", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "x-apikey": "5ecd2b70ae488b280ef33345",
                        "cache-control": "no-cache"
                    },
                    body: postData2
                }).then(res => res.json())
            }));

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
                    <h3 className="reviewOrderh3">Please Review your order</h3>
                    <div className="contactTitle">
                        <div className="blackCirlce">1</div>
                        <p>Contact Info</p>
                    </div>

                    <div style={{ marginBottom: "1rem" }} className="cardInput justify-left">
                        <div>
                            <label htmlFor="Firstname">First Name</label>
                            <p id="Firstname" className="Firstname">{props.paymentForm.Firstname}</p>
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

                    <div className="cardsSelect justify-left">
                        <div data-cardtype={props.paymentForm.CardType} className="cardImage visa card"></div>
                    </div>

                    <div style={{ marginBottom: "1rem" }} className="cardInput justify-left">
                        <div>
                            <label htmlFor="cardholder">Cardholder Name</label>
                            <p id="cardholder" className="Firstname">{props.paymentForm.cardholder}</p>
                        </div>
                        <div>
                            <label htmlFor="cardnum">Card Number</label>
                            <p id="cardnum" className="Firstname">{props.paymentForm.cardnum.substr(0, 4)} {props.paymentForm.cardnum.substr(4, 4)} {props.paymentForm.cardnum.substr(8, 4)} {props.paymentForm.cardnum.substr(12, 4)}</p>
                        </div>
                        <div>
                            <label htmlFor="CVV">CVC</label>
                            <p id="CVV" className="Firstname">{props.paymentForm.CVC}</p>
                        </div>
                        <div>
                            <label htmlFor="ExpirationDate">Expiration Date</label>
                            <p id="ExpirationDate" className="Firstname">{props.paymentForm.ExpirationDate.substr(0, 2)}/{props.paymentForm.ExpirationDate.substr(2, 4)}</p>
                        </div>
                    </div>

                    <div className="contactTitle">
                        <div className="blackCirlce">3</div>
                        <p>Your Order</p>
                    </div>

                    <div className="cartpage checkoutreviewcont">
                        <div className="cartBackground">

                            {mapped.length === 0 ? <p style={{ color: "black" }}>Nothing in the cart</p> : mapped}
                        </div>

                        <div className="cartLine"></div>
                        <div className="total">
                            <p>Total</p>
                            <p className="totalPrice">{total} DKK</p>
                        </div>
                    </div>
                    <div className="Checkoutbuttons">
                        <button disabled={props.cart.length === 0} onClick={confirmorder} className="continueback orange whitetext">Confirm</button>
                        <Link to="/checkout" > <button className="continueback back">Back</button></Link>
                    </div>
                </>
            )
        }
    }
}