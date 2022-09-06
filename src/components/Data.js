import React, { useState, useEffect } from "react";
import './Data.css';
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import useAuth from '../hooks/useAuth';
import axios from "../api/axios";
import InputFile from "./InputFile";


const DATA_URL = "/data";

const Data = () => {
  const [inputs, setInputs] = useState({
    namaPerusahaan: "",
    topManagement: "",
    logo: "",
  });

  const [data, setData] = useState({
    namaPerusahaan1: "",
    namaManagement: "",
    img: "",

  });

  const handleInputState = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const { auth } = useAuth();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleInput = (value, key) => {
    const newInputs = { ...inputs };

    newInputs[key] = value;

    setInputs(newInputs);
  };

  const [companyname, setCompanyname] = useState("");
  const [managementname, setManagementname] = useState("");
  const [baseFile, setBaseFile] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [companyname, managementname]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const at = (auth?.accessToken)
    setBaseFile(data.img)



    try {
      const response = await axios.post(
        DATA_URL,
        JSON.stringify({ companyname, managementname, baseFile }),//data.img baseFile
        // {
        //   companyname: companyname,
        //   managementname: managementname,
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${at}`,
          },

          // withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setInputs("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Input data Failed");
      }

      // errRef.current.focus();
    }



  };





  const handleReset = (e) => {
    e.preventDefault();
  };







  return (
    <>
      <div className="main">
        <Topbar />

        <div className="details details-dokumen">
          {/* detail list */}
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Form Input Data</h2>

            </div>
            <div className="form-input" style={{ margin: "0 !important" }}>
              <form onSubmit={handleSubmit} onReset={handleReset} className="dokumen">
                <div className="">
                  <label
                    htmlFor="nama-perusahaan"
                    className=""
                  >
                    Nama Perusahaan
                  </label>
                  <div className="input-field input-dokumen">
                    <div className=""></div>
                    <input
                      type="text"
                      name="namaPerusahaan"
                      className="form-control"
                      placeholder="Nama Perusahaan"
                      id="nama-perusahaan"
                      required
                      // value={inputs.namaPerusahaan}
                      onChange={(e) =>
                        setCompanyname(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="top-management"
                    className=""
                  >
                    Top Management
                  </label>
                  <div className="input-field input-dokumen">
                    <div className=""></div>
                    <input
                      type="text"
                      name="topManagement"
                      placeholder="Nama Manajemen"
                      className="form-control"
                      id="top-management"
                      required
                      // value={inputs.topManagement}
                      onChange={(e) =>
                        setManagementname(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="upload-container">

                  <div className="input-upload">
                    <InputFile
                      name="img"
                      label="Choose File"
                      handleInputState={handleInputState}
                      type="image"
                      value={data.img}

                    />
                  </div>
                </div>





                <div className="btn-container">


                  <button
                    type="submit"
                    className="btn btn-primary btn-simpan data"
                  >
                    Simpan
                  </button>
                  <button
                    type="reset"
                    className="btn btn-danger ms-2 btn-batal data"
                  >
                    Batal
                  </button>

                </div>
              </form>
            </div>
          </div>
          <div className="recentCustomers">
            <img src="img/iconDok2.svg" className="image" alt="" />
          </div>
        </div>
      </div>

      <Sidebar />
    </>
  );
};

export default Data;
