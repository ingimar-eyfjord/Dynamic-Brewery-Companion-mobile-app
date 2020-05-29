import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
export default function CardName(props) {
    const [valid, Validate] = useState(false)
    const [helper, help] = useState("")
    const [values, setValues] = React.useState({
        numberformat: ""
    });
    const handleChange2 = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
        if (event.target.value.length <= 1) {
            Validate(false)
            help("That's a very short name")
        } else if (event.target.value.length >= 1) {
            help("Perfect")
        }
        localStorage.setItem("CardHolder", event.target.value)
        props.setFormData({ ...props.formData, cardholder: event.target.value })
    };
    const handleFocus = event => {
        const emailID = event.target.value;

        if (emailID.length == 0) {
            Validate(true)
            help("Please enter your name")
        }
    }
    const handleBlur = event => {
        Validate(false)
        help("")
    }
    return (
        <TextField
            required
            label="First Name"
            helperText={helper}
            value={localStorage.getItem("SaveInfo") == false ? localStorage.getItem("CardHolder") : values.numberformat}
            error={valid}
            onChange={handleChange2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="numberformat"
            id="formatted-numberformat-input"
        />
    );
}
