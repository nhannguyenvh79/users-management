import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Header from "./components/Header";
import ListUsers from "./screens/ListUsers";
import { Route, Routes } from "react-router-dom";
import HomePage from "./screens/Home";
import LogIn from "./screens/Login";
import SignUp from "./screens/SignUp";

function App() {
    return (
        <div className="app-container">
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/userlist" element={<ListUsers />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </div>
    );
}

export default App;
