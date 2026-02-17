import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Genarate from "./pages/Generate";
import MyGenarations from "./pages/MyGenarations";
import YtPreview from "./pages/YtPreview";
import Login from "./components/Login";

export default function App() {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<Genarate />} />
                <Route path="/generate/:id" element={<Genarate />} />
                <Route path="/my-generations" element={<MyGenarations />} />
                <Route path="/preview" element={<YtPreview />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </>
    );
}