import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
export default function PaymentConfirm(props) {
    const date = new Date()
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    const datePrint = `` + date.getDay() + ` ` + monthName[month] + `, ` + year + ``
    const total = props.cart.length >= 1 ? props.cart.length * 50 : 0;
    const chcekStylestate = {
        display: "none"
    }
    const loaderStylestate = {
        display: "block"
    }
    const [chcekStyle, setStyle] = useState(chcekStylestate)
    const [loaderstyle, setStyleLoad] = useState(loaderStylestate)

    useEffect(() => {
        const timer = setTimeout(() => {
            const chcekStyleset = { display: "block" }
            const loadStyleset = { display: "none" }
            setStyleLoad(loadStyleset)
            setStyle(chcekStyleset)
            props.clearCart();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <div className="paymentconfirm"></div>
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
            <div className="messages">
                {/* <!-- Credit: https://dribbble.com/shots/5092176-Newton-Loader --> */}
                <div style={loaderstyle} className="gooey">
                    <span className="dot"></span>
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="orderConP">
                    <p style={loaderstyle}>Placing your order</p>
                    <p style={chcekStyle}>You order is successful</p>

                </div>

                {/* https://codepen.io/solomonkitumba/pen/rNNYWxE */}
                <div style={chcekStyle} className="success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
            </div>
            <Link to="/index.html" > <button className="continueback orange whitetext">Home</button></Link>
        </>
    )
}