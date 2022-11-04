import { React, useState, useEffect } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import axios from '../api/axios'
import { saveAs } from 'file-saver'
import useAuth from '../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky, faListNumeric } from '@fortawesome/free-solid-svg-icons'


import useAxiosPrivate from "../hooks/useAxiosPrivate";

import { useNavigate, useLocation } from "react-router-dom";


import './Document.css'


const DATA_URL = '/klausulnine'


const Document = () => {


    // test fitur baru

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [documents, setDocuments] = useState();


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDokumen = async () => {
            try {
                const response = await axiosPrivate.get('/klausul9', {
                    signal: controller.signal
                }).then((res) => {
                    const pdfBlob = new Blob([res.data], { type: 'application/pdf' }); //type: "text/plain;charset=utf-8"} { type: 'application/pdf' }
                    console.log(pdfBlob);
                    saveAs(pdfBlob, 'newKlausul9.pdf')
                })
                console.log(response.data);
                isMounted && setDocuments(response.data);
            } catch (err) {
                console.error(err);
                navigate('/document', { state: { from: location }, replace: true });
            }
        }





        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])





    const [errMsg, setErrMsg] = useState("");
    const { auth } = useAuth();
    const [name, setName] = useState("");
    const [receiptId, setReceiptId] = useState("")
    const [price1, setPrice1] = useState("")
    const [price2, setPrice2] = useState("")



    useEffect(() => {
        setErrMsg("");
    }, [name, receiptId, price1, price2]);

    const createAndDownloadPdf = async (e) => {
        e.preventDefault();
        const at = (auth?.accessToken)
        axios.post('/klausul9',
            JSON.stringify({ name, receiptId, price1, price2 }),
            {
                headers: {
                    Authorization: `Bearer ${at}`
                }
            }
        )
            .then(() => axios.get('/klausul9', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.body], { type: 'application/pdf' });
                console.log(pdfBlob);
                saveAs(pdfBlob, 'newPdf.pdf')
            })
    }

    let isMounted = true;
    const controller = new AbortController();
    const getDokumen = async () => {
        try {
            const response = await axiosPrivate.get('/klausulnine', {
                signal: controller.signal
            }).then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' }); //type: "text/plain;charset=utf-8"} { type: 'application/pdf' }
                saveAs(pdfBlob, 'newKlausul9.pdf')
                console.log(pdfBlob);
            })
            console.log(response.data);
            isMounted && setDocuments(response.data);
        } catch (err) {
            console.error(err);
            navigate('/document9', { state: { from: location }, replace: true });
        }
    }


    const handleDownload = async () => {

        const at = (auth?.accessToken)

        try {
            const response = await axios.get(
                DATA_URL,
                {
                    headers: {
                        Authorization: `Bearer ${at}`,
                    },

                }
            ).then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' }); //type: "text/plain;charset=utf-8"} { type: 'application/pdf' }
                console.log(pdfBlob);
                saveAs(pdfBlob, 'newPdf.pdf')
            })

            console.log(response);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Input data Failed");
            }
            console.log(err);
            // errRef.current.focus();
        }



    }


    const handleSubmit = async (e) => {
        e.preventDefault();


        // const at = (auth?.accessToken)


        try {
            const response = await axiosPrivate.post(
                DATA_URL,
                JSON.stringify({ name, receiptId, price1, price2 }),//data.img baseFile

                {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${at}`,
                    },
                    withCredentials: true,
                }
            ).then(getDokumen)

            //  .then(handleDownload)//tadinya pake ini



            // .then((res) => {
            //     const pdfBlob = new Blob([res.body], { type: 'application/pdf' });
            //     console.log(pdfBlob);
            //     saveAs(pdfBlob, 'newPdf.pdf')
            // })

            // const pdfBlob = new Blob([response?.data], { type: 'application/pdf' });
            // console.log(pdfBlob);
            // saveAs(pdfBlob, 'newPdf.pdf')


            console.log(JSON.stringify(response?.data));
            console.log(response?.data);


            // TODO: remove console.logs before deployment
            //console.log(JSON.stringify(response))


        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                setErrMsg("Username Taken");
            } else {
                setErrMsg("Input data Failed");
            }
            console.log(err);
            // errRef.current.focus();
        }



    };


    return (
        <>
            <div className="main">
                <Topbar />

                <div className="details details-dokumen">
                    {/* detail list */}
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h2>Halaman Klausul 9</h2>
                        </div>
                        <div className="form-container">
                            <div className="form-input">
                                <form className='dokumen'>
                                    <div className="">

                                        <div className="input-field input-dokumen">
                                            <div className="">
                                                <FontAwesomeIcon icon={faNoteSticky} className='icon' />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Nama Perusahaan"
                                                id="name"
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="">

                                        <div className="input-field input-dokumen">
                                            <div className="">
                                                <FontAwesomeIcon icon={faListNumeric} className='icon' />
                                            </div>
                                            <input
                                                type="number"
                                                name="receiptId"
                                                placeholder="No Rev"
                                                className="form-control"
                                                id="receiptId"
                                                onChange={(e) => setReceiptId(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="">

                                        <div className="input-field input-dokumen">
                                            <div className="">
                                                <FontAwesomeIcon icon={faListNumeric} className='icon' />
                                            </div>
                                            <input
                                                type="number"
                                                name="price1"
                                                placeholder="No Dok"
                                                className="form-control"
                                                id="price1"
                                                onChange={(e) => setPrice1(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-field input-dokumen">
                                            <div className="">
                                                <FontAwesomeIcon icon={faListNumeric} className='icon' />
                                            </div>
                                            <input
                                                type="number"
                                                name="price2"
                                                placeholder="Hal"
                                                className="form-control"
                                                id="price2"
                                                onChange={(e) => setPrice2(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="">

                                        <div className="">

                                        </div>
                                    </div>





                                    <div className="btn-container">


                                        <button onClick={handleSubmit} className="btn klausul">
                                            Create PDF
                                        </button>



                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="recentCustomers">
                        <img src="img/klausul9.svg" className="image" alt="" />
                    </div>
                </div>



            </div>
            <Sidebar />
            <div className="footer">Copyright &copy; 2022 Tim UG. All rights reserved.</div>
        </>
    )
}

export default Document