import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Dashboard = () => {


    const [appointments, setAppointments] = useState([])
    const {isAuthenticated, setIsAuthenticated} = useContext(Context);

    if(!isAuthenticated) {
        return <Navigate to ={"/login"} />;
    }

    return (
        
            <section className=" dashboard page">
                <div className="banner">
                    <div className="firstBox">
                        <img src="../assets/logo.png" alt="" />
                        <div className="content">
                            <div>
                                <p>Hello ,</p>
                                <h5>Abdul Rhehman</h5>
                            </div>
                            Abdul Rehman Welcome to our Health Care Dashboard You can manage
                            everthing here.
                        </div>
                    </div>
                    <div className="secondBox">
                        <p>Total Appointments</p>
                        <h3>200</h3>
                    </div>
                    <div className="thirdBox">
                        <p>Registered Doctors</p>
                        <h3>7</h3>
                    </div>
                </div>
                <div className="banner">
                    <h5>Appointments</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Departments</th>
                                <th>Status</th>
                                <th>Visited</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </section>
        
    );
};

export default Dashboard;
