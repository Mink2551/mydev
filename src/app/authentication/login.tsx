"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

function Login({ handleAuthStage }: { handleAuthStage: (Path: string) => void }) {

  // Declare Form for User Input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Declare Propmt Error and Success
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Assign Data to Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
 
  // Declare Functions API , Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check User Input
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    // Use NextAuth's signIn method with the "credentials" provider.
    const result = await signIn("credentials", {
      redirect: false, 
      email: formData.email,
      password: formData.password,
    });

    // Log Prompt
    if (result?.error) {
      setError(result.error);
      setSuccess("");
    } else {
      setSuccess("Login Successfully");
      setError("");
    }
  };

  // Body Page
  return (
    <div className="ml-12 w-fit text-white">
      <h1 className="font-medium text-xl mb-4">Login</h1>

      {/* Form */}
      <form className="flex ml-2 flex-col gap-4" onSubmit={handleSubmit}>

        {/* Email */}
        <div>
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="p-2 rounded-b-sm bg-palette1 border-gray-500 border-b-2 text-white w-64"
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="p-2 rounded-b-sm bg-palette1 border-gray-500 border-b-2 text-white w-64"
            type="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-orange-600 hover:bg-orange-700 w-fit text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      {/* Show Prompt */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      {/* Change to Register Page */}
      <div className="grid mt-2 gap-y-2">
        <button
          onClick={() => handleAuthStage("register")}
          className="ml-2 transition-all text-sm text-start hover:text-blue-300"
        >
          Don't have an Account?
        </button>
      </div>
    </div>
  );
}

export default Login;
