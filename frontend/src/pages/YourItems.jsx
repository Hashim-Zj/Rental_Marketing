import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { list_my_items } from "../Apis/feachApi";

const YourItems = () => {
  const [rentalItems, setRentalItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentalItems = async () => {
      try {
        const headers = {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        };

        const response = await list_my_items(headers);
        setRentalItems(response.data);
      } catch (error) {
        console.error("Error fetching rental items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalItems();
  }, []);

  const handleAddNewItem = () => {
    navigate("/add-new-item");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rental-items-page">
      <div className="header">
        <h2>My Rental Items</h2>
        <button className="add-button" onClick={handleAddNewItem}>
          Add New Item
        </button>
      </div>

      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price/Day</th>
              <th>Quantity</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {rentalItems.length > 0 ? (
              rentalItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price_per_day}</td>
                  <td>{item.quantity}</td>
                  <td>{item.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No rental items found. Click "Add New Item" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourItems;
