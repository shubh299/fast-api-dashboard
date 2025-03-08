import React, { useState } from "react";
import { add_lead } from "../apiService";

const AddLeadModal = ({ isOpen, onClose }) => {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    company: "",
    stage: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add_lead(lead.name, lead.email, lead.company, lead.stage).catch((err) => {
      console.log(err);
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Lead</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={lead.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={lead.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={lead.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stage:</label>
            <input
              type="number"
              name="stage"
              value={lead.stage}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="submit-btn add-lead-submit">
              Add Lead
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
