import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddNewAdmin = () => {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context)
  const navigateTo = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [nic, setNic] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')

  const handleNewAdmin = async (e) => {

    e.preventDefault();
    try {
      await axios.post(
        "https://localhost:4000/api/v1/user/admin",
        {firstName,  lastName,  email,  password,   phone,    nic,   dob,      gender },
        {          
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        toast.success(response.data.message);
        setIsAuthenticated(true);
        navigateTo("/")
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("") 
        setPhone("")
        setNic("")
        setDob("")
        setGender("")

      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
    
  }

if (!isAuthenticated) {
  return <Navigate to ={"/login"} />;
}

  return (
    <section className='page' >
      <section className='container form-component add-admin-form'>
        <h1 className='form-title'>Add New Admin</h1>
        <form onSubmit={handleNewAdmin}>
          <div className="form-row">
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
              type="number" 
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
            <input 
              type="number" 
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="input-field"
            />
            <input 
              type="date" 
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
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
            <input 
              type="text" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="form-row">
            <button type='submit'>ADD NEW ADMIN</button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default AddNewAdmin