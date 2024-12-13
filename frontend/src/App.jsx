import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeroSection from "./components/HeroSection";
import InfoSections from "./components/InfoSections";
import HeroNavbar from "./components/HeroNavbar";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BookItemPage from "./pages/BookItemPage";
import Header from "./components/Header";
import Marketing from "./pages/Marketing";
import EditItem from "./pages/EditItem";
import Profile from "./pages/Profile";
import YourItems from "./pages/YourItems";
import NewItem from "./pages/NewItem";

const Home = () => (
  <>
    <HeroNavbar />
    <HeroSection />
    <InfoSections />
    <Footer />
  </>
);

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<Marketing />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/list-myitems" element={<YourItems />} />
        <Route path="/add-new-item" element={<NewItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />
        {/* <Route path="/rental-items/:id" element={<Det />} /> */}
        <Route path="/book-item" element={<BookItemPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
