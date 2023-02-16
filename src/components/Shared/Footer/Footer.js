import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='bg-dark py-2 text-white text-center' bg="dark" variant="dark">
            <Container>
                <p className='m-0'>&copy; 2023 Allright Reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;