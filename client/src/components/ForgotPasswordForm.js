import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="vh-100" style={{ background: "#4d6cfb" }}>
      <Row className="h-100 align-items-center">
        <Col md={6} className="d-none d-md-block">
          <div className="text-white px-5">
            <h1 className="mb-3">Business Reimbursement portal </h1>
            <h3>Reset your password</h3>
            <p>Enter your email and we'll send you a link to reset your password.</p>
          </div>
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow" style={{ maxWidth: 400, margin: "auto" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? "Sending..." : "Send Reset Email"}
              </Button>
            </Form>
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPasswordForm;
