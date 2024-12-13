import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function EditItem() {
  const { id } = useParams(); // Get item ID from the route
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    description: "",
    price_per_day: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const headers = {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `http://127.0.0.1:8000/rental-items/${id}/`,
          { headers }
        );
        setItem(response.data); // Populate form with item details
      } catch (error) {
        console.error("Error fetching item details:", error);
        toast.error("Failed to load item details.");
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    try {
      await axios.put(`http://127.0.0.1:8000/rental-items/${id}/`, item, {
        headers,
      });
      toast.success("Item updated successfully!");
      navigate("/list"); // Redirect to the item list page
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex w-100 p-5 m-5 align-items-center justify-content-center">
      <div className="w-50 p-5">
        <h3>Edit Item</h3>
        <FloatingLabel controlId="floatingName" label="Name" className="mb-3">
          <Form.Control
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
          <Form.Control
            type="text"
            name="description"
            value={item.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPrice" label="Price Per Day" className="mb-3">
          <Form.Control
            type="number"
            name="price_per_day"
            value={item.price_per_day}
            onChange={handleChange}
            placeholder="Price Per Day"
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingQuantity" label="Quantity" className="mb-3">
          <Form.Control
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            placeholder="Quantity"
          />
        </FloatingLabel>
        <div className="mt-5 d-flex justify-content-center">
          <button
            className="btn btn-primary me-5"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
