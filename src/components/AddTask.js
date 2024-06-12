import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from "./../AuthContext";

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigned, setAssignedTo] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { currentUser } = useAuth();
  const { pid } = useParams();

  const handleSubmit = async (e) => {

      e.preventDefault();
      const db = getFirestore();

      try {
          await addDoc(collection(db, 'tasks'), {
            proId: pid,
            title,
            description,
            assigned,
            status,
            dueDate,
            createdBy: currentUser.uid,
            createdAt: Timestamp.now(),
          });
          console.log("Successfully Added !!!");
          setTitle("");
          setDescription("");
          setAssignedTo("");
          setStatus("");
          setDueDate("");
      } catch (error) {
        console.error('Error adding task: ', error);
      }
    };

  return (
    <Container className="w-50 mt-5 justify-content-center align-items-center">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
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
        <Form.Group className="mb-3">
          <Form.Label>Assigned</Form.Label>
          <Form.Control type="text" placeholder="Park Jimin" 
           value={assigned}
           onChange={(e) => setAssignedTo(e.target.value)}/>
        </Form.Group>

        <Row>
           <Col>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} />
              </Form.Group>
           </Col>
           <Col>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)} />
              </Form.Group>
           </Col>
        </Row>
        <Button type="submit" variant="primary" className="w-100">
            Add Task
        </Button>
      </Form>
    </Container>
  );
}

export default AddTask;