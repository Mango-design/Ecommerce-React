import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const {id} = useParams();
    const [product, setProduct] = useState({});
    const productSuggested =useSelector(state => state.products)

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(res=>{
            setProduct(res.data)
            dispatch(filterProductsCategoryThunk(res.data.categoryId))
        });
    },[id]);
   
    return (
        <div>
            <h1>{product.title}</h1>
            {
                productSuggested.map((productItem) => (
                    <li key={productItem.id} onClick = {() => navigate(`products/${productItem.id}`)}>
                        {productItem.title}
                    </li>
                ))
            }

            
            <p>{product.description}</p>
            <p>Mostrando producto de id <b>{id}</b></p>

        </div>
    );
};

export default ProductsDetail;