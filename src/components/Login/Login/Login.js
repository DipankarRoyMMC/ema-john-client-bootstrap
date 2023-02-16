import React, { useContext } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/UserContext';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                // alert('login successfully!!')
                form.reset();
                navigate(from, { replace: true });

            })
            .catch(err => console.error(err))
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-md-center">
                <Col md={5} className="border p-4 rounded shadow">
                    <h2 className="text-center fs-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Button type="submit" style={{ backgroundColor: 'rgba(255, 153, 0, 0.3)', color: 'black' }} className="w-100 border-0">Login</Button>
                    </Form>
                    <p className='mt-2'>New to Ema-John? <Link to='/signup' className='text-danger text-decoration-none fw-semibold'>Create New Account</Link></p>
                </Col>
            </Row>
        </Container >
    );
};

export default Login;