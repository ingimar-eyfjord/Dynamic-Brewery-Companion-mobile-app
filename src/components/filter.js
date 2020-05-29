import React, { useState } from 'react';

export default function FilterModal(props) {
    let StatesyleOpen = "FilterModal card"
    if (props.filterState == "open") {
        StatesyleOpen = "FilterModal DropDown card"
    } else {
        StatesyleOpen = "displaynone"
    }
    const selection = ["Now Serving", "Not Serving", "All Products"];
    const options = selection.filter(opt => opt !== props.catalogueState)
    const optionsMapp = options.map((e, index) => <p style={{ textDecoration: "underline" }} key={index} onClick={() => { props.setCatState(e); props.filterState == "open" ? props.setFilterState("closed") : props.setFilterState("open") }} >{e}</p>)
    return (
        <div className={StatesyleOpen}>
            {optionsMapp}
        </div>
    )
}