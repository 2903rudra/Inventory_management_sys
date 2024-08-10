import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './App.css';

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0.0,
        quantity: 0,
        description: ""
    });

    const [error, setError] = useState(null);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setNewProduct((prevState) => ({
            ...prevState,
            [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (newProduct.name === '' || newProduct.price <= 0 || newProduct.quantity <= 0) {
            setError("Please fill in all fields correctly.");
            return;
        }

        axios.post('http://127.0.0.1:8000/api/inventory/', newProduct)
            .then(response => {
                setNewProduct({ name: '', description: '', quantity: 0, price: 0.0 });
                setError(null);
            })
            .catch(error => {
                console.error('Error adding product:', error);
                setError("An error occurred while adding the product.");
            });
    };

    return (
        <Container className="mt-4">
            <h2>Add a New Product</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleAddProduct}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={handleInput}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Enter product description"
                        value={newProduct.description}
                        onChange={handleInput}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        placeholder="Enter product quantity"
                        value={newProduct.quantity}
                        onChange={handleInput}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter product price"
                        value={newProduct.price}
                        onChange={handleInput}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Add Product
                </Button>
            </Form>
        </Container>
    );
}

export default AddProduct;
