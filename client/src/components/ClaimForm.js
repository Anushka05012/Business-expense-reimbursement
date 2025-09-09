import React, { useState } from 'react';
import axios from 'axios';

function ClaimForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    amount: '',
    vendor: '',
    reason: '',
  });
  const [invoice, setInvoice] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setInvoice(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!invoice) {
      setError('Please upload an invoice file.');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('invoice', invoice);

    try {
      const token = localStorage.getItem('token');
    //   const res = await axios.post('/api/claims/submit', data, {
    //     headers: { 
    //       'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${token}`,
    //     }
    //   });
const backendUrl = 'http://localhost:5000';
await axios.post(`${backendUrl}/api/claims/submit`, formData, {
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
});


      setMessage('Claim submitted successfully!');
      setFormData({ title: '', category: '', amount: '', vendor: '', reason: '' });
      setInvoice(null);
      e.target.reset();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting claim.');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2>Submit your expense claim for Reimbursement </h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input name="title" className="form-control" id="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input name="category" className="form-control" id="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" name="amount" className="form-control" id="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="vendor" className="form-label">Vendor</label>
          <input name="vendor" className="form-control" id="vendor" value={formData.vendor} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">Reason</label>
          <textarea name="reason" className="form-control" id="reason" value={formData.reason} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="invoice" className="form-label">Invoice Upload</label>
          <input type="file" name="invoice" className="form-control" id="invoice" onChange={handleFileChange} accept="image/*,application/pdf" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit Claim</button>
      </form>
    </div>
  );
}

export default ClaimForm;
