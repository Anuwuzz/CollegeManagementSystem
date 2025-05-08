import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import your custom styles
import StudentRegister from './components/Student/StudentRegister';
import StudentDelete from './components/Student/StudentDelete';
import Top5Faculty from './components/Feedback/top5';
import Visualizations from './components/Feedback/visual';
import StudentLogin from './components/Student/StudentLogin';
import StudentUpdate from './components/Student/StudentUpdate';
import FacultyRegister from './components/Faculty/FacultyRegister';
import FacultyLogin from './components/Faculty/FacultyLogin';
import FacultyUpdate from './components/Faculty/FacultyUpdate';
import FeedbackForm from './components/Feedback/FeedbackForm';
import CourseRegistration from './components/Course/CourseRegistration';
import CourseList from './components/Course/CourseList';
import FacultyDelete from './components/Faculty/FacultyDelete';



const WelcomeMessage = () =>{
  return(
    <div className="Welcome">
      Welcome to College Management System
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="white" variant="white" expand="lg">
            <Navbar.Brand as={Link} to="/">College Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Student Service" id="studentDropdown" aria-haspopup="true">
                  <NavDropdown.Item as={Link} to="/student/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student/register">Register</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student/update">Update</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/student/delete">Delete</NavDropdown.Item>
                 
                </NavDropdown>
                <NavDropdown title="Faculty Service" id="facultyDropdown" aria-haspopup="true">
                  <NavDropdown.Item as={Link} to="/faculty/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/faculty/register">Register</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/faculty/update">Update</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/faculty/delete">Delete</NavDropdown.Item>
                  
                </NavDropdown>
                <NavDropdown title="Course Service" id="courseDropdown" aria-haspopup="true">
                  <NavDropdown.Item as={Link} to="/course/register">Register</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/course/display">Display</NavDropdown.Item>
                  
                </NavDropdown>
                <NavDropdown title="Feedback" id="feedbackDropdown" aria-haspopup="true">
                  <NavDropdown.Item as={Link} to="/feedback">Faculty Feedback</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/feedback/faculty">Top Rated Faculty</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/feedback/visual">Visual Representation</NavDropdown.Item>
                </NavDropdown>
                {isLoggedIn && (
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <main>
          <Routes>

            <Route path="/" element={<WelcomeMessage />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/student/login" element={<StudentLogin onLogin={handleLogin} />} />
            <Route path="/student/update" element={<StudentUpdate/>} />
            <Route path="/student/delete" element={<StudentDelete/>} />
            

            <Route path="/faculty/register" element={<FacultyRegister />} />
            <Route path="/faculty/login" element={<FacultyLogin onLogin={handleLogin} />} />
            <Route path="/faculty/update" element={<FacultyUpdate />} />
            <Route path="/faculty/delete" element={<FacultyDelete />} />


            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/feedback/faculty" element={<Top5Faculty />} />
            <Route path="/feedback/visual" element={<Visualizations />} />
            <Route path="/course/register" element={<CourseRegistration />} />
            <Route path="/course/display" element={<CourseList />} />
            </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
