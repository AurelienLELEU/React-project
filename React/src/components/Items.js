import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVibHd0YWVnbGJ0eHBwZGR5eWdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4NzQzNTMsImV4cCI6MjAyMjQ1MDM1M30.6t0_jPNYubLCPmEl8TrK8GCG8g4QRp1mSUejzcMLPH8"
const supabase = createClient(supabaseUrl, supabaseKey)

function convertCurrency(price, exchangeRate) {
    if (exchangeRate !== null && !isNaN(exchangeRate)) {
        return price * exchangeRate;
    }
    return null;
}

function Items({ name, description, seller, photo, onClick, amountInDollars, myCurrency }) {
    return (
        <div className="Item" onClick={onClick}>
            <div className="card">
                <div className="imgContainer">
                    <img src={photo} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    {amountInDollars !== null && !isNaN(amountInDollars) && (
                        <p>Price: {Math.round(amountInDollars)} {myCurrency}</p>
                    )}
                    <div className="seller">
                        Sold by: <b> {seller}</b>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ItemList({ myFilter, myCurrency }) {
    const [articles, setArticles] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const apiKey = '018861a566f6c689570ec619';
                const baseCurrency = 'EUR';
                const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${myCurrency}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.result === 'success') {
                    setExchangeRate(data.conversion_rate);
                } else {
                    throw new Error('Exchange rate fetching failed');
                }
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
            }
        };

        fetchExchangeRate();
    }, [myCurrency]);

    useEffect(() => {
        const fetchArticles = async () => {
            const { data } = await supabase.from('article').select('*');
            setArticles(data);
        };

        fetchArticles();
    }, []);

    const handleItemClick = article => {
        setSelectedItem(article);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const filteredArticles = myFilter
        ? articles.filter(
              article =>
                  article.name.toLowerCase().includes(myFilter.toLowerCase()) ||
                  article.description.toLowerCase().includes(myFilter.toLowerCase()) ||
                  article.seller.toLowerCase().includes(myFilter.toLowerCase())
          )
        : articles;

    return (
        <div className="ItemList">
            {filteredArticles.map((article, index) => (
                <Items
                    key={index}
                    name={article.name}
                    description={article.description}
                    seller={article.seller}
                    photo={article.photo}
                    price={convertCurrency(article.price, exchangeRate)}
                    onClick={() => handleItemClick(article)}
                    amountInDollars={exchangeRate !== null ? convertCurrency(article.price, exchangeRate) : null}
                    myCurrency={myCurrency}
                />
            ))}
            {selectedItem && (
                <Modal
                    onClose={handleCloseModal}
                    name={selectedItem.name}
                    description={selectedItem.description}
                    seller={selectedItem.seller}
                    photo={selectedItem.photo}
                    price={convertCurrency(selectedItem.price, exchangeRate)}
                    currency={myCurrency}
                />
            )}
        </div>
    );
}

export default ItemList;