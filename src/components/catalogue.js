import React from 'react';
import Beercomponent from "./beercomponent"
export default function Catalogue({ beers, openAboutBeer, makeWishList, whishlist, taps, catalogueState, searching, CatalogueSort, makeCart, cart }) {

    const mapped = beers.map((beer, index) => <Beercomponent cart={cart} makeCart={makeCart} beers={beers} whishlist={whishlist} taps={taps.filter(name => name.beer === beer.name)} makeWishList={makeWishList} openAboutBeer={openAboutBeer} alc={beer.alc} id={beer.name} key={index} category={beer.category} label={beer.label} name={beer.name} popularity={beer.popularity} pouringSpeed={beer.pouringSpeed} />)
    let ontap = []
    let notOnTap = []
    const notifontap = mapped.filter(e => e.props.taps.length > 0)
    const notifnotOnTap = mapped.filter(e => e.props.taps.length == 0)
    if (notifontap.length > 0) {
        const notarr = []
        notifnotOnTap.forEach(e => {
            notarr.push(e.props.name)
        })
        const arr = []
        notifontap.forEach(e => {
            arr.push(e.props.name)
        })
        const a = JSON.stringify(arr)
        const b = JSON.stringify(notarr)
        localStorage.setItem("ontap", a)
        localStorage.setItem("notontap", b)
    }



    if (taps.length == 0) {

        return (
            <div className="tapsLoader">
                <div className="gooey">
                    <span className="dot"></span>
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        )
    } else {

        if (CatalogueSort == "") {
            ontap = mapped.filter(e => e.props.taps.length > 0)
            notOnTap = mapped.filter(e => e.props.taps.length == 0)
        } else {
            if (CatalogueSort == "Alc.vol Ascending") {
                let ontapF = mapped.filter(e => e.props.taps.length > 0)
                let notOnTapF = mapped.filter(e => e.props.taps.length == 0)
                ontap = ontapF.sort(function (a, b) {
                    return a.props.alc > b.props.alc;
                });
                notOnTap = notOnTapF.sort(function (a, b) {
                    return a.props.alc > b.props.alc;
                });
            } else if (CatalogueSort == "Alc.vol Descending") {
                let ontapF = mapped.filter(e => e.props.taps.length > 0)
                let notOnTapF = mapped.filter(e => e.props.taps.length == 0)
                ontap = ontapF.sort(function (a, b) {
                    return a.props.alc < b.props.alc;
                });
                notOnTap = notOnTapF.sort(function (a, b) {
                    return a.props.alc < b.props.alc;
                });
            } else {
                let ontapF = mapped.filter(e => e.props.taps.length > 0)
                let notOnTapF = mapped.filter(e => e.props.taps.length == 0)
                ontap = ontapF.sort(function (a, b) {
                    return a.props.name < b.props.alc;
                });
                notOnTap = notOnTapF.sort(function (a, b) {
                    return a.props.name < b.props.alc;
                });
            }
        }
        if (searching != "") {
            let FilterPlusSearch = []
            if (catalogueState == "All Products") {
                ontap.forEach(e => {
                    FilterPlusSearch.push(e)
                })
                notOnTap.forEach(e => {
                    FilterPlusSearch.push(e)
                })

            } else if (catalogueState == "Now Serving") {
                ontap.forEach(e => {
                    FilterPlusSearch.push(e)
                })
            } else {
                notOnTap.forEach(e => {
                    FilterPlusSearch.push(e)
                })
            }
            const Names = []
            FilterPlusSearch.forEach(e => {
                Names.push(e.props.name)
            })
            let filter = [];
            for (let i = 0; i < Names.length; i++) {
                const a = Names[i]
                if (a.toLowerCase().indexOf(searching.toLowerCase()) > -1) {
                    filter.push(a)
                }
            }
            let search = []
            filter.forEach(e => {
                FilterPlusSearch.forEach(et => {
                    if (e == et.props.name) {
                        search.push(et)
                    }
                })
            })
            return (
                <div className="cataloguecontainer">
                    {search}
                </div>
            )
        }
        else if (searching == "" || searching == null) {
            if (catalogueState == "All Products") {
                return (
                    <>
                        <div className="cataloguecontainer">
                            {ontap}
                        </div>
                        <h2 className="NotServingH2">Not serving now</h2>
                        <div className="cataloguecontainer">
                            {notOnTap}
                        </div>
                    </>
                )
            } else if (catalogueState == "Now Serving") {
                return (
                    <div className="cataloguecontainer">
                        {ontap}
                    </div>
                )
            } else {
                return (
                    <div className="cataloguecontainer">
                        {notOnTap}
                    </div>
                )
            }
        }
    }
}