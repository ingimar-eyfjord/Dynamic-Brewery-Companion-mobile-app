import React, { useState } from "react";
import { Link } from 'react-router-dom'
export default function PaymentConfirm(props) {
    const date = new Date()
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    const datePrint = `` + day + ` ` + monthName[month] + `, ` + year + ``
    const total = props.cart.length >= 1 ? props.cart.length * 50 : 0;
    const chcekStylestate = {
        display: "none"
    }
    const loaderStylestate = {
        display: "blocl"
    }
    const [chcekStyle, setStyle] = useState(chcekStylestate)
    const [loaderstyle, setStyleLoad] = useState(loaderStylestate)
    setTimeout(() => {
        const chcekStyleset = { display: "block" }
        const loadStyleset = { display: "none" }
        setStyleLoad(loadStyleset)
        setStyle(chcekStyleset)
    }, 5000);

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
            <div className="messages">
                {/* <!-- Credit: https://dribbble.com/shots/5092176-Newton-Loader --> */}
                <div style={loaderstyle} class="gooey">
                    <span class="dot"></span>
                    <div class="dots">
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
                <div style={chcekStyle} class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                    </div>
                </div>
            </div>
            <Link to="/home" > <button className="continueback orange whitetext">Home</button></Link>
        </>
    )
}