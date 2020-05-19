import React from 'react';
import Logo from "./images/logo.svg"

export default function Nav() {
    return (
        <nav>
            <div className="logoContainer">
                <img className="logoOrange" src={Logo} alt="Logo" />
                <p className="nameofStore">Foobar Store</p>
            </div>

            <p className="Bell">Bell</p>
        </nav>
    )
}