import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../store/actions/authActions";
import {
  NAME_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
  UserAction,
} from "../../utils/utils";

const LoginSignup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [action, setAction] = useState(UserAction.login);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (action === UserAction.login) {
      dispatch(loginUser(user));
      setUser({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    } else {
      dispatch(registerUser(user));
      dispatch(loginUser(user));
    }
  };
  const checkDetails = () => {
    if (length(user.name) === 0 || !user.name.match(NAME_REGEX)) return false;
    if (length(user.email) === 0 || !user.email.match(EMAIL_REGEX)) {
      return false;
    }
    if (length(user.password) <= 5 || !user.email.match(PASSWORD_REGEX)) {
      return false;
    }
    if (user.password !== user.confirm_password) {
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="login_signup_page">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === UserAction.login ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {action === UserAction.login ? (
            <></>
          ) : (
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={user.confirm_password}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        {action === UserAction.signup ? (
          <></>
        ) : (
          <div className="forgot-password">
            Don't Remember password? <span>Change Password</span>
          </div>
        )}
        {action === UserAction.signup ? (
          <div className="signup-action-div">
            Already have an Account?{" "}
            <button
              className="change-action-btn"
              onClick={() => setAction(UserAction.login)}
            >
              Login
            </button>
          </div>
        ) : (
          <div className="signup-action-div">
            Want to create new account?
            <button
              className="change-action-btn"
              onClick={() => setAction(UserAction.signup)}
            >
              Sign Up
            </button>
          </div>
        )}
        <div className="submit-container">
          <div className="submit" onClick={handleSubmit}>
            {action}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
