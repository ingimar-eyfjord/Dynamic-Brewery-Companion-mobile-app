import React from 'react';
import SvgSort from './images/sort'
import SvgFilter from './images/filter'

export default function Filterandsearch(props) {

    return (
        <div className="filterandsearch ">
            <div className="cursor" onClick={() => { props.sortState == "open" ? props.setsortState("closed") : props.setFilterState("open"); props.filterState == "open" ? props.setFilterState("closed") : props.setFilterState("open") }}>
                <SvgFilter className="filter"></SvgFilter>
                <p>Filter</p>
            </div>
            <p>{props.catalogueState}</p>
            <div className="cursor" onClick={() => { props.filterState == "open" ? props.setFilterState("closed") : props.setsortState("open"); props.sortState == "open" ? props.setsortState("closed") : props.setsortState("open") }}>
                <SvgSort className="sort"></SvgSort>
                <p>Sort</p>
            </div>
        </div >
    )
}