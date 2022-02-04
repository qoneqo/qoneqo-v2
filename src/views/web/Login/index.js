import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../../../components/Form';
import { useNavigate } from 'react-router';

const Login = () => {
  const [state, setState] = useState({
    identifier: '',
    password: '',
  });
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  useEffect(() => {
    axios
      .get('http://localhost:9999/test')
      .then(({data}) => {
        console.log(data)
      })
      .catch(() => {})
  }, [])  
  return (
    <>
      <div className="login w-1/4 m-auto border rounded-xl">
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
