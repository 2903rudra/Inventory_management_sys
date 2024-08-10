import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const UpdateProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();
    
    const [product, setProduct] = useState({
        name: "",
        price: 0.0,
        quantity: 0,
        description: ""
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Fetch the current product details
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/inventory/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError("Failed to fetch product details.");
            }
        };

        fetchProduct();
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value
        }));
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (product.name === '' || product.price <= 0 || product.quantity <= 0) {
            setError("Please fill in all fields correctly.");
            return;
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/inventory/${id}/`, product);
            setSuccess("Product updated successfully!");
            setError(null);
            navigate('/products'); // Redirect to products page after successful update
        } catch (error) {
            console.error('Error updating product:', error);
            setError("An error occurred while updating the product.");
        }
    };

    return (
        <Container className="mt-4">
            <h2>Update Product</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleUpdateProduct}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={product.name}
                        onChange={handleInput}
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={handleInput}
                    />
                </Form.Group>

                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        placeholder="Enter product quantity"
                        value={product.quantity}
                        onChange={handleInput}
                    />
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter product price"
                        value={product.price}
                        onChange={handleInput}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Update Product</Button>
            </Form>
        </Container>
    );
};

export default UpdateProduct;
