import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
export default function Lname(props) {
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

        props.setFormData({ ...props.formData, Lastname: event.target.value })
    };
    const handleFocus = event => {
        const emailID = event.target.value;

        if (emailID.length == 0) {
            Validate(true)
            help("Please enter your last name")
        }
    }
    const handleBlur = event => {
        Validate(false)
        help("")
    }
    return (
        <TextField
            required
            label="Last Name"
            helperText={helper}
            value={values.numberformat}
            error={valid}
            onChange={handleChange2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name="numberformat"
            id="formatted-numberformat-input"
        />
    );
}
