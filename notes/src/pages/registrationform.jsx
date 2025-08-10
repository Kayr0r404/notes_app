import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          fullname: formData.full_name,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(prevErrors => ({
          ...prevErrors,
          ...data
        }));
        return;
      }

      console.log('Registration successful:', data);
      navigate('/login');

    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      maxWidth: '28rem',
      margin: '2.5rem auto 0',
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>Register</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.username ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              outline: 'none',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
              }
            }}
          />
          {errors.username && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.username}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.email ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              outline: 'none',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
              }
            }}
          />
          {errors.email && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Full Name Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="full_name" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.full_name ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              outline: 'none',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
              }
            }}
          />
          {errors.full_name && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.full_name}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.password ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              outline: 'none',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
              }
            }}
          />
          {errors.password && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="confirm_password" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.confirm_password ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              outline: 'none',
              '&:focus': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
              }
            }}
          />
          {errors.confirm_password && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.confirm_password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? '0.5' : '1',
              outline: 'none',
              '&:focus': {
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)'
              },
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;