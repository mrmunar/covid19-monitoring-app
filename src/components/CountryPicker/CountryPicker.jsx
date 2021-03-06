import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CountryPicker({ handleCountryChange }) {
    const classes = useStyles();
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const [country, setCountry] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries())
        }

        fetchAPI();
    }, [setFetchedCountries]);

    const handleOnChange = (e) => {
        handleCountryChange(e.target.value);
    }

    return (
        <FormControl className={cx(styles.formControl, classes.formControl)}>
            <InputLabel id="countries-label">Countries</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="countries-select"
                onChange={handleOnChange}
                defaultValue=""
            >
                <MenuItem value="global">Global</MenuItem>
                {fetchedCountries.map((country) => <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
