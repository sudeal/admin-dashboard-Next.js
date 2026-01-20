"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPageView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Register işlemi buraya eklenecek
    // Şimdilik dashboard'a yönlendiriyoruz
    router.push("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Create an Account</h1>
          <p className="login-subtitle">Create a account to continue</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Email address:</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label">Username</label>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label">Password</label>
              <button
                type="button"
                className="login-forgot"
                onClick={() => {
                  // Forgot password işlemi
                }}
              >
                Forget Password?
              </button>
            </div>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} />
              </button>
            </div>
          </div>

          <div className="login-checkbox-wrapper">
            <label className="login-checkbox-label">
              <input
                type="checkbox"
                className="login-checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                required
              />
              <span className="login-checkbox-text">I accept terms and conditions</span>
            </label>
          </div>

          <button type="submit" className="login-submit">
            Sign Up
          </button>
        </form>

        <div className="login-footer">
          <span className="login-footer-text">Already have an account?</span>
          <button
            type="button"
            className="login-footer-link"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

