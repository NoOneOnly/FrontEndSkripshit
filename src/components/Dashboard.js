
import React from 'react'
import './Dashboard.css';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import VerticalChart from './VerticalChart';
import PolarAreaChart from './PolarAreaChart';
import { NavLink } from 'react-router-dom';
import { faBook, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {


    return (
        <>

            <div className="main">
                <Topbar />

                {/* cards */}
                <div className="cardBox">
                    <NavLink exact to='/profile'>
                        <div className="card">
                            <div>
                                <div className="numbers">Info Akun</div>
                                <div className="cardName">Profile</div>
                            </div>
                            <div className="iconBx">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </div>
                    </NavLink>


                    <NavLink exact to='/document8'>
                        <div className="card">
                            <div>
                                <div className="numbers">Klausul 8</div>
                                <div className="cardName">Dokumen</div>
                            </div>
                            <div className="iconBx">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink exact to='/document9'>
                        <div className="card">
                            <div>
                                <div className="numbers">Klausul 9</div>
                                <div className="cardName">Dokumen</div>
                            </div>
                            <div className="iconBx">
                                <FontAwesomeIcon icon={faBook} />
                            </div>
                        </div>
                    </NavLink>
                    <NavLink exact to='/email'>
                        <div className="card">
                            <div>
                                <div className="numbers">Logout</div>
                                <div className="cardName"></div>
                            </div>
                            <div className="iconBx">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </div>
                        </div>
                    </NavLink>
                </div>

                {/* Charts */}
                <div className="graphBox">
                    <div className="box"><PolarAreaChart /></div>
                    <div className="box"><VerticalChart /></div>
                </div>





            </div>

            <Sidebar />
            <div className="footer">Copyright &copy; 2022 Tim UG. All rights reserved.</div>


        </>
    )
}

export default Dashboard