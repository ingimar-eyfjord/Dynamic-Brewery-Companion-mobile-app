import React, { useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import Input from '@material-ui/core/Input';

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
            format="##/##"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function ExpDate(props) {
    const [valid, Validate] = useState(false)
    const [helper, help] = useState("MM/YY")
    const [values, setValues] = React.useState({
        numberformat: ""
    });
    const handleChange2 = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });

        const emailID = event.target.value;
        const date = new Date();
        const result = date.toLocaleDateString("en-GB", { // you can skip the first argument
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const split = result.split("/")
        const MMYY = `` + split[1] + `` + split[2].substr(-2) + ``

        const first = event.target.value.substr(0, 2)
        const second = event.target.value.substr(-2)
        if (emailID.length < 4 || first > 12 || second > 30) {
            Validate(true)
            help("Please enter a valid date")
        } else {
            if (first <= split[1] || second < split[2].substr(-2)) {
                Validate(true)
                help("Card Expired")
            } else {
                Validate(false)
                help("Perfect")
            }
        }


        props.setFormData({ ...props.formData, ExpirationDate: event.target.value })
    };
    const handleFocus = event => {
        const emailID = event.target.value;

        if (emailID.length == 0) {
            Validate(true)
            help("Please enter expiry date")
        }
    }
    const handleBlur = event => {
        Validate(false)
        help("")
    }
    return (
        <TextField
            required
            label="Expiration Date"
            helperText={helper}
            value={values.numberformat}
            onChange={handleChange2}
            name="numberformat"
            id="formatted-numberformat-input"
            error={valid}
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{
                inputComponent: NumberFormatCustom
            }}
        />
    );
}
{/* <TextField format="#### #### #### ####" onChange={e => setFormData({ ...formData, cardnum: e.target.value })} id="standard-basic" label="Card Number" /> */ }