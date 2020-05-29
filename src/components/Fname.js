import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
export default function Fname(props) {
    const [valid, Validate] = useState(false)
    const [helper, help] = useState("")
    const [values, setValues] = React.useState({
        numberformat: ""
    });
    // const local = localStorage.getItem('FormDataInLocal');
    // const json = JSON.parse(local)
    const handleChange2 = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
        if (event.target.value.length <= 1) {
            Validate(true)
            help("That's a very short name")
        } else if (event.target.value.length >= 1) {
            Validate(false)
            help("Great!! This name will appear with your order on the dashboard above the bar")
        }
        localStorage.setItem("Name", event.target.value)
        props.setFormData({ ...props.formData, Firstname: event.target.value })
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
            label="Name"
            helperText={helper}
            value={localStorage.getItem("Name") || values.numberformat}
            error={valid}
            onChange={handleChange2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="numberformat"
            id="formatted-numberformat-input"
        />
    );
}
