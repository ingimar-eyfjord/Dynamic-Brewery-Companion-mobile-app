import React from "react";
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
            format="### #### #### ####"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default function FormattedInputsPhone(props) {
    const [values, setValues] = React.useState({
        numberformat: ""
    });
    const handleChange2 = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
        props.setFormData({ ...props.formData, cardnum: event.target.value })
    };

    return (
        <TextField
            label="Phone Number"
            value={values.numberformat}
            onChange={handleChange2}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
                inputComponent: NumberFormatCustom
            }}
        />
    );
}
