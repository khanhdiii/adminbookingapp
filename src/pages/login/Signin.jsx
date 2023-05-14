import { useContext, useState } from "react";
import "./signin.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignin = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className="signin-form-container">
      <h1 className="form-title">Login Form</h1>
      <form className="signin-form">
        <div className="form-group">
          <label className="label_username" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />

          <label htmlFor="password" className="label_password">
            Password
          </label>
          <input
            className="input_password"
            type="password"
            id="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="btn_submit"
            type="submit"
            onClick={handleSignin}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
