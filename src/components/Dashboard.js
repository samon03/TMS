import { Table, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from '../firebase.js';

// import { getAuth } from 'firebase/auth';

import { useAuth } from "../AuthContext.js";

function Dashboard() {

  const { currentUser } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchData = async () => {
      if (searchTerm) {
        const searchCollection = collection(db, 'projects');
        const searchQuery = query(searchCollection, where('title', '==', searchTerm));
        const querySnapshot = await getDocs(searchQuery);
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        
        setResults(data);
      }
    };

    fetchSearchData();
  }, [searchTerm, currentUser?.uid]);


  return (
    <Container className="mt-5 justify-content-center align-items-center text-center">
       <div className="my-4">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search project ..." 
          className="w-100"
        />
      </div>
      <Table responsive="md">
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Assigned</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>    
          {results.map((pros) => (
            <tr key={pros.id}>
              <td>{pros.title}</td>
              <td>{pros.assignedTo}</td>
              <td>{pros.status}</td>
              <td>

                {currentUser.uid === pros.createdBy &&  (
                    <Link to={`/addTask/${pros.id}`}> 
                    <Button type="submit" variant="primary"> Add Task </Button>
                    </Link>
                )} 
                
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

export default Dashboard;
