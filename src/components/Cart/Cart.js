import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = ({ cart, clearCart, children }) => {
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * .10).toFixed(2));
    const grandTotal = total + shipping + tax;
    return (
        <Card className="sticky-top" style={{ backgroundColor: '#FFE0B3' }}>
            <Card.Body>
                <Card.Title>Ordered Products</Card.Title>
                <Card.Text>Selected Items: {quantity}</Card.Text>
                <Card.Text>Total Price: ${total}</Card.Text>
                <Card.Text>Tax: ${tax} </Card.Text>
                <Card.Text>Shipping: ${shipping}</Card.Text>
                <h5 className="fw-bold">Grand Total: ${grandTotal}</h5>

                <button onClick={clearCart} className='btn btn-secondary w-100 my-3'>Clear Order
                    <FontAwesomeIcon className="ms-2" icon={faTrashAlt}> </FontAwesomeIcon>
                </button>
                {children}
            </Card.Body>
        </Card>
    );
};

export default Cart;