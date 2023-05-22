import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function LoginPage() {
  const { search } = useLocation();
  const redirecInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirecInUrl ? redirecInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      console.log(data);
    } catch (err) {}
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="mb-3" controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="mb-3" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <div className="mb-3">
          <Button type="submit">Login</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}
