import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/UserContext';
import logo from '../../../images/Logo.svg';

function Header() {
    const { user, logOut } = useContext(AuthContext);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <img src={logo} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto align-items-lg-center">

                        <Nav.Link as={Link} to='/orders'>Order</Nav.Link>
                        <Nav.Link as={Link} to='/shop'>Shop</Nav.Link>
                        <Nav.Link as={Link} to='/inventory'>Inventory</Nav.Link>
                        {user?.uid ? <Nav.Link as={Link} to='/login'>
                            <button onClick={logOut} className="btn btn-secondary">Logout</button>
                        </Nav.Link> :
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;