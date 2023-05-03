import { useContext, useState } from "react";
import "./signin.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
    } else {
      setUsernameError("");
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN" });
    try {
      const res = await axios.post(
        "https://bookingapiv1.onrender.com/api/auth/signin",
        {
          username,
          password,
        }
      );
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        localStorage.setItem("user", JSON.stringify(res.data.details));
        // localStorage.setItem("access_token", res.data.access_token);
        navigate("/");
        window.location.reload();
      } else {
        dispatch({
          type: "LOGIN_FAIL",
          payload: { message: "You are not allowed" },
        });
      }

      // window.location.reload();
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err });
    }
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
            onChange={handleUsernameChange}
            placeholder="Username"
          />
          {usernameError && (
            <span className="error-message">{usernameError}</span>
          )}

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
            disabled={loading}
            className="btn_submit"
            type="submit"
            onClick={handleSignin}
          >
            Sign In
          </button>

          {error && <span className="error">{error.message}</span>}
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
