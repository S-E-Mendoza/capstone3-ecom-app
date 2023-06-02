import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function ProductEditPage() {
  const params = useParams();
  const { id: productId } = params;
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <h1>Product {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form>
          <FormGroup className="mb-3" controlId="name">
            <FormLabel>Name</FormLabel>
            <FormControl
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="slug">
            <FormLabel>Slug</FormLabel>
            <FormControl
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="price">
            <FormLabel>Price</FormLabel>
            <FormControl
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="image">
            <FormLabel>Image</FormLabel>
            <FormControl
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="category">
            <FormLabel>Category</FormLabel>
            <FormControl
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="countInStock">
            <FormLabel>Available Stock</FormLabel>
            <FormControl
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="brand">
            <FormLabel>Brand</FormLabel>
            <FormControl
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3" controlId="description">
            <FormLabel>Description</FormLabel>
            <FormControl
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormGroup>
          <div className="mb-5">
            <Button type="submit">Update</Button>
          </div>
        </Form>
      )}
    </Container>
  );
}
