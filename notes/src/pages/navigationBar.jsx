import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const NavBar = () => {
  const { authUser, logout } = useAuth(); // Get auth state and logout function

  const onClickSignIn = () => {

  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        gap: '1.5rem'
      }}>
        <li>
          <Link to="/" style={{
            textDecoration: 'none',
            color: '#212529',
            fontWeight: '500',
            '&:hover': {
              color: '#0d6efd'
            }
          }}>
            Home
          </Link>
        </li>
        {(
          <li>
            <Link to="/notes" style={{
              textDecoration: 'none',
              color: '#212529',
              fontWeight: '500'
            }}>
              My Notes
            </Link>
          </li>
        )}
      </ul>

      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        gap: '1rem'
      }}>
        {authUser ? (
          <>
            <li style={{ color: '#6c757d' }}>
              Welcome, {authUser?.user?.username || authUser.email}
            </li>
            <li>
              <button 
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontWeight: '500',
                  padding: '0.25rem 0.5rem',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" style={{
                textDecoration: 'none',
                color: '#212529',
                fontWeight: '500',
                padding: '0.25rem 0.5rem',
                '&:hover': {
                  color: '#0d6efd'
                }
              }}>
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" style={{
                textDecoration: 'none',
                color: '#212529',
                fontWeight: '500',
                padding: '0.25rem 0.5rem',
                '&:hover': {
                  color: '#0d6efd'
                }
              }}>
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;