import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import LeftPanel from "./LeftPanel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
import Register from "./Register2";

const LOGIN_URL = "/auth";

// js cookie

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log("ini roles", JSON.stringify(response?.data.roles));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, roles, accessToken });
      // setUser('');
      resetUser();
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  // const togglePersist = () => {
  //     setPersist(prev => !prev);
  // }
  // useEffect(() => {
  //     localStorage.setItem("persist", persist);
  // }, [persist])

  return (
    <section className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} className="sign-in-form">
            <img src="img/logo_ug.png" className="imagelogo" alt="" />
            <h2 className="title">Selamat Datang!</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className="icon" />

              <input
                type="text"
                id="username"
                placeholder="Username"
                ref={userRef}
                autoComplete="off"
                {...userAttribs}
                required
              />
            </div>

            <div className="input-field">
              <FontAwesomeIcon icon={faLock} className="icon" />

              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>
            <button className="btn solid">Login</button>
            {/* <div className="persistCheck">
              <input
                type="checkbox"
                id="persist"
                onChange={toggleCheck}
                checked={check}
              />
              <label htmlFor="persist" className="social-text">
                Trust This Device
              </label>
            </div> */}
          </form>
          <Register />

          {/* <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/register">Sign Up</Link>
                        </span>
                    </p> */}
        </div>
      </div>

      <LeftPanel />
    </section>
  );
};

export default Login;
