import React, { useState, useEffect, useRef, Component } from "react";
import Nav from "./components/nav"
import Searchbar from "./components/searchbar"
import Slideshow from "./components/slideshow"
import Catalogue from "./components/catalogue"
import Filterandsearch from "./components/filterandSearch"
import BottomNav from "./components/bottomnav"
import AboutBeer from "./components/aboutBeer"
import CartPage from "./components/cartPage"
import { Route, Redirect } from 'react-router-dom'
import Checkout from "./components/checkout"
import CheckoutRewview from "./components/checkoutreview"
import PaymentConfirm from "./components/paymentConfirm"
import Wishlist from "./components/wishlist"
import FilterModal from "./components/filter"
import SortModal from "./components/sort"
import { unstable_batchedUpdates } from "react-dom";
function App() {
  const URL = "https://finalfoobarapp.herokuapp.com/"
  const Beers = "https://finalfoobarapp.herokuapp.com/beertypes"
  const tapsArray = []
  const [taps, setTaps] = useState(tapsArray)
  const beersArray = []
  const [beers, setBeers] = useState(beersArray)
  function Counter() {
    useInterval(() => {
      fetch(URL, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }).then(res => res.json()).then(data => setData(data));

      function setData(data) {
        setTaps(data.taps)
      }
    }, 5000);
  }
  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay != null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  Counter()
  useEffect(() => {
    fetch(Beers, {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }).then(res => res.json()).then(data => setBeers(data));
  }, [])

  let aboutArray = []
  if (localStorage.getItem("about") != undefined) {
    const arr = localStorage.getItem("about")
    aboutArray = JSON.parse(arr)
  }
  const [about, setAbout] = useState(aboutArray)

  function openAboutBeer(event) {
    const name = event.target.dataset.id
    const newarr = [...beers]
    const whatBeer = newarr.filter(nameis => nameis.name == name);
    setAbout(whatBeer)
    console.log(whatBeer)
  }
  useEffect(() => {
    localStorage.setItem("about", JSON.stringify(about))
  }, [about])

  let wishlistArr = []
  if (localStorage.getItem("wishlist") != undefined) {
    const arr = localStorage.getItem("wishlist")
    wishlistArr = JSON.parse(arr)
  }
  const [whishlist, setWishlist] = useState(wishlistArr)

  function makeWishList(event) {
    if (event.target.dataset.outofwish == "no") {
      const name = event.target.dataset.id
      const newArr = [...beers];
      const whatBeer = newArr.filter(e => e.name == name)
      if (whishlist.length == 0) {
        setWishlist(whatBeer)
      } else {
        let wishArray = (item) => {
          const array = [...whishlist]
          let filteredList = [item[0]]
          array.forEach(e => {
            if (e.name != item[0].name) {
              filteredList.push(e)
            }
          })
          setWishlist(filteredList)
        }
        wishArray(whatBeer)
      }
    } else {
      const name = event.target.dataset.id
      const newArr = [...beers];
      const whatBeer = newArr.filter(e => e.name == name)
      let wishArray = (item) => {
        const array = [...whishlist]
        let filteredList = []
        array.forEach(e => {
          if (e.name != item[0].name) {
            filteredList.push(e)
          }
        })
        setWishlist(filteredList)
      }
      wishArray(whatBeer)
    }
  }
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(whishlist))
  }, [whishlist])

  let cartArray = []
  if (localStorage.getItem("cart") != undefined) {
    const arr = localStorage.getItem("cart")
    cartArray = JSON.parse(arr)
  }

  const [cart, setCart] = useState(cartArray)
  function makeCart(whatBeer, number) {
    let cartPut = []
    for (let i = 0; i < parseInt(number); i++) {
      cartPut.push(whatBeer)
    }
    setCart(cart.concat(cartPut))
  }
  function editNumCart(howMany, whatBeer) {
    const copy = [...cart]
    const item = copy.filter(item => item[0].name == whatBeer)
    let filter = copy.filter(item => item[0].name != whatBeer)
    if (!howMany == 0) {
      let i;
      for (i = 0; i < howMany; i++) {
        filter.push(item[0])
      }
      setCart(filter)
    } else {
      setCart(filter)
    }
  }
  function deleteItem(whatBeer) {
    const copy = [...cart]
    let filter = copy.filter(item => item[0].name != whatBeer)
    setCart(filter)
  }
  const paymentformObj = {}
  const [paymentForm, setpaymentForm] = useState(paymentformObj)

  function clearCart() {
    const array = []
    setCart(array)
  }

  // Here is a nice short example on how I'm using useEffect
  // to render only once, as when all states update so will 
  // all functions inside this Component, I only want localStorage
  // for cart to be set when cart updates and this is how I achieved that
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  // Here in the bottom you can see that inside the brackets the cart is the state 
  // which useEffect will be tied to.

  const [catalogueState, setCatState] = useState("All Products");
  const [filterState, setFilterState] = useState("closed");
  /// I'm here making sort state/
  const [sortState, setsortState] = useState("closed");
  const [CatalogueSort, setCatalogueSort] = useState("A - Z");
  const [searching, setSearc] = useState("")

  //  { Here is an example of a state, it was meant to hold the Notifications
  //   however delepment had to stop. The notification is the state and setNotification
  //   is the function that will set it, refresh it or render inside it the notifications}
  const notiArray = []
  const [notification, setNotification] = useState(notiArray);
  // Notice the const notiArray is = to an empty array, when defining the state it is used alignSelf: 'center',
  // the template saying that the state will be an array, it could also be written likethis => useState([]);

  return (
    <>
      {/* As the user lands on the main page, all elements 
    that have route path-to something will not be rendered
    unless Reac-Dom-Router directs it. 
    So I make a default redirect to the home at the initial load. */}
      <Redirect to="/index.html"></Redirect>
      {/* The route path attribute will define when an element is to be 
      rebdered, in the case below it's an element of the index.html */}
      <Route path="/index.html" render={() => <Nav notification={notification} />} />
      {/* The bottomnav is the bottom navigation component and is displayed
      on all pages, meanin git will not receive a route tag and so will
      be rendered on all pages. */}
      <BottomNav whishlist={whishlist} cart={cart} />
      <Route path="/aboutBeer" render={() => <AboutBeer whishlist={whishlist} beers={beers} cart={cart} makeWishList={makeWishList} makeCart={makeCart} about={about} taps={taps.filter(name => name.beer == about[0].name)} />} />
      <Route path="/cart" render={() => <CartPage cart={cart} deleteItem={deleteItem} editNumCart={editNumCart} />} />
      <Route path="/index.html" render={() => <Searchbar searching={searching} setSearc={setSearc} />} />
      <Route path="/index.html" render={() => <Slideshow openAboutBeer={openAboutBeer} taps={taps} beers={beers} />} />
      <Route path="/index.html" render={() => <Filterandsearch sortState={sortState} setsortState={setsortState} setFilterState={setFilterState} filterState={filterState} catalogueState={catalogueState} />} />
      <Route path="/index.html" render={() => <FilterModal setFilterState={setFilterState} filterState={filterState} catalogueState={catalogueState} setCatState={setCatState} />} />
      <Route path="/index.html" render={() => <SortModal setCatalogueSort={setCatalogueSort} sortState={sortState} setsortState={setsortState} />} />
      <Route path="/index.html" render={() => <Catalogue setNotification={setNotification} cart={cart} makeCart={makeCart} CatalogueSort={CatalogueSort} searching={searching} catalogueState={catalogueState} taps={taps} whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} beers={beers} isAuthed={true} />} />
      <Route path="/checkout" render={() => <Checkout cart={cart} setpaymentForm={setpaymentForm} />} />
      <Route path="/CheckoutRewview" render={() => <CheckoutRewview paymentForm={paymentForm} deleteItem={deleteItem} editNumCart={editNumCart} cart={cart} />} />
      <Route path="/PaymentConfirm" render={() => <PaymentConfirm clearCart={clearCart} paymentForm={paymentForm} cart={cart} />} />
      <Route path="/Wishlist" render={() => <Wishlist cart={cart} makeCart={makeCart} taps={taps} whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} beers={beers} isAuthed={true} />} />

    </>
  )
}

export default App;
