import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Productstable from './Producttable.js';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct.js';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} >Inventory Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        
        <Route path="/products" element={<Productstable />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} /> {/* Add this line for the update route */}
      </Routes>
    </div>
  );
}

export default App;
