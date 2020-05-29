import React, { useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            format="###"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function CVC(props) {
    const [values, setValues] = React.useState({
        numberformat: ""
    });
    const [valid, Validate] = useState(false)
    const [helper, help] = useState("***")
    const handleChange2 = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });

        if (event.target.value.length < 3) {
            Validate(true)
            help("Please enter a valid number")
        } else {
            Validate(false)
            help("Perfect")
        }

        props.setFormData({ ...props.formData, CVC: event.target.value })
        localStorage.setItem("CVC", event.target.value)
    };
    const handleFocus = event => {
        const emailID = event.target.value;

        if (emailID.length == 0) {
            Validate(true)
            help("Please enter the CVC number")
        }
    }
    const handleBlur = event => {
        Validate(false)
        help("")
    }
    return (
        <TextField
            required
            label="CVC"
            helperText={helper}
            value={localStorage.getItem("SaveInfo") == false ? localStorage.getItem("CVC") : values.numberformat}
            onChange={handleChange2}
            name="numberformat"
            error={valid}
            id="formatted-numberformat-input"
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{
                inputComponent: NumberFormatCustom
            }}
        />
    );
}
{/* <TextField format="#### #### #### ####" onChange={e => setFormData({ ...formData, cardnum: e.target.value })} id="standard-basic" label="Card Number" /> */ }