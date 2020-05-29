import React, { useState, useEffect, useRef } from "react";
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
function App() {
  const URL = "https://foobar-app-3.herokuapp.com/"
  const Beers = "https://foobar-app-3.herokuapp.com/beertypes"
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const [catalogueState, setCatState] = useState("All Products");
  const [filterState, setFilterState] = useState("closed");
  /// I'm here making sort state/
  const [sortState, setsortState] = useState("closed");
  const [CatalogueSort, setCatalogueSort] = useState("A - Z");
  const [searching, setSearc] = useState("")

  const notiArray = []
  const [notification, setNotification] = useState(notiArray);


  return (
    <>
      <Redirect to="/home"></Redirect>
      <Route path="/home" render={() => <Nav notification={notification} />} />
      <Route path="/aboutBeer" render={() => <AboutBeer whishlist={whishlist} beers={beers} cart={cart} makeWishList={makeWishList} makeCart={makeCart} about={about} taps={taps.filter(name => name.beer == about[0].name)} />} />
      <Route path="/cart" render={() => <CartPage cart={cart} deleteItem={deleteItem} editNumCart={editNumCart} />} />
      <Route path="/home" render={() => <Searchbar searching={searching} setSearc={setSearc} />} />
      <Route path="/home" render={() => <Slideshow />} />
      <Route path="/home" render={() => <Filterandsearch sortState={sortState} setsortState={setsortState} setFilterState={setFilterState} filterState={filterState} catalogueState={catalogueState} />} />
      <Route path="/home" render={() => <FilterModal setFilterState={setFilterState} filterState={filterState} catalogueState={catalogueState} setCatState={setCatState} />} />
      <Route path="/home" render={() => <SortModal setCatalogueSort={setCatalogueSort} sortState={sortState} setsortState={setsortState} />} />
      <Route path="/home" render={() => <Catalogue setNotification={setNotification} cart={cart} makeCart={makeCart} CatalogueSort={CatalogueSort} searching={searching} catalogueState={catalogueState} taps={taps} whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} beers={beers} isAuthed={true} />} />
      <Route path="/checkout" render={() => <Checkout cart={cart} setpaymentForm={setpaymentForm} />} />
      <Route path="/CheckoutRewview" render={() => <CheckoutRewview paymentForm={paymentForm} deleteItem={deleteItem} editNumCart={editNumCart} cart={cart} />} />
      <Route path="/PaymentConfirm" render={() => <PaymentConfirm clearCart={clearCart} paymentForm={paymentForm} cart={cart} />} />
      <Route path="/Wishlist" render={() => <Wishlist cart={cart} makeCart={makeCart} taps={taps} whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} beers={beers} isAuthed={true} />} />
      <BottomNav whishlist={whishlist} cart={cart} />
    </>
  )
}

export default App;
