import React, { useState, useEffect, useRef } from "react";
import Nav from "./components/nav"
import Searchbar from "./components/searchbar"
import Slideshow from "./components/slideshow"
import Catalogue from "./components/catalogue"
import Filterandsearch from "./components/filterandSearch"
import BottomNav from "./components/bottomnav"
import AboutBeer from "./components/aboutBeer"
import CartPage from "./components/cartPage"
import { Route } from 'react-router-dom'
import Checkout from "./components/checkout"
import CheckoutRewview from "./components/checkoutreview"
import PaymentConfirm from "./components/paymentConfirm"
import Wishlist from "./components/wishlist"
function App() {
  const [transfrom, Settransform] = useState(100)
  let lastScrollTop = 0;

  // check if scrolling down or up by comparing last scrollTop, if page ofset is more it's going down, if it's less it's going up.
  window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      Settransform(0)
    } else {
      Settransform(100)
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
  let Paralexstyle = {
    transform: `translateY(${transfrom}%)`
  }

  const URL = "https://new-foobar2.herokuapp.com/"
  const Beers = "https://new-foobar2.herokuapp.com/beertypes"
  const bartendersArray = []
  const [bartenders, setBartenders] = useState(bartendersArray)
  const queueArray = []
  const [queue, setQueue] = useState(queueArray)
  const servingArray = []
  const [serving, setServing] = useState(servingArray)
  const storageArray = []
  const [storage, setStorage] = useState(storageArray)
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
        setBartenders(data.bartenders)
        setServing(data.serving)
        setStorage(data.storage)
        setTaps(data.taps)
        setQueue(data.queue)
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
  const aboutArray = [];
  const [about, setAbout] = useState(aboutArray)
  function openAboutBeer(event) {
    const name = event.target.dataset.id
    const newarr = [...beers]
    const whatBeer = newarr.filter(nameis => nameis.name == name);
    setAbout(whatBeer)

  }
  const wishlistArr = []
  const [whishlist, setWishlist] = useState(wishlistArr)
  function makeWishList(event) {
    if (event.target.dataset.outofwish == "no") {
      const name = event.target.dataset.id
      const newArr = [...beers];
      const whatBeer = newArr.filter(e => e.name == name)
      if (whishlist.length == 0) {
        // setting queue normally with setState function
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
  const cartArray = []
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

  return (
    <>
      <Route path="/home" render={() => <Nav />} />
      <Route path="/aboutBeer" render={() => <AboutBeer whishlist={whishlist} beers={beers} cart={cart} makeWishList={makeWishList} makeCart={makeCart} about={about} taps={taps.filter(name => name.beer == about[0].name)} />} />
      <Route path="/cart" render={() => <CartPage cart={cart} deleteItem={deleteItem} editNumCart={editNumCart} />} />
      <Route path="/home" render={() => <Searchbar />} />
      <Route path="/home" render={() => <Slideshow />} />
      <Route path="/home" render={() => <Filterandsearch />} />
      <Route path="/home" render={() => <Catalogue taps={taps} whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} beers={beers} isAuthed={true} />} />
      <Route path="/checkout" render={() => <Checkout cart={cart} setpaymentForm={setpaymentForm} />} />
      <Route path="/CheckoutRewview" render={() => <CheckoutRewview paymentForm={paymentForm} deleteItem={deleteItem} editNumCart={editNumCart} cart={cart} />} />
      <Route path="/PaymentConfirm" render={() => <PaymentConfirm paymentForm={paymentForm} cart={cart} />} />
      <Route path="/Wishlist" render={() => <Wishlist taps={taps} whishlist={whishlist} makeWishList={makeWishList} openAboutBeer={openAboutBeer} beers={beers} isAuthed={true} />} />
      <BottomNav whishlist={whishlist} cart={cart} Paralexstyle={Paralexstyle} />
    </>
  )
}

export default App;
