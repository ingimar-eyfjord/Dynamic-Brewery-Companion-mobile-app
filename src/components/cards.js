import React, { useState } from "react";

function Cards({ formData, setFormData }) {

    const Card = ({ card, active, onClick }) => {
        return (
            <div onClick={onClick} className={active ? "active cardImage card" : "cardImage card"} data-cardtype={card}></div >
        );
    };

    const cards = ["visa", "mastercard", "mobilepay"]
    const [chosen, setChosen] = useState();

    return (
        <>
            {cards.map((card, index) => (
                <Card key={index} card={card} active={localStorage.getItem("CardType") == card ? true : card === chosen} onClick={() => { setChosen(card); setFormData({ ...formData, CardType: card }); localStorage.setItem("CardType", card) }} />
            ))}
        </>
    )
}

export default Cards

