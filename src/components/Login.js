import axios from "axios";
import { React, useState } from "react";


const Login = (props) => {
  const {
    userToken,
    setUserToken,
    userName,
    userPassword,
    setUserName,
    setUserPassword,
    email,
    setEmail,
    name,
    setName,
    currentUser,
    setCurrentUser,
    confirmPassword,
    setConfirmPassword,
    location,
    setLocation,
  } = props;
  const [register, setRegister] = useState(false);
  const logInUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/users/login",
        {
          username: userName,
          password: userPassword,
        }
      );
      console.log(response);
      window.localStorage.setItem("token", response.data.token);
      setUserToken(response.data.token);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const registerNewUser = async (event) => {
    event.preventDefault();
    if (userPassword !== confirmPassword) alert("Passwords Do Not Match");

    try {
      const response = await axios.post(
        "/api/users/register",
        {
          username: userName,
          password: userPassword,
          email: email
        }
      );
    //   window.localStorage.setItem("token", response.data.token);
      setUserToken(response.data.token);
      setCurrentUser(response.data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };

//   const signOutUser = async (event) => {
//     setCurrentUser({});
//     setUserToken("");
//     setName("");
//     setUserName("");
//     setUserPassword("");
//     setEmail("");
//     setConfirmPassword("");
//   };

  return (
    <div className="login_page">
      <div className="login_forms">
        {!register && 
          (
          <form className="login" onSubmit={logInUser}>
            <h3>Login</h3>
            <label>Username</label>

            <input
              type="text"
              required
              onChange={(event) => setUserName(event.target.value)}
            ></input>

            <label>Password</label>

            <input
              type="password"
              required
              onChange={(event) => setUserPassword(event.target.value)}
            ></input>

            <button typeof="submit">Log In</button>
          </form>
        )}
        {register && (
          <form className="register" onSubmit={registerNewUser}>
            <h3>Register</h3>

            <label>Username</label>

            <input
              type="text"
              required
              onChange={(event) => setUserName(event.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              required
              onChange={(event) => setUserPassword(event.target.value)}
            />

            <label>Confirm Password</label>

            <input
              type="password"
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <label>Email</label>

            <input
              type="text"
              required
              onChange={(event) => setEmail(event.target.value)}
            />

            <button typeof="submit">Register Account</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;