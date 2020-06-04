import React from 'react';
import Logo from "./images/logo.svg"
import SVGBell from "./images/bell"
export default function Nav() {
    return (
        <nav>
            <div className="logoContainer">
                <img className="logoOrange" src={Logo} alt="Logo" />
            </div>
            <h1 className="nameofStore">Foobar Store</h1>

            <SVGBell className="bellIcon cursor" style={{ fill: "var(--orange)" }}></SVGBell>
        </nav>
    )
}