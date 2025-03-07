import React, { useState } from "react";

const UpdateLeadModal = ({
  name,
  email,
  company,
  stage,
  lastContacted,
  engaged,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [lead, setLead] = useState({
    name: name,
    email: email,
    company: company,
    stage: stage,
    lastContacted: lastContacted,
    engaged: engaged,
  });

  const [showConfirm, setShowConfirm] = useState(false); // Show confirmation modal

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLead((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(lead); // Update lead data
    onClose();
  };

  const handleDelete = () => {
    onDelete(); // Call delete action
    setShowConfirm(false);
    onClose();
  };

  if (!isOpen) return null; // Hide modal if not open

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-content">
        <h2>Update Lead</h2>
        <form onSubmit={handleSubmit} className="update-form-container">
          <div className="update-form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={lead.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={lead.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-form-group">
            <label>Company:</label>
            <input
              type="text"
              name="company"
              value={lead.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-form-group">
            <label>Stage:</label>
            <input
              type="number"
              name="stage"
              value={lead.stage}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="update-form-group">
            <label>Last Contacted:</label>
            <input
              type="date"
              name="lastContacted"
              value={lead.lastContacted}
              onChange={handleChange}
            />
          </div>

          <div className="update-form-group update-checkbox-group">
            <label>Engaged:</label>
            <input
              type="checkbox"
              name="engaged"
              checked={lead.engaged}
              onChange={handleChange}
            />
          </div>

          <div className="update-modal-actions">
            <button type="submit" className="update-btn update-update-btn">
              Update
            </button>
            <button
              type="button"
              className="update-btn update-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="update-btn update-delete-btn"
              onClick={() => setShowConfirm(true)}
            >
              Delete
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="update-confirm-overlay">
          <div className="update-confirm-box">
            <p>Are you sure you want to delete this lead?</p>
            <button
              className="update-btn update-delete-btn confirm-delete-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="update-btn update-cancel-btn"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateLeadModal;
