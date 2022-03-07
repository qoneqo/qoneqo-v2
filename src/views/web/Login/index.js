import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import Form from '../../../components/Form';
import { useNavigate } from 'react-router';

const Login = () => {
  const [state, setState] = useState({
    identifier: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/show`)
    .then(() => {
      navigate('/dashboard');
    })
    .catch((error) => {
      setIsLoggedIn(false);
    })
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, state)
      .then(({data}) => {
        navigate('/dashboard');
      })
      .catch(() => {})
  };

  return (
    isLoggedIn || 
    <>
      <div className="login w-max m-auto translate-y-1/2 border rounded-xl">
        <p className="text-xl text-center my-2">Login Page</p>
        <Form>
          <Form.Group>
            <Form.Input
              placeholder="Username"
              value={state.identifier}
              onChange={(e) =>
                setState((prev) => ({ ...prev, identifier: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={(e) =>
                setState((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="">
            <Form.Button type="submit" onClick={handleLogin}>
              Login
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default Login;
