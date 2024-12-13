import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { add_addresses } from "../Apis/feachApi";

function AddAddress({ id }) {
  const [newaddress, setAddress] = useState({
    address: "",
    pin_code: "",
    mobile_number: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  console.log(newaddress);
  

  const formSubmit = () => {
    const validateForm = () => {
      const { address, pin_code, mobile_number } = newaddress;
      if (!address.trim()) {
        toast.warning("Address is required.");
        return false;
      }
      if (!/^[1-9][0-9]{5}$/.test(pin_code)) {
        toast.warning("Invalid Pin Code.");
        return false;
      }
      if (!/^[6-9][0-9]{9}$/.test(mobile_number)) {
        toast.warning("Invalid Mobile Number.");
        return false;
      }
      return true;
    };
    if (!validateForm()){
       return;
    }

    const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
    if (!token) {
      toast.error("User is not authenticated.");
      return;
    }

    const headers = {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    };

    add_addresses(newaddress, headers)
      .then((res) => {
        console.log(res.data);
        toast.success("Address Added Successfully");
        setAddress({ address: "", pin_code: "", mobile_number: "" });
        handleClose();
      })
      .catch((err) => {
        console.error("Error adding address:", err);
        toast.error("Failed to add address. Try again.");
      });
  };

  return (
    <div>
      <button className="btn btn-success m-5" onClick={handleShow}>
        Add Address
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel
            controlId="floatingAddress"
            label="Address"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Enter your address"
              name="address"
              value={newaddress.address}
              onChange={handleInputChange}
              style={{ height: "100px" }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPinCode"
            label="Pin Code"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter your pin code"
              name="pin_code"
              value={newaddress.pin_code}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingMobileNumber"
            label="Mobile Number"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Enter your mobile number"
              name="mobile_number"
              value={newaddress.mobile_number}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddAddress;
