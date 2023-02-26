import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../fakedb/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const { initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = (id) => {
        const remaning = cart.filter(product => product._id !== id);
        setCart(remaning);
        removeFromDb(id);
    }

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <Container className="my-5">
            <Row>
                <Col sm={12} lg={10} className="mx-auto">
                    <Row>
                        <Col sm={8} md={7} lg={8}>
                            {
                                cart.map(product => <ReviewItem
                                    key={product._id}
                                    product={product}
                                    handleRemoveItem={handleRemoveItem}
                                ></ReviewItem>)
                            }
                        </Col>
                        <Col sm={4} md={5} lg={4}>
                            <Cart clearCart={clearCart} cart={cart}>
                                <Link to='/shipping'> <Button className="btn btn-warning w-100">Shipping
                                    <FontAwesomeIcon className='ms-2' icon={faArrowRight}></FontAwesomeIcon>
                                </Button></Link>
                            </Cart>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Orders;