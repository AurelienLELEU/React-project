import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from './Modal';
import { createClient } from '@supabase/supabase-js'

// Configuration pour l'accès à la base de données Supabase
const supabaseUrl = 'https://eblwtaeglbtxppddyygp.supabase.co'
const supabaseKey = "YourKey" // Remplacez par votre clé Supabase
const supabase = createClient(supabaseUrl, supabaseKey)

// Fonction pour convertir le prix en fonction du taux de change
function convertCurrency(price, exchangeRate) {
    if (exchangeRate !== null && !isNaN(exchangeRate)) {
        return price * exchangeRate;
    }
    return null;
}

// Composant pour afficher un article
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

// Composant principal pour afficher la liste d'articles
function ItemList({ myFilter, myCurrency }) {
    const [articles, setArticles] = useState([]); //useState pour stocker les articles de supabase
    const [selectedItem, setSelectedItem] = useState(null); //useState pour stocker l'article sélectionné
    const [exchangeRate, setExchangeRate] = useState(null); //useState pour stocker les taux de change

        // useEffect pour récupérer le taux de change lorsque l'utilisateur change de devise  
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const apiKey = 'YourKey';// Remplacez par votre clé API Exchangerate
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
    
    // useEffect pour récupérer les articles depuis Supabase lors du chargement initial
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
    
    // Filtrer les articles en fonction du texte de recherche
    const filteredArticles = myFilter
        ? articles.filter(
              article =>
                  article.name.toLowerCase().includes(myFilter.toLowerCase()) ||
                  article.description.toLowerCase().includes(myFilter.toLowerCase()) ||
                  article.seller.toLowerCase().includes(myFilter.toLowerCase())
          )
        : articles;

    // Rendu du composant
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
