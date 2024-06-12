import { Table, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase.js';

function HomePage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects');
        const querySnapshot = await getDocs(projectsCollection);
        const projectsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResults(projectsList);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
  }, []); // Only run once when the component mounts

  return (
    <Container className="mt-5 justify-content-center align-items-center text-center">
      <Table responsive="md">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Assigned</th>
          </tr>
        </thead>
        <tbody>    
          {results.map((pros) => (
            <tr key={pros.id}>
              <td>{pros.title}</td>
              <td>{pros.assignedTo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default HomePage;
