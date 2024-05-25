import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { TiHome } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logo.jpg";

const Sidebar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const sidbarRef = useRef(null);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoMessagesPage = () => {
    navigateTo("/messages");
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
  };
  const gotoHomePage = () => {
    navigateTo("/");
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
  };
  const gotoPatients = () => {
    navigateTo("/patients");
  };
  const gotoReceptionistsPage = () => {
    navigateTo("/receptionists");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidbarRef.current && !sidbarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav ref={sidbarRef} className={show ? "show sidbar " : "sidbar"}>
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="links">
          <div onClick={gotoHomePage}>
            <TiHome />
            <span>Home</span>
          </div>
          <div onClick={gotoDoctorsPage}>
            <FaUserDoctor />
            <span>Doctors</span>
          </div>
          <div onClick={gotoAddNewAdmin}>
            <MdAddModerator />
            <span>Add New Admin</span>
          </div>
          <div onClick={gotoAddNewDoctor}>
            <IoPersonAddSharp />
            <span> Add New Doctor</span>
          </div>
          <div onClick={gotoPatients}>
            <BsPeopleFill />
            <span>Patients</span>
          </div>
          <div onClick={gotoReceptionistsPage}>
            <HiUserGroup />
            <span>Receptionists</span>
          </div>
          <div onClick={gotoMessagesPage}>
            <AiFillMessage />
            <span>Messages</span>
          </div>
          <div onClick={handleLogout}>
            <RiLogoutBoxFill />
            <span>Logout</span>
          </div>
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
