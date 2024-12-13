import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { add_new_item } from "../Apis/feachApi";
import { useNavigate } from "react-router-dom";


function NewItem() {
  const [item, setItem] = useState({
    name: "",
    description: "",
    price_per_day: "",
    quantity: "",
    image: "",
  });
  const navigate= useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };
    console.log(item);
    

    const { name, description, price_per_day, quantity, image } = item;
    if (!name || !description || !price_per_day || !quantity || !image) {
      toast.warning("Invalid input");
    } else {
      const formdata = new FormData();
      formdata.append("name", item.name);
      formdata.append("description", item.description);
      formdata.append("price_per_day", item.price_per_day);
      formdata.append("quantity", item.quantity);
      formdata.append("image", item.image);
      add_new_item(formdata, headers)
        .then((res) => {
          console.log(res.data);
          toast.success("Item added successfully!");
          navigate("/list-myitems")
        })
        
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Rental Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter item name"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter item description"
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price per Day</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price per day"
            value={item.price_per_day}
            onChange={(e) =>
              setItem({ ...item, price_per_day: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: e.target.value })}
          />
        </Form.Group>

        {/* New Image Field */}
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setItem({ ...item, image: e.target.files[0] })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </div>
  );
}

export default NewItem;
