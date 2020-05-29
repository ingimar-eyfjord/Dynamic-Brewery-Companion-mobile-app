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
            format="#### #### #### ####"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function FormattedInputs(props) {
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
        if (event.target.value.length < 16) {
            Validate(true)
            help("Please enter a calid card number")
        } else {
            Validate(false)
            help("Perfect")
        }
        localStorage.setItem("Card", event.target.value)
        props.setFormData({ ...props.formData, cardnum: event.target.value })
    };
    const handleFocus = event => {
        const emailID = event.target.value;

        if (emailID.length == 0) {
            Validate(true)
            help("Please enter a calid card number")
        }
    }
    const handleBlur = event => {
        Validate(false)
        help("")
    }
    return (
        <TextField
            required
            label="Card Number"
            value={localStorage.getItem("SaveInfo") == false ? localStorage.getItem("Card") : values.numberformat}
            helperText={helper}
            onChange={handleChange2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={valid}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
                inputComponent: NumberFormatCustom
            }}
        />
    );
}
{/* <TextField format="#### #### #### ####" onChange={e => setFormData({ ...formData, cardnum: e.target.value })} id="standard-basic" label="Card Number" /> */ }