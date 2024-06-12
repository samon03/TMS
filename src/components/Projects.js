import { Table, Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../firebase.js';

// import { getAuth } from 'firebase/auth';

import { useAuth } from "../AuthContext.js";

function Projects(props) {

  const [projects, setProjects] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getProjects = async (e) => {
      try {
        const prosCollection = collection(db, 'projects');
        const q = query(prosCollection, where('createdBy', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const prosData = [];
        
        querySnapshot.forEach((doc) => {
          prosData.push({ id: doc.id, ...doc.data() });
        });
        
        setProjects(prosData);
      } catch (error) {
        console.error('Error getting projects:', error);
      }
    };

    // Call the async function
    if (currentUser?.uid) {
      getProjects();
    }
  }, [currentUser?.uid]); // Dependency array


  return (
    <Container className="mt-5 justify-content-center align-items-center text-center">
     
      <Table responsive="md">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Project Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>    
          {projects.map((pros) => (
            <tr key={pros.id}>
              <td>{pros.title}</td>
              <td>
                 <Badge bg="warning">{pros.status}</Badge>
              </td>
              <td>
                <Link to={`/addTask/${pros.id}`}> 
                  <Button type="submit" variant="primary"> Add Task </Button>
                </Link>
             
                <Link className="ms-3" to={`/tasks/${pros.id}`}> 
                  <Button type="submit" variant="success"> See Tasks </Button>
                </Link>   
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Projects;
