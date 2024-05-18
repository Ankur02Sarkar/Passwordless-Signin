"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import "./login.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const Login = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="form-container sign-up">
        <div className="formDiv">
          <h1 className="text-gray-500">Create Account</h1>
          <div className="social-icons flex flex-row gap-4 text-gray-500">
            <Button
              onClick={() => {}}
              className="hover:text-[#512da8] hover:border hover:border-[#512da8] flex flex-row gap-2"
            >
              <span>Continue With Google</span>
              <FaGoogle size={27} />
            </Button>
          </div>
          <span className="text-gray-500">
            or use your email for registration
          </span>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => {}} disabled={isDisabled}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="form-container sign-in">
        <div className="formDiv">
          <h1 className="text-gray-500">Sign In</h1>
          <div className="social-icons flex flex-row gap-4 text-gray-500">
            <Button
              onClick={() => {}}
              className="hover:text-[#512da8] hover:border hover:border-[#512da8] flex flex-row gap-2"
            >
              <span>Continue With Google</span>
              <FaGoogle size={27} />
            </Button>
          </div>
          <span className="text-gray-500">or use your email password</span>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <a href="#">Forget Your Password?</a> */}
          <button onClick={() => {}}>Sign In</button>
        </div>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button
              className="hiddenn"
              id="login"
              onClick={(e) => {
                e.preventDefault();
                setIsActive(false);
              }}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button
              className="hiddenn"
              id="register"
              onClick={(e) => {
                e.preventDefault();
                setIsActive(true);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
