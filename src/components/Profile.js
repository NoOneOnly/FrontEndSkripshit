
import './Dashboard.css';
import './Profile.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { React, useState, useEffect } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";


import { useNavigate, useLocation, Navigate, NavLink } from "react-router-dom";
import { faHome } from '@fortawesome/free-solid-svg-icons';




const Profile = () => {





    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }

    }, [])




    return (
        <>

            <div className="main">
                <Topbar />

                {/* cards */}
                <div className="cardBox" id='profile'>

                    <NavLink exact to='/dashboard'>
                        <div className="card" >
                            <div>
                                <div className="numbers">Dashboard</div>
                                <div className="cardName">Kembali ke dashboard</div>
                            </div>
                            <div className="iconBx">
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                        </div>
                    </NavLink>
                </div>



                <div className="details">
                    {/* detail list */}
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h2>Akun User</h2>

                        </div>
                        <table >
                            <thead>
                                <tr>
                                    <td>Nama User</td>
                                    <td>Roles</td>
                                    <td>Status</td>
                                    <td>Aksi</td>
                                </tr>
                            </thead>
                            <tbody>

                                {users?.length
                                    ? (
                                        <>
                                            {
                                                users.map((user, i) =>
                                                    <tr>
                                                        <td key={i}><h4>{user?.username} <br /></h4></td>

                                                        <td key={i}>
                                                            {user?.roles?.User && <span className="status delivered">User</span>}
                                                            {user?.roles?.Admin && <span className="status return">Admin</span>}
                                                            {user?.roles?.Editor && <span className="status pending">Editor</span>}
                                                        </td>
                                                        <td>Active</td>

                                                        <td>
                                                            {user?.roles?.User && <span className="status delivered">User</span>}
                                                            {user?.roles?.Admin && <span className="status return">Admin</span>}
                                                            {user?.roles?.Editor && <span className="status pending">Editor</span>}
                                                        </td>

                                                    </tr>

                                                )
                                            }

                                        </>
                                    ) : <p>No users to display</p>
                                }


                                {/* <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status return">Return</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status return">Return</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status delivered">Delivered</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status inprogres">In Progres</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status delivered">Delivered</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>Start refrigrator</td>
                                    <td>$1200</td>
                                    <td>$Paid</td>
                                    <td><span className="status delivered">Delivered</span></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>

                    {/* New Customer */}
                    <div className="recentCustomers">
                        <div className="cardHeader">
                            <h2>Daftar Anggota</h2>
                        </div>
                        <table>
                            {/*   <li key={i}>{user?.username}</li> */}
                            {users?.length
                                ? (
                                    <>
                                        {
                                            users.map((user, i) =>

                                                <tr>
                                                    <td width="60px"><div className="imgBx"><img src="img/img1.jpg" /></div></td>
                                                    <td key={i}><h4>{user?.username} <br /><span>Active</span></h4></td>
                                                </tr>


                                            )
                                        }
                                    </>
                                ) : <p>No users to display</p>
                            }



                            {/* <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img2.jpg" /></div></td>
                                <td><h4>Muhammad <br /><span>India</span></h4></td>
                            </tr>
                            <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img3.jpg" /></div></td>
                                <td><h4>Amelia <br /><span>Italy</span></h4></td>
                            </tr>
                            <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img4.jpg" /></div></td>
                                <td><h4>Olivia <br /><span>Italy</span></h4></td>
                            </tr>
                            <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img5.jpg" /></div></td>
                                <td><h4>Amit <br /><span>Italy</span></h4></td>
                            </tr>
                            <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img6.jpg" /></div></td>
                                <td><h4>David <br /><span>Italy</span></h4></td>
                            </tr>
                            <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img7.jpg" /></div></td>
                                <td><h4>David <br /><span>Italy</span></h4></td>
                            </tr>
                            <tr>
                                <td width="60px"><div className="imgBx"><img src="img/img8.jpg" /></div></td>
                                <td><h4>David <br /><span>Italy</span></h4></td>
                            </tr> */}
                        </table>

                    </div>
                </div>

            </div>

            <Sidebar />
            <div className="footer" >Copyright &copy; 2022 Tim UG. All rights reserved.</div>
        </>
    )
}

export default Profile