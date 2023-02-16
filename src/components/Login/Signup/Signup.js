import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/UserContext';

const Signup = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password.length < 6) {
            setError('password should be 6 digit or longer');
            return;
        }

        if (password !== confirmPassword) {
            setError('password did not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
            })
            .catch(err => console.error(err))

        console.log(email, password, confirmPassword);
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={5} className="border p-4 rounded shadow">
                    <h2 className="text-center fs-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" />
                        </Form.Group>

                        <p className='text-danger'>{error}</p>

                        <Button type="submit" style={{ backgroundColor: 'rgba(255, 153, 0, 0.3)', color: 'black' }} className="w-100 border-0">Sign Up</Button>
                    </Form>
                    <p className='mt-2'>Already have an account? <Link to='/login' className='text-danger text-decoration-none fw-semibold' >Please login</Link></p>
                </Col>
            </Row>
        </Container >
    );
};

export default Signup;