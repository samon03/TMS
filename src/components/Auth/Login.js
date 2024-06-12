import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

// import { Navigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebase.js';
// import { useAuth } from '../../contexts/contextAuth/index.js'; 

const Login = () => {

    // const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const signIn = async (e) => {
       e.preventDefault();
       signInWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
        console.log(userCredential, loggedIn);
        setLoggedIn(true);
        navigate('/projects');
       }).catch((error) => {
        console.log(error);
       });
    }


    return (
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        {/* {userLoggedIn && (<Navigate to={'/home'} replace= {true} />)} */}
        <Row>
           <Col>
           <Card border="secondary" >
        
        <Card.Body>
        <Card.Title className='text-center'>Sign In </Card.Title>
      <Form onSubmit={signIn}>
      <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
        <Form.Label>
          Email
        </Form.Label>
        <Col>
          <Form.Control type="email" placeholder="email@example.com" 
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label>
          Password
        </Form.Label>
        <Col>
          <Form.Control type="password" placeholder="Password" 
             value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Col>
      </Form.Group>
      <div className="text-center my-3">
      <Button type="submit" variant="primary" className="w-100">Sign In</Button>
      </div>
      <Form.Text className="text-center primary">
        <Link to="/signup">Not have an account? </Link>
      </Form.Text>
     
    </Form>
        </Card.Body>
      </Card>
           </Col>
        </Row>
         
      </Container>
    );
}

export default Login;
