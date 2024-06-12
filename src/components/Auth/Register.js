import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebase.js';

function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async (e) => {
     e.preventDefault();
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      console.log(userCredential);
     }).catch((error) => {
      console.log(error);
     });
  }


    return (
      <Container className="min-vh-100 d-flex justify-content-center align-items-center">
        <Row>
           <Col>
           <Card border="secondary" >
        
        <Card.Body>
        <Card.Title className='text-center'>Sign Up </Card.Title>
      <Form onSubmit={signUp}>
      {/* <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
        <Form.Label>
          Username
        </Form.Label>
        <Col>
          <Form.Control type="text" placeholder="Kim Taehyung"  />
        </Col>
      </Form.Group> */}
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
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </Col>
      </Form.Group>
      <div className="text-center my-3">
      <Button type="submit" variant="primary" className="w-100">Sign Up</Button>
      </div>
      <Form.Text className="text-center primary">
        <Link to="/login">Already have an account? </Link>     
      </Form.Text>
     
    </Form>
        </Card.Body>
      </Card>
           </Col>
        </Row>
         
      </Container>
    );
}

export default Register;
