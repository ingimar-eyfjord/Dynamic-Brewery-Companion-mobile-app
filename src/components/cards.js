import React, { useState } from "react";

function Cards({ formData, setFormData }) {

    const Card = ({ card, active, onClick }) => {
        return (
            <div onClick={selectCartType} onClick={onClick} className={active ? "active cardImage card" : "cardImage card"} data-cardtype={card}></div >
        );
    };

    const cards = ["visa", "mastercard", "mobilepay"]
    const [chosen, setChosen] = useState();

    function selectCartType(e) {
    }
    return (
        <>
            {cards.map((card, index) => (
                <Card key={index} card={card} active={index === chosen} onClick={() => { setChosen(index); setFormData({ ...formData, CardType: card }) }} />
            ))}
        </>
    )
}

export default Cards

