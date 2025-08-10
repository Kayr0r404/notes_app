import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authUser, logout, setAuthUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.status === 401) {
          const refreshResponse = await fetch(`/api/token/refresh/`, {
            method: 'POST',
            credentials: 'include'
          });

          if (!refreshResponse.ok) {
            logout();
            navigate('/login');
            return;
          }

          setAuthUser(await refreshResponse.json());
          response = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
            method: 'GET',
            credentials: 'include',
          });
        }

        if (!response.ok) throw new Error('Failed to fetch notes');
        setNotes(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [navigate, logout, setAuthUser]);

  if (loading) return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60vh'
    }}>
      <div style={{
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '4px solid #3498db',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
      }}></div>
      <p>Loading your notes...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <p style={{ color: '#e74c3c', marginBottom: '1rem' }}>Error: {error}</p>
      <button 
        onClick={() => window.location.reload()} 
        style={{
          padding: '8px 16px',
          background: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Retry
      </button>
    </div>
  );

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid #eee'
      }}>
        <h2>Welcome {authUser?.user?.username || authUser?.user?.email || "User"}</h2>
        <button 
          onClick={logout}
          style={{
            padding: '8px 16px',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div> */}
      
      {notes.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {notes.map(item => (
            <div 
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                {item.description || "Untitled Note"}
              </h3>
              {/* <p style={{ 
                color: '#7f8c8d', 
                fontSize: '0.9rem',
                marginBottom: '15px'
              }}>
                {item.description}
              </p> */}
              <div style={{ 
                flexGrow: 1,
                color: '#34495e',
                marginBottom: '15px',
                lineHeight: '1.5'
              }}>
                {item.content.length > 150 
                  ? `${item.content.substring(0, 150)}...` 
                  : item.content}
              </div>
              <Link 
                to={`/edit-note/${item.id}`}
                style={{
                  color: '#3498db',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  alignSelf: 'flex-start'
                }}
              >
                View/Edit
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#7f8c8d' }}>
          <p>No notes found</p>
          <Link 
            to='/create-note'
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 16px',
              background: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Create your first note
          </Link>
        </div>
      )}

      <Link 
        to='/create-note'
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '200px',
          margin: '0 auto',
          padding: '12px 20px',
          background: '#2ecc71',
          color: 'white',
          textDecoration: 'none',
          textAlign: 'center',
          borderRadius: '4px',
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '1.2rem', marginRight: '5px' }}>+</span>
        Add New Note
      </Link>
    </div>
  );
}