import React, { useState } from 'react';
import lgc from '../lgc.png';
import './App.css';
import ItemList from './Items';

function Navbar() {
    const [searchValue, setSearchValue] = useState('');
    const [currencyValue, setCurrencyValue] = useState("EUR");
    let currencies = ["EUR", "USD", "JPY", "GBP", "AUD"];

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleInputCurrency = (event, selectedCurrency) => {
        setCurrencyValue(selectedCurrency);
    };

    return (
        <div className="ew">
            <div className="Navbar">
                <img src={lgc} className="logoNavbar" alt="logo" />
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {currencyValue}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {currencies.map((currency, index) => (
                            <a
                                key={index}
                                className="dropdown-item"
                                onClick={(event) => handleInputCurrency(event, currency)}
                            >
                                {currency}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="Searchbar">
                    <input
                        type="text"
                        placeholder="Que cherchez-vous?"
                        className="input-group-text"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='spacer'></div>
            </div>
            <ItemList myFilter={searchValue} myCurrency={currencyValue} />   
        </div>
    );
}

export default Navbar;
