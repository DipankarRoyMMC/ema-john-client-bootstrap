import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addTodb, deleteShoppingCart, getStoredCart } from '../../fakedb/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

/* 
total data = count: 76,
show data one page = perPage: 10,
page = count / perPage == 76/10 == ceil (7.6) = 8 
current page == exactly current page (page)
*/
const Shop = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [page, size]);

    const pages = Math.ceil(count / size);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);

        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct)
                    }
                }
                setCart(savedCart);
            })


    }, [products]);


    // add to cart 
    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        } else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        // console.log(newCart);
        setCart(newCart);
        addTodb(selectedProduct._id);
    }

    return (
        <Container className='my-4'>
            <Row>
                <Col xs={6} md={7} lg={9}>
                    <Row className="g-4">
                        {
                            products.map(product => <Product
                                key={product._id}
                                product={product}
                                handleAddToCart={handleAddToCart}
                            ></Product>)
                        }
                    </Row>
                    {/* pagination code  */}
                    <div>
                        <div className="border py-2 text-center rounded mt-2">
                            <h4 className='mb-3'>Selected Current page : {page} and size: {size}</h4>
                            {
                                [...Array(pages).keys()].map(number => <Button
                                    className={page === number && 'selected'}
                                    onClick={() => setPage(number)}
                                    variant="light"
                                    key={number}
                                >{number + 1}</Button>)
                            }
                            <select onChange={event => setSize(event.target.value)}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20 selected">20</option>
                                <option value="25">25</option>
                            </select>
                        </div>
                    </div>


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
        </Container >


    );
};

export default Shop;