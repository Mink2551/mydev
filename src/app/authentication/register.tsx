import React, { useState } from 'react';

function Register({ handleAuthStage }: { handleAuthStage: (Path: string) => void }) {

  // Declare Form for User Input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }); 

  // Declare Propmt Error and Success
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('')

  // Declare Functions changing FormData
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Declare Functions API , Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check Password Match?
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Fetch Data to /api/auth/register
      const response = await fetch('/api/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Data
        body: JSON.stringify(formData),
      });

      // Take Data
      const data = await response.json();

      // Check Responese
      if (response.ok) {

        // Prompt Success
        setSuccess("Registeration Successfully")
      } else {

        // Prompt Error
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  // Body Page
  return (
    <div className='ml-12 w-fit text-white'>
      <h1 className='font-medium text-xl mb-4'>Register</h1>

      {/* Form */}
      <form className='flex ml-2 flex-col gap-4' onSubmit={handleSubmit}>

        {/* Username */}
        <div>
          <label className='block mb-1' htmlFor='username'>Username</label>
          <input className='p-2 rounded-b-sm bg-palette1 border-gray-500 border-b-2 text-white w-64' type='text' id='username' placeholder='Enter username' value={formData.username} onChange={handleChange} required />
        </div>
        
        {/* Email */}
        <div>
          <label className='block mb-1' htmlFor='email'>Email</label>
          <input className='p-2 rounded-b-sm bg-palette1 border-gray-500 border-b-2 text-white w-64' type='email' id='email' placeholder='Enter email' value={formData.email} onChange={handleChange} required />
        </div>
        
        {/* Password */}
        <div>
          <label className='block mb-1' htmlFor='password'>Password</label>
          <input className='p-2 rounded-b-sm bg-palette1 border-gray-500 border-b-2 text-white w-64' type='password' id='password' placeholder='Enter password' value={formData.password} onChange={handleChange} required />
        </div>
        
        {/* Confirm Password */}
        <div>
          <label className='block mb-1' htmlFor='confirmPassword'>Confirm Password</label>
          <input className='p-2 rounded-b-sm bg-palette1 border-gray-500 border-b-2 text-white w-64' type='password' id='confirmPassword' placeholder='Confirm password' value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        
        {/* Submit button */}
        <button type='submit' className='mt-4 bg-orange-600 hover:bg-orange-700 w-fit text-white py-2 px-4 rounded'>Register</button>
      </form>
      
      {/* Show Prompt */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
      
      {/* Change to Login Page */}
      <button onClick={() => handleAuthStage("login")} className='mt-4 ml-2 transition-all text-sm hover:text-blue-100'>Do you already have an Account?</button>
    </div>
  );
}

export default Register;
