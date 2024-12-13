import React from "react";
import { Container, Button } from "react-bootstrap";
import heroImage from "./../assets/images/Marketing_hero.jpg";

const HeroSection = ({ isLoggedIn }) => {
  return (
    <div className="mt-5 pt-5"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "93vh",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container className="">
        <h2 style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
          Your Leasing Solution <br />
          In <b>Marketing</b>
        </h2>
        <p>Streamline your rentals with our platform.</p>
        <Button variant="primary" size="lg">
          {isLoggedIn ? "Get Started" : "Register Now"}
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;
