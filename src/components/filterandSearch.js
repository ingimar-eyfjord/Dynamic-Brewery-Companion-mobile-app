import React from 'react';
import SvgSort from './images/sort'
import SvgFilter from './images/filter'

export default function Filterandsearch() {

    return (
        <div className="filterandsearch">
            <div>
                <SvgFilter className="filter"></SvgFilter>
                <p>Filter</p>
            </div>
            <p>All products</p>
            <div>
                <SvgSort className="sort"></SvgSort>
                <p>Sort</p>
            </div>
        </div>
    )
}