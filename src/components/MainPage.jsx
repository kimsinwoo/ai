import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../style/MainPage.module.css';

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/gbsw/shop')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className={style.mainPage}>
            <div className={style.product_container}>            
            {products.map(product => (
                <div 
                    key={product.id} 
                    className={style.product} 
                    onClick={() => handleProductClick(product.id)}
                >
                    <img src={product.imgPath} alt={product.title} className={style.productImage} />
                    <h2>{product.title}</h2>
                    <p>Price: {product.price}</p>
                    <p>Uploaded at: {new Date(product.createAt).toLocaleDateString()}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default MainPage;
