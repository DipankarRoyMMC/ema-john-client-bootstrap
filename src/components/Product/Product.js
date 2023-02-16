import { faCartShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const Product = ({ product, handleAddToCart }) => {
    const { img, name, price, shipping } = product;

    return (
        <Col md={6} lg={4}>
            <Card>
                <Card.Img variant="top" src={img} alt="" />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>Price: ${price}</Card.Text>
                    <Card.Text>Shipping: ${shipping}</Card.Text>
                </Card.Body>
                <Button style={{ backgroundColor: '#FFE0B3', color: 'black' }} onClick={() => handleAddToCart(product)} className='w-100 border-0 p-2 rounded-top'>Add to cart
                    <FontAwesomeIcon className='ms-2' icon={faCartShopping}></FontAwesomeIcon>
                </Button>
            </Card>
        </Col>

    );
};

export default Product;