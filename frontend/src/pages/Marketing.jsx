import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { rental_items } from "../Apis/feachApi";

function Marketing() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const headers = {
      "Authorization": `Token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    rental_items(headers)
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-3 mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>
                  <strong>₹{item.price_per_day} / day</strong>
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => navigate(`/rental-items/${item.id}`)}
                >
                  Rent Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marketing;
