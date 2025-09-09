import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

function ResetPasswordForm() {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${resetToken}`, { password });
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
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
            <h3>Reset Your Password</h3>
            <p>Enter a new password for your account.</p>
          </div>
        </Col>
        <Col md={6}>
          <Card className="p-4 shadow" style={{ maxWidth: 400, margin: "auto" }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPasswordForm;
