import React from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouseChimney,
  faEnvelope,
  faRightFromBracket,
  faBook,
  faUpload
} from "@fortawesome/free-solid-svg-icons";

import useLogout from "../hooks/useLogout";

import { NavLink, useNavigate } from "react-router-dom";


import Swal from 'sweetalert2';



const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {

    Swal.fire({
      title: 'Logout!',
      text: 'Apakah anda yakin ingin keluar',
      icon: 'info',
      confirmButtonText: 'Yes',
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Logout Berhasil!', '', 'success')
        await logout();
        navigate("/");
      }
    })


  };

  return (
    <>
      <div className="navigation">
        <ul>
          <li className="list">
            <NavLink exact to="logo" activeClassName="active">
              <b></b>
              <b></b>

              <span className="titlesLogo">
                Penyusunan Dokumen Sistem Manajemen Energi
              </span>
              <div className="imgBx">
                <img src="img/LOGO_GUNDAR.png" alt="" />
              </div>
            </NavLink>
          </li>
          <li className="list">
            <NavLink exact to="/dashboard" activeClassName="active">
              <b></b>
              <b></b>
              <span className="icon">
                <FontAwesomeIcon icon={faHouseChimney} className="icd" />
              </span>
              <span className="titles">Dashboard</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink exact to="/profile" activeClassName="active">
              <b></b>
              <b></b>
              <span className="icon">
                <FontAwesomeIcon icon={faUser} className="icd" />
              </span>
              <span className="titles">Akun</span>
            </NavLink>
          </li>
          {/* <li className="list">
            <NavLink exact to="/email" activeClassName="active">
              <b></b>
              <b></b>
              <span className="icon">
                <FontAwesomeIcon icon={faUpload} className="icd" />
              </span>
              <span className="titles">Data</span>
            </NavLink>
          </li> */}
          <li className="list">
            <NavLink exact to="/document8" activeClassName="active">
              <b></b>
              <b></b>
              <span className="icon">
                <FontAwesomeIcon icon={faBook} className="icd" />
              </span>
              <span className="titles">Klausul 8</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink exact to="/document9" activeClassName="active">
              <b></b>
              <b></b>
              <span className="icon">
                <FontAwesomeIcon icon={faBook} className="icd" />
              </span>
              <span className="titles">Klausul 9</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              onClick={signOut}
            >
              <b></b>
              <b></b>
              <span className="icon">
                <FontAwesomeIcon icon={faRightFromBracket} className="icd" />
              </span>
              <span className="titles">Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
