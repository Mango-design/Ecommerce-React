import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return (
        <Navbar bg="light" expand="lg" >
            <Container className="d-flex flex-row justify-content-between" >
                <Navbar.Brand as={Link} to= "/" style={{color:'#f85555'}}>Ecommerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto d-flex flex-row justify-content-between">
                    <Nav.Link as={Link} to="/login" style={{width:100}}><i className="fa-solid fa-user"></i></Nav.Link>
                    <Nav.Link as={Link} to="/purchases" style={{width:100}}><i className="fa-solid fa-box-archive"></i></Nav.Link>
                    <Nav.Link style={{width:100}}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;