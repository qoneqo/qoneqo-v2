import React, { useState } from 'react';
import Form from '../../../components/Form';
import { useNavigate } from 'react-router';

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
  });
  let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <>
      <div className="login w-1/4 m-auto border rounded-xl">
        <p className="text-xl text-center my-2">Login Page</p>
        <Form>
          <Form.Group>
            <Form.Input
              placeholder="Username"
              value={state.username}
              onChange={(e) =>
                setState((prev) => ({ ...prev, username: e.target.value }))
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
