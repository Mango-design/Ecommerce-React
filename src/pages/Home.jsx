import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsHeadlineThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {



    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products)
    const [categories, setCategories] = useState([]);
    const [newSearch, setNewSearch] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data));
    }, []);

    console.log(categories);

    return (
        <div>
            <Container>
                <Row>
                    <Col lg={3}>
                        <DropdownButton id="dropdown-basic-button"  title="Categorias">
                            {
                                categories.map(category => (
                                    <Dropdown.Item key={category.id} onClick={() => dispatch(filterProductsCategoryThunk(category.id))}>{category.name}</Dropdown.Item>
                                ))}
                        </DropdownButton>
                    </Col>
                    <Col lg={9}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Recipient's username"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={newSearch}
                                onChange={e => setNewSearch(e.target.value)}
                            />
                            <Button onClick={() => dispatch(filterProductsHeadlineThunk(newSearch))}
                                variant="outline-secondary" id="button-addon2">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                        </InputGroup>
                        <Container style={{paddingTop:70}}>
                            <Row xs={1} md={2} lg={3} className="g-4">
                                {productsList.map((products) => (

                                    <Col lg={4} xs={2} key={products.id} >

                                        <Card style={{height:350}} onClick={() => navigate(`/products/${products.id}`)}>
                                            <Card.Img variant="top" className='img_cards' src={products.images[0].url} 
                                            style={{width:200, height:170, objectFit:'contain', margin:'auto', paddingTop:20}}/>
                                            <Card.Body>
                                                <Card.Title>{products.title}</Card.Title>
                                                <Card.Text>
                                                    {products.price}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                    </Col>
                                ))}

                            </Row>
                        </Container>
                    </Col>

                </Row>
                <Row>
                    <Col>



                    </Col>

                </Row>
            </Container>


        </div>
    );
};

export default Home;