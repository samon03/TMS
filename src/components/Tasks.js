import { Table, Container, Button, Badge } from 'react-bootstrap';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';
import { useAuth } from "../AuthContext.js";
import { doc, updateDoc } from "firebase/firestore";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const { proId } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateValue, setUpdateValue] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Define getTasks outside useEffect and memoize it
  const getTasks = useCallback(async () => {
    try {
      console.log('Fetching tasks for project ID:', proId);
      const taskCollection = collection(db, 'tasks');
      const tks = query(taskCollection, where('proId', '==', proId));
      const querySnapshotTask = await getDocs(tks);

      const tasksData = querySnapshotTask.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log('Fetched tasks data:', tasksData);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error getting tasks:', error);
    }
  }, [proId]);

  useEffect(() => {
    // Call the async function
    if (currentUser?.uid) {
      console.log('Current user ID:', currentUser.uid);
      getTasks();
    } else {
      console.log('No current user ID found');
    }
  }, [currentUser?.uid, getTasks]);

  const handleUpdate = async () => {
    if (selectedDoc) {
      try {
        const upRef = doc(db, "tasks", selectedDoc.id);
        await updateDoc(upRef, {
          status: updateValue
        });

        alert("Document updated successfully");
        handleClose();
        getTasks(); // Call getTasks to refresh the list
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      alert("Please select a document to edit");
    }
  };

  return (
    <Container className="mt-5 justify-content-center align-items-center text-center">
      <Table responsive>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((tdoc) => (
            <tr key={tdoc.id} onClick={() => setSelectedDoc(tdoc)}>
              <td>{tdoc.title}</td>
              <td>{tdoc.assigned}</td>
              <td>
                <Badge bg="success">{tdoc.status}</Badge>
              </td>
              <td>{tdoc.dueDate}</td>
              <td>
                <Button variant="info" value={tdoc.id} onClick={handleShow}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedDoc && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Project Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Completed"
                  value={updateValue}
                  onChange={(e) => setUpdateValue(e.target.value)}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Tasks;
