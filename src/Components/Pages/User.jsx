import React, { useEffect, useState } from "react";
import "../../Assets/Styles/User.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BaseURL from "../../common/Api";
import { MdAdd, MdEmail, MdPhone, MdPerson, MdBadge, MdEdit, MdDelete } from "react-icons/md";
import ConfirmModal from "../common/ConfirmModal";

// User component to display and manage user data
const User = ({ location }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch user data on component mount and whenever data changes
  useEffect(() => {
    getData();
  }, []);

  // Trigger the confirmation modal
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  // Execute the actual deletion after confirmation
  const executeDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.get(`${BaseURL}/user/deleteuser/${deleteId}`);
      getData();
    } catch (err) {
      console.log("Error deleting user:", err);
    } finally {
      setDeleteId(null);
    }
  };

  // Fetch user data from the API
  const getData = async () => {
    try {
      setLoader(true);
      const result = await axios.get(`${BaseURL}/user/getuser`);
      setData(result.data.data); // Use result.data.data to access the array of users
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  // React Router hook for navigation
  const navigate = useNavigate();

  return (
    <div className="usr-root">

      {/* ── Page Header ── */}
      <div className="usr-page-header">
        <div>
          <h1 className="usr-page-title">Manage Users</h1>
          <p className="usr-page-sub">View, edit, and manage system operators</p>
        </div>
        <button
          className="usr-btn-add"
          onClick={() => navigate("/createuser")}
        >
          <MdAdd style={{ fontSize: "1.2rem" }} /> Add New User
        </button>
      </div>

      {/* ── Grid Layout ── */}
      <div className="usr-wrapper">

        {loader && (
          <div className="usr-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
              <div key={skeleton} className="usr-card skeleton-card">
                <div className="usr-card-banner skeleton-pulse" style={{ background: '#e2e8f0' }} />
                <div className="usr-card-content">
                  <div className="usr-avatar-wrap">
                    <div className="usr-avatar skeleton-pulse" style={{ background: '#cbd5e1', border: 'none' }} />
                    <div className="usr-name-wrap" style={{ width: '100%' }}>
                      <div className="skeleton-line" style={{ width: '70%', height: '18px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }}></div>
                      <div className="skeleton-line" style={{ width: '40%', height: '12px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  <div className="usr-info-list" style={{ marginTop: '16px' }}>
                    <div className="usr-info-item">
                      <div className="skeleton-pulse" style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }}></div>
                      <div className="skeleton-line" style={{ width: '80%', height: '14px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    </div>
                    <div className="usr-info-item">
                      <div className="skeleton-pulse" style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e2e8f0', flexShrink: 0 }}></div>
                      <div className="skeleton-line" style={{ width: '60%', height: '14px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                </div>
                <div className="usr-card-actions" style={{ padding: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' }}>
                  <div className="skeleton-line" style={{ flex: 1, height: '36px', background: '#e2e8f0', borderRadius: '8px' }}></div>
                  <div className="skeleton-line" style={{ flex: 1, height: '36px', background: '#e2e8f0', borderRadius: '8px' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loader && data.length > 0 && (
          <div className="usr-grid">
            {data.map((user) => (
              <div key={user._id} className="usr-card">
                <div className="usr-card-banner" />

                <div className="usr-card-content">

                  {/* Top: Avatar & Role */}
                  <div className="usr-avatar-wrap">
                    <div className="usr-avatar">
                      {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="usr-name-wrap">
                      <h3 className="usr-name">{user.firstName} {user.lastName}</h3>
                      <span className="usr-role">{user.userType || "Operator"}</span>
                    </div>
                  </div>

                  {/* Info list */}
                  <div className="usr-info-list">
                    <div className="usr-info-item">
                      <MdEmail className="usr-ii-icon" />
                      <span className="usr-ii-val">{user.email || "—"}</span>
                    </div>
                    <div className="usr-info-item">
                      <MdPhone className="usr-ii-icon" />
                      <span className="usr-ii-val">{user.mobile || "—"}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="usr-card-actions">
                  <button
                    className="usr-btn usr-btn--edit"
                    onClick={() => navigate(`/edituser/${user._id}`)}
                  >
                    <MdEdit /> Edit
                  </button>
                  <button
                    className="usr-btn usr-btn--delete"
                    onClick={() => confirmDelete(user._id)}
                  >
                    <MdDelete /> Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loader && data.length === 0 && (
          <div className="usr-empty">
            <div className="usr-empty-icon"><MdPerson /></div>
            <p>No users found in the system.</p>
          </div>
        )}

      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteId !== null}
        title="Confirm User Deletion"
        message="Are you sure you want to permanently delete this user? This action cannot be easily undone and revokes all their access."
        confirmText="Yes, Delete User"
        cancelText="Cancel"
        onConfirm={executeDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default User;
