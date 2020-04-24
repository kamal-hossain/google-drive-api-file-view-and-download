import React, { Fragment } from 'react';
import { Navbar, Nav, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar1 = () => {
  return (
    <Fragment>
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
        <Navbar.Brand><Link to="/">CIScorner</Link></Navbar.Brand>
        {/* <Link to="/login" variant="outline-success"  className="btn btn-outline-success ml-auto">Log in</Link>{' '} */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav mr-auto">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Enrolled Courses</Nav.Link>
            <Button variant="outline-danger">Log out</Button>{' '}
          </Nav>
        </Navbar.Collapse> */}
      </Navbar>

     
    </Fragment>
  );
};

export default Navbar1;
