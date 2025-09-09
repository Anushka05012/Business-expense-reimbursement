// import React, { useState } from 'react';
// import axios from 'axios';

// function LoginForm({ onLoginSuccess }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('role', res.data.role);
//       onLoginSuccess(res.data.role);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{color: 'red'}}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label><br />
//           <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password:</label><br />
//           <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//         </div><br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;

import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      onLoginSuccess(res.data.role);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container fluid className="vh-100" style={{ background: "#4d6cfb" }}>
      <Row className="h-100 align-items-center">
        <Col md={6} className="d-none d-md-block">
          <div className="text-white px-5">
            <h1 className="mb-3">Business Reimbursement portal </h1>
            <h3>We make expense Reimbursement easy</h3>
            <p>

            </p>
          </div>
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow" style={{ maxWidth: 400, margin: "auto" }}>
            <h4 className="mb-4 text-center">Sign in</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Keep me logged in" />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Log in now
              </Button>
              <div className="mt-3 d-flex justify-content-between">
<a href="/forgot-password">Forgot password</a>
              </div>
              <hr />
            </Form>
            {error && <div className="text-danger mt-2">{error}</div>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
