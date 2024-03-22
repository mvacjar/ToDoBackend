import { useState } from "react";
import { useCookies } from "react-cookie";

import "../styles/Auth.css";

const Auth = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure passwords match!");
      return;
    }

    const endpoint = isLogIn ? "login" : "signup";
    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
      } else {
        setCookies("Email", data.email);
        setCookies("AuthToken", data.token);
        window.location.relocate();
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <form className="form-container">
        {isLogIn ? (
          <>
            <h2 className="title-auth">Log in</h2>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              className="submit-button"
              onClick={(e) => handleSubmit(e, isLogIn ? "login" : "signup")}
            />
            {error && <p>{error}</p>}
            <div className="auth-option-signup">
              <p className="text-auth">
                Don&apos;t you already have an account?{" "}
                <button
                  className="signup-button"
                  onClick={() => viewLogin(false)}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="title-auth">Sign up</h2>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="submit"
              className="submit-button"
              onClick={(e) => handleSubmit(e, !isLogIn ? "signup" : "login")}
            />
            {error && <p>{error}</p>}
            <div className="auth-option-login">
              <p className="text-auth">
                Do you already have an account?{" "}
                <button
                  className="login-button"
                  onClick={() => viewLogin(true)}
                >
                  Log in
                </button>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Auth;
