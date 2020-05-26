import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
export default function Email(props) {
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

        const emailID = event.target.value;
        const atpos = emailID.indexOf("@");
        const dotpos = emailID.lastIndexOf(".");

        if (atpos < 1 || (dotpos - atpos < 2)) {
            Validate(true)
            help("Please enter a valid email address")
        } else {
            Validate(false)
            help("Perfect")
        }
        props.setFormData({ ...props.formData, Email: event.target.value })
    };
    const handleFocus = event => {
        const emailID = event.target.value;

        if (emailID.length == 0) {
            Validate(true)
            help("Please enter a email address")
        }
    }
    const handleBlur = event => {
        Validate(false)
        help("")
    }
    return (
        <TextField
            required
            label="Email"
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
