import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, products: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return { ...state, loadingUpload: false, errorUpload: '' };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
};

export default function ProductEditPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingCreate, loadingUpload }, dispatch] =
    useReducer(reducer, {
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
  const [isActive, setIsActive] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const createHandler = async (e) => {
    e.preventDefault();
    if (window.confirm('Create new product?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        await axios.post(
          '/api/products',
          {
            name,
            slug,
            price,
            image,
            category,
            brand,
            countInStock,
            description,
            isActive,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } },
        );
        toast.success('Product successfully created');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/products`);
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'CREATE_FAIL' });
      }
    }
  };

  const uploadImageFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCESS' });
      toast.success('Image uploaded successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>New Product</title>
      </Helmet>
      <h1>Create New Product</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={createHandler}>
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
            <FormLabel>Image File</FormLabel>
            <FormControl
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="imageFile">
            <FormLabel>Upload Image</FormLabel>
            <FormControl type="file" onChange={uploadImageFileHandler} />
            {loadingUpload && <LoadingBox />}
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

          <FormGroup className="mb-3" controlId="isActive">
            <FormLabel>Status</FormLabel>&nbsp;&nbsp;
            <BootstrapSwitchButton
              onstyle="success"
              offstyle="secondary"
              width={105}
              height={20}
              checked={isActive}
              onlabel="activate"
              offlabel="deactivate"
              onChange={() => {
                isActive ? setIsActive(false) : setIsActive(true);
              }}
              required
            />
          </FormGroup>

          <div className="mb-5">
            <Button disabled={loadingCreate} type="submit">
              Create
            </Button>
            {loadingCreate && <LoadingBox />}
          </div>
        </Form>
      )}
    </Container>
  );
}
