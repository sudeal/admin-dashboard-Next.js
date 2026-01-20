"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPageView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login işlemi buraya eklenecek
    // Şimdilik dashboard'a yönlendiriyoruz
    router.push("/");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Login to Account</h1>
          <p className="login-subtitle">Please enter your email and password to continue</p>
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
                checked={rememberPassword}
                onChange={(e) => setRememberPassword(e.target.checked)}
              />
              <span className="login-checkbox-text">Remember Password</span>
            </label>
          </div>

          <button type="submit" className="login-submit">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <span className="login-footer-text">Don't have an account?</span>
          <button
            type="button"
            className="login-footer-link"
            onClick={() => router.push("/register")}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

