import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
import { useAuth } from "./../AuthContext";

function AddProject(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const { currentUser } = useAuth();
    // const db = firebase.firestore();

    const handleSubmit = async (e) => {

        e.preventDefault();
        // const auth = getAuth();
        const db = getFirestore();
        // const user = auth.currentUser;

        try {
            await addDoc(collection(db, 'projects'), {
            title,
            description,
            assignedTo,
            status: 'Pending',
            createdBy: currentUser.uid,
            createdAt: Timestamp.now(),
            });
            console.log("Successfully Added !!!");
            setTitle("");
            setDescription("");
            setAssignedTo("");
        } catch (error) {
          console.error('Error adding task: ', error);
        }
      };

  return (
    <Container className="w-50 mt-5 justify-content-center align-items-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Project Title</Form.Label>
          <Form.Control type="text" placeholder="Frontend with ReactJS" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} 
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control type="text" placeholder="Park Jimin"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)} />
        </Form.Group>
       
        <Button type="submit" variant="primary" className="w-100">
            Add Project
        </Button>
      </Form>
    </Container>
  );
}

export default AddProject;