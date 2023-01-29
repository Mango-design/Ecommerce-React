import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductsDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const productSuggested = useSelector(state => state.products)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProduct(res.data)
                dispatch(filterProductsCategoryThunk(res.data.categoryId))
            });
    }, [id]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>{product.title}</h1>
                    </Col>
                </Row>
            </Container>
            <Container style={{ paddingTop: 70 }}>
                <h1>Descubre Productos Similares</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {productSuggested.map((productItem) => (

                        <Col lg={4} xs={2}  key={productItem.id}>

                            <Card style={{ height: 280 }} onClick={() => navigate(`products/${productItem.id}`)}>
                                <Card.Img variant="top" className='img_cards' src={productItem.images[0].url}
                                    style={{ width: 250, height: 150, objectFit: 'contain', margin: 'auto', paddingTop: 20 }} />

                                <Card.Body>
                                    <Card.Title> {productItem.title}</Card.Title>
                                    <Card.Text>
                                        {productItem.price}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Col>
                    ))}

                </Row>
            </Container>


        </div>
    );
};

export default ProductsDetail;