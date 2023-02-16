import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReveiwItem.css';

const ReviewItem = ({ product, handleRemoveItem }) => {
    const { id, img, name, price, quantity } = product;
    return (
        <div className='border rounded p-2 d-flex mb-3 align-items-center'>
            <img className='me-4' style={{ width: '100px', height: '100px' }} src={img} alt="" />
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <div>
                    <h6>{name}</h6>
                    <p>Price: ${price}</p>
                    <p>Quantity: {quantity}</p>
                </div>
                <button className='delete-icon' onClick={() => handleRemoveItem(id)}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
            </div>
        </div >
    );
};

export default ReviewItem;