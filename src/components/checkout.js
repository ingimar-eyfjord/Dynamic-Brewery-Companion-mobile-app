import React, { useState } from "react";
import Cards from "./cards";
import { Link, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormattedInputs from './cardInputField'
import FormattedInputsPhone from './phoneInputFiled'
import CountryCodeselect from './countryCodeselect'
import { orange } from '@material-ui/core/colors';
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

    const formDetails = {
        Firstname: "",
        Lastname: "",
        CountryCode: "",
        Phone: "",
        Email: "",
        cardholder: "",
        cardnum: "",
        CVC: "",
        ExpirationDate: "",
        saveCardInfo: "",
        CardType: paymentType
    }
    const [formData, setFormData] = useState(formDetails)
    function submitFunc(e) {
        e.preventDefault()
        props.setpaymentForm(formData)
        setConfirm(true)
    }
    const [state, setState] = React.useState({
        checkedB: false,
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setFormData({ ...formData, saveCardInfo: event.target.value });
    };


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

                <div className="contactTitle">
                    <div className="blackCirlce">1</div>
                    <p>Contact Info</p>
                </div>

                <div className="contactInput">
                    <div>

                        <TextField className="marginTop1Rem" onChange={e => setFormData({ ...formData, Firstname: e.target.value })} id="standard-basic" label="First Name" />

                    </div>
                    <div>
                        <TextField className="marginTop1Rem" onChange={e => setFormData({ ...formData, Lastname: e.target.value })} id="standard-basic" label="Last Name" />
                    </div>
                    <div className="phoneInput">
                        <CountryCodeselect className="marginTop1Rem" formData={formData} setFormData={setFormData}></CountryCodeselect>
                    </div>
                    <FormattedInputsPhone className="marginTop1Rem" className="phoneCountry" formData={formData} setFormData={setFormData}></FormattedInputsPhone>

                    <div>
                        <TextField className="marginTop1Rem" onChange={e => setFormData({ ...formData, Email: e.target.value })} id="standard-basic" label="Email" />
                    </div>
                </div>

                <div className="contactTitle">
                    <div className="blackCirlce">2</div>
                    <p>Payment Info</p>
                </div>

                <div className="cardsSelect">
                    <Cards formData={formData} setFormData={setFormData}></Cards>
                </div>

                <div className="contactInput">
                    <div>
                        <TextField className="marginTop1Rem" onChange={e => setFormData({ ...formData, cardholder: e.target.value })} id="standard-basic" label="Cardholder Name" />
                    </div>
                    <div>
                        <FormattedInputs className="marginTop1Rem" formData={formData} setFormData={setFormData} ></FormattedInputs>
                    </div>
                    <div>
                        <TextField className="marginTop1Rem" onChange={e => setFormData({ ...formData, CVC: e.target.value })} id="standard-basic" label="CVC" />
                    </div>
                    <div>
                        <TextField className="marginTop1Rem" onChange={e => setFormData({ ...formData, ExpirationDate: e.target.value })} id="standard-basic" label="Expiration Date" />
                    </div>
                </div>
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
                <button className="continueback orange whitetext marginTop2Rem">Continue</button>

                <Link to="/cart" ><button type="button" className="continueback back">Back</button></Link>

            </form >
        )
    }
}