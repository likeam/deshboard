import React, { useState } from "react";
import { useContext } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", 123);
      formData.append("phone", phone);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await axios
        .post("http://localhost:4000/api/v1/user/doctor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container add-doctor-form">
        <h1 className="form-title">Register a New Doctor</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div className="avatar">
              <img
                src={
                  docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"
                }
                alt="Doctor Avatar"
                className="avatar-img"
              />
              <label htmlFor="avatar" className="avatar-label">
                Upload Avatar
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleAvatar}
                className="avatar-input"
              />
              <input 
                type="text" 
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}  
                className="input-field"
              />
              <input 
                type="text" 
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
                />
                <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                />
                <input 
                type="text" 
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-field"
                />
                <input 
                type="text" 
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="input-field"
                />
                <input 
                type="text" 
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="input-field"
                />
                <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                />
                <select 
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select 
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((department) => (
                    <option value={department} key={department}>
                      {department}
                    </option>
                  ))}
                </select>
                <button type="submit" className="submit-btn">Register New Doctor</button>


            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;
