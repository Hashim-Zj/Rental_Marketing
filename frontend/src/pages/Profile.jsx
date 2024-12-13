import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, FloatingLabel } from "react-bootstrap";
import {
  user_addresses,
  update_address,
  user_data,
  update_user,
} from "../Apis/feachApi";
import profile from "../assets/images/profile.jpeg";
import AddAddress from "./AddAddresse";

function Profile() {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateAddress, setUpdateAddress] = useState({
    address: "",
    pin_code: "",
    mobile_number: "",
  });
  const [updateValidationErrors, setUpdateValidationErrors] = useState({});

  useEffect(() => {
    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    user_data(headers)
      .then((res) => {
        const userData = Array.isArray(res.data) ? res.data[0] : res.data;
        setUser(userData);
        setEditUser(userData); // Initialize editUser state
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, []);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    setValidationErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateModalShow = (id) => {
    setUpdateAddress(addresses.find((addr) => addr.id === id)); // Pre-fill the form
    setShowUpdateModal(true);
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
    setUpdateValidationErrors({});
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateUpdateForm = () => {
    const errors = {};
    if (!updateAddress.address) errors.address = "Address is required.";
    if (!updateAddress.pin_code) errors.pin_code = "Pin Code is required.";
    if (!updateAddress.mobile_number)
      errors.mobile_number = "Mobile Number is required.";
    setUpdateValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  console.log(editUser);

  const validateForm = () => {
    const errors = {};
    if (!editUser.username) errors.username = "Username is required.";
    if (!editUser.email) errors.email = "Email is required.";
    if (!editUser.password) errors.password = "Password is required.";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateForm()) return;

    // API call to update user data
    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    update_user(editUser, editUser.id, headers)
      .then(() => {
        setUser(editUser);
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating user details:", error));
  };

  useEffect(() => {
    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    user_addresses(headers)
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  const handleUpdateAddress = () => {
    if (!validateUpdateForm()) return;

    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    update_address(updateAddress, updateAddress.id, headers)
      .then(() => {
        user_addresses(headers)
          .then((response) => setAddresses(response.data))
          .catch((error) => console.error("Error fetching addresses:", error));
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error updating address:", error));
  };

  return (
    <div className="profile-page container my-5 mt-5">
      <div className="profile-header d-flex align-items-center">
        <div className="profile-pic ms-5 mt-5">
          <img src={profile} alt="Profile" className="rounded-circle" />
        </div>
        <div className="profile-info ms-4 mt-5">
          <table>
            <tbody>
              <tr>
                <td>
                  <b>UserName:</b>
                </td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>
                  <b>Email:</b>
                </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>
                  <b>Password:</b>
                </td>
                <td>
                  {"*".repeat(
                    Math.min(user.password ? user.password.length : 0, 10)
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <Button variant="primary" onClick={handleModalShow}>
            Edit Profile
          </Button>
        </div>
      </div>
      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingName"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                name="username"
                value={editUser.username || ""}
                onChange={handleInputChange}
              />
              {validationErrors.username && (
                <Form.Text className="text-danger">
                  {validationErrors.username}
                </Form.Text>
              )}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={editUser.email || ""}
                onChange={handleInputChange}
              />
              {validationErrors.email && (
                <Form.Text className="text-danger">
                  {validationErrors.email}
                </Form.Text>
              )}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={editUser.password || ""}
                onChange={handleInputChange}
              />
              {validationErrors.password && (
                <Form.Text className="text-danger">
                  {validationErrors.password}
                </Form.Text>
              )}
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Address List */}

      <div className="address-section mt-5">
        <h4 className="text-center">My Addresses</h4>
        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Address</th>
                <th>Pin Code</th>
                <th>Mobile Number</th>
                <th>Default</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {addresses.map((address) => (
                <tr key={address.id}>
                  <td>{address.address}</td>
                  <td>{address.pin_code}</td>
                  <td>{address.mobile_number}</td>
                  <td>
                    {address.default ? (
                      <span style={{ color: "green" }}>✔️</span>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleUpdateModalShow(address.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddAddress id={user.id} />
      </div>

      {/* // Update Address Modal */}

      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingAddress"
              label="Address"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={updateAddress.address || ""}
                onChange={handleUpdateInputChange}
              />
              {updateValidationErrors.address && (
                <Form.Text className="text-danger">
                  {updateValidationErrors.address}
                </Form.Text>
              )}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPinCode"
              label="Pin Code"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Pin Code"
                name="pin_code"
                value={updateAddress.pin_code || ""}
                onChange={handleUpdateInputChange}
              />
              {updateValidationErrors.pin_code && (
                <Form.Text className="text-danger">
                  {updateValidationErrors.pin_code}
                </Form.Text>
              )}
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingMobileNumber"
              label="Mobile Number"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Mobile Number"
                name="mobile_number"
                value={updateAddress.mobile_number || ""}
                onChange={handleUpdateInputChange}
              />
              {updateValidationErrors.mobile_number && (
                <Form.Text className="text-danger">
                  {updateValidationErrors.mobile_number}
                </Form.Text>
              )}
            </FloatingLabel>
            <Form.Check
              type="checkbox"
              label="Set as Default Address"
              checked={updateAddress.default || false}
              onChange={(e) =>
                setUpdateAddress((prevState) => ({
                  ...prevState,
                  default: e.target.checked,
                }))
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateAddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
