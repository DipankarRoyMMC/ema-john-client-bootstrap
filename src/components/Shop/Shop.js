import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useLoaderData } from 'react-router-dom';
import { addTodb, deleteShoppingCart, getStoredCart } from '../../fakedb/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

const Shop = () => {
    const [cart, setCart] = useState([]);

    const { products } = useLoaderData();

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
        }
        setCart(savedCart);

    }, [products]);


    // add to cart 
    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        // console.log(newCart);
        setCart(newCart);
        addTodb(selectedProduct.id);
    }

    return (
        <Container className='my-4'>
            <Row>
                <Col xs={6} md={7} lg={9}>
                    <Row className="g-4">
                        {
                            products.map(product => <Product
                                key={product.id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            ></Product>)
                        }
                    </Row>
                </Col>
                <Col xs={6} md={5} lg={3}>
                    <Cart clearCart={clearCart} cart={cart}>
                        <Link to='/orders'>
                            <Button className='btn btn-primary w-100'>Order Review
                                <FontAwesomeIcon className="ms-2" icon={faArrowRight}></FontAwesomeIcon>
                            </Button>
                        </Link>
                    </Cart>
                </Col>
            </Row>
        </Container>


    );
};

export default Shop;