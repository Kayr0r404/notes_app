import { useEffect, useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/public-notes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json' // Fixed typo here
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }

        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    getNotes();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px'
      }}>
        <p>Loading public notes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        color: 'red'
      }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '10px auto',
      padding: '40px'
    }}>
      <h2 style={{
        marginBottom: '20px',
        textAlign: 'center'
      }}>Public Notes</h2>
      
      {notes.length > 0 ? (
        <div style={{
        //   display: 'grid',
        //   gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {notes.map((note, index) => (
            <div 
              key={index} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{
                marginTop: '0',
                color: '#333',
                borderBottom: '1px solid #eee',
                paddingBottom: '10px'
              }}>
                {note.description || "Untitled Note"}
              </h3>
              <p style={{
                color: '#666',
                whiteSpace: 'pre-wrap'
              }}>
                {note.content}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No public notes available</p>
      )}
    </div>
  );
}