import Dashboard from "./components/Dashboard";
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import "./App.css";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import Paitents from "./components/Paitents";
import Receptionists from "./components/Receptionists";
import { ToastContainer } from'react-toastify';

export default function App() {
  return (
    
     <Router>
        <Sidebar />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctor/addnew" element={<AddNewDoctor />} />
            <Route path="/admin/addnew" element={<AddNewAdmin />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/patients" element={<Paitents />} />
            <Route path="/receptionists" element={<Receptionists />} />
        </Routes>
        <ToastContainer position="top-center" />
     </Router>
  );
}
