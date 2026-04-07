import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!mobile || !password) {
      alert("Fill all fields");
      return;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mobile);

    if (!isEmail && mobile.length !== 10) {
      alert("Enter valid mobile number or email");
      return;
    }

    if (isLogin) {
      const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

      if (!registeredUser) {
        alert("No account found. Please signup");
        return;
      }

      if (
        registeredUser.mobile !== mobile ||
        registeredUser.password !== password
      ) {
        alert("Invalid credentials");
        return;
      }

      dispatch(authActions.login(registeredUser));
      alert("Login Successful");
    } else {
      if (!name) {
        alert("Enter your name");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const newUser = { name, mobile, password };

      localStorage.setItem("registeredUser", JSON.stringify(newUser));

      dispatch(authActions.signup(newUser));

      alert("Account Created Successfully");

      setIsLogin(true); // switch to login
    }

    // reset fields
    setName("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        {/* Full Name */}
        {!isLogin && (
          <input
            className="auth-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="auth-input"
          type="text"
          placeholder="Email or Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

    
        {!isLogin && (
          <input
            className="auth-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        
        {!isLogin && (
          <p style={{ fontSize: "12px", color: "gray" }}>
            By continuing, you agree to Terms of Use & Privacy Policy
          </p>
        )}

        <button className="auth-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="auth-toggle"
          onClick={() => setIsLogin(!isLogin)}
          style={{ cursor: "pointer" }}
        >
          {isLogin
            ? "New user? Create account"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
