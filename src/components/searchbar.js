import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";


export default function Searchbar(props) {
    const [values, setValues] = React.useState({
        numberformat: ""
    });
    const handleChange2 = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
        props.setSearc(event.target.value);
    }

    return (
        <div className="searchfield">
            <TextField
                className="searchbar"
                label="Search"
                value={values.numberformat}
                onChange={handleChange2}
                name="numberformat"
                id="formatted-numberformat-input"
            />
        </div>
    );
}
