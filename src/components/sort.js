import React, { useState } from 'react';

export default function SortModal(props) {
    let StatesyleOpen = "FilterModal card"
    if (props.sortState == "open") {
        StatesyleOpen = "FilterModal DropDownSort card"
    } else {
        StatesyleOpen = "displaynone"
    }
    const selection = ["Alc.vol Ascending", "Alc.vol Descending", "A - Z"];
    const optionsMapp = selection.map((e, index) => <p style={{ textDecoration: "underline" }} key={index} onClick={() => { props.setCatalogueSort(e); props.sortState == "open" ? props.setsortState("closed") : props.setsortState("open") }} >{e}</p>)
    return (
        <div className={StatesyleOpen}>
            {optionsMapp}
        </div>
    )
}