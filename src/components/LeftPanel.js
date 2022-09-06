import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';




// const signUpMode = () => {
//     const container = document.querySelector(".container");
//     container.classList.add("sign-up-mode");
// }
// const signInMode = () => {
//     const container = document.querySelector(".container");
//     container.classList.remove("sign-up-mode");
// }


const LeftPanel = () => {

    const [modeHandle, setModeHandle] = useState('');


    const handleModeSignIn = () => {
        const container = document.querySelector(".container");

        setModeHandle(container.classList.add("sign-up-mode"))
    }
    const handleModeSignUp = () => {
        const container = document.querySelector(".container");

        setModeHandle(container.classList.remove("sign-up-mode"))
    }



    return (
        <div className="panels-container">

            <div className="panel left-panel">

                <div className="content">
                    <h3>Aplikasi Penyusunan Dokumen </h3>
                    <h3>Sistem Manajemen Energi</h3>
                    <p>

                    </p>

                    <button className="btn transparent" id="sign-up-btn" onClick={handleModeSignIn}>
                        {/* <Link to="/register" className='link'>Sign Up</Link> */} Daftar
                    </button>
                </div>
                <img src="img/res3.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
                <div className="content">
                    <h3>Sudah punya akun ?</h3>
                    <p>
                        Login sekarang!!!
                    </p>
                    <button className="btn transparent" id="sign-in-btn" onClick={handleModeSignUp}>
                        Masuk
                    </button>
                </div>
                <img src="img/register.svg" className="image" alt="" />
            </div>
        </div>
    )
}

export default LeftPanel