import React, { useState, useEffect } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import data from './countrycodes.json'

function CountryCodeselect({ formData, setFormData }) {
    const mappedMenuItem = data.map((country, index) => <MenuItem key={index} value={country.code}>{country.name}</ MenuItem >)

    const [code, setCode] = useState("");
    const handleChange2 = (event) => {
        const arr = event.target.value.split("-")
        setCode(arr)
    };

    useEffect(() => {
        setFormData({ ...formData, CountryCode: code });
    }, [code])
    return (
        <>
            <InputLabel className="labelCountry" id="demo-simple-select-label">Country</InputLabel>
            <Select

                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={code}
                onChange={handleChange2}
            >
                {mappedMenuItem}
            </Select>
        </>
    )
}

export default CountryCodeselect

