
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "./../../AuthContext";

const NavTop = () => {
    

    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const auth = getAuth();

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign Out Successfully!!");
            navigate("/login");  
        }).catch(error => console.log(error))
    }

    return (
        <div>
            {currentUser ? (   
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">TMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/projects">My Projects</Nav.Link>
                    <Nav.Link href="/addProject">Add Project</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link>{currentUser.email}</Nav.Link>
                    {/* <NavDropdown title={currentUser.email} id="collapsible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    </NavDropdown> */}
                    <Button variant="outline-success" onClick={userSignOut}>Sign Out</Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            ) : ( 
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">TMS</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/login">Sign In</Nav.Link>
                    </Nav>
                </Container>
                </Navbar>
             )}
        </div>    
    
    );
}

export default NavTop;