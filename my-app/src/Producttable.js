import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";

const Productstable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/inventory/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/inventory/${id}/`);
                setSuccess("Product deleted successfully!");
                setProducts(products.filter(product => product.id !== id)); // Update local state
            } catch (error) {
                console.error('Error deleting product:', error);
                setError("Failed to delete product. Please try again.");
            }
        }
    };

    return (
        <Container className="mt-4">
            <h2>Products</h2>
            {loading ? (
                <Alert variant="info">Loading products...</Alert>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>${Number(product.price).toFixed(2)}</td> {/* Convert price to number */}
                                    <td>
                                        <Link to={`/update-product/${product.id}`}>
                                            <Button variant="warning" className="me-2">Edit</Button>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    );
}

export default Productstable;
