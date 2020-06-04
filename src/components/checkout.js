import React, { useState } from "react";
import Cards from "./cards";
import { Link, Redirect } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormattedInputs from './cardInputField'
import FormattedInputsPhone from './phoneInputFiled'
import CountryCodeselect from './countryCodeselect'
import CVC from "./cvc"
import ExpDate from "./expdate"
import Email from "./emailinput"
import Fname from "./Fname"
import CardName from "./cardname"
export default function Checkout(props) {
    const date = new Date()
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
    const datePrint = `` + day + ` ` + monthName[month] + `, ` + year + ``
    const total = props.cart.length > 0 ? props.cart.length * 50 : 0;
    const [confirm, setConfirm] = useState(false)
    const [paymentType, setpaymentType] = useState("")
    const [state, setState] = React.useState({
        checkedB: false,
    });
    const formDetails = {
        Firstname: localStorage.getItem("Name"),
        CountryCode: "",
        Phone: localStorage.getItem("PhoneNumber"),
        Email: localStorage.getItem("Email"),
        cardholder: localStorage.getItem("CardHolder"),
        cardnum: localStorage.getItem("Card"),
        CVC: localStorage.getItem("CVC"),
        ExpirationDate: localStorage.getItem("ExpirationDate"),
        saveCardInfo: true,
        CardType: localStorage.getItem("CardType") || paymentType,
    }
    const [formData, setFormData] = useState(formDetails)
    function submitFunc(e) {
        e.preventDefault()
        props.setpaymentForm(formData)
        setConfirm(true)
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setFormData({ ...formData, saveCardInfo: state.checkedB });
        localStorage.setItem("SaveInfo", event.target.value)
    };
    if (props.cart.length == 0) {
        return (
            <Redirect to="/index.php"></Redirect>
        )
    } else {
        if (confirm === true) {
            return (
                <Redirect to="/CheckoutRewview"></Redirect>
            )
        } else {
            return (

                <form style={{ alignItems: "center" }} className="flexColumn" onSubmit={submitFunc}>
                    <div className="checkoutCont">
                        <h2 className="checkTitle">Check out</h2>
                        <div className="cartLine"></div>
                        <div className="billInfo">
                            <p className="col1 justleft">Date</p>
                            <p className="date col2 justright">{datePrint}</p>
                            <p className="col1 justleft">Total Bill:</p>
                            <p className=" col2 justright">{total} DKK</p>
                        </div>
                    </div>

                    <div className="contactTitle translateX">
                        <div className="blackCirlce">1</div>
                        <p>Contact Info</p>
                    </div>

                    <div className="contactInput">
                        <div className="span2 marginTop1Rem">

                            <Fname className="marginTop1Rem" formData={formData} setFormData={setFormData} ></Fname>
                        </div>

                        <div className="phoneInput marginTop1Rem">
                            <CountryCodeselect formData={formData} setFormData={setFormData}></CountryCodeselect>
                        </div>

                        <FormattedInputsPhone required className="phoneCountry marginTop1Rem" formData={formData} setFormData={setFormData}></FormattedInputsPhone>

                        <div className="span2 marginTop1Rem">
                            <Email formData={formData} setFormData={setFormData} ></Email>
                        </div>
                    </div>

                    <div className="contactTitle translateX">
                        <div className="blackCirlce">2</div>
                        <p>Payment Info</p>
                    </div>

                    <div className="cardsSelect">
                        <Cards formData={formData} setFormData={setFormData}></Cards>
                    </div>

                    <div className="cardInput">
                        <CardName className="marginTop1Rem" formData={formData} setFormData={setFormData} ></CardName>
                        <FormattedInputs className="marginTop1Rem" formData={formData} setFormData={setFormData} ></FormattedInputs>
                        <CVC className="marginTop1Rem" formData={formData} setFormData={setFormData} ></CVC>
                        <ExpDate formData={formData} setFormData={setFormData} ></ExpDate>
                        <div style={{ marginLeft: "1rem" }} className="flexrow left">
                            <FormControlLabel className="marginTop1Rem"
                                control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Save Creditcard info"
                            />

                        </div>
                    </div>
                    <div className="Checkoutbuttons">
                        <button className="continueback orange whitetext marginTop2Rem">Continue</button>
                        <Link to="/cart" ><button type="button" className="continueback back">Back</button></Link>
                    </div>

                </form >
            )
        }
    }
}