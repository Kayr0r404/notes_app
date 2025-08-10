import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoteForm = () => {
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    isPrivate: 'none',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!noteData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!noteData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register-note`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: noteData.title,
          content: noteData.content
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(prev => ({ ...prev, ...data }));
        return;
      }

      console.log('Note created successfully:', data);
      navigate('/notes')
      setNoteData({ description: '', content: '' });

    } catch (error) {
      console.error('Error creating note:', error);
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
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>Create Note</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Description Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="description" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Title
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={noteData.description}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.description ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
          />
          {errors.description && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.description}
            </p>
          )}
        </div>

        {/* Content Field */}
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="content" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#374151'
          }}>
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="4"
            value={noteData.content}
            onChange={handleChange}
            style={{
              marginTop: '0.25rem',
              display: 'block',
              width: '100%',
              padding: '0.5rem 0.75rem',
              border: `1px solid ${errors.content ? '#ef4444' : '#d1d5db'}`,
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            }}
          />
          {errors.content && (
            <p style={{
              marginTop: '0.25rem',
              fontSize: '0.875rem',
              color: '#dc2626'
            }}>
              {errors.content}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              borderRadius: '0.375rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              cursor: 'pointer',
              opacity: isSubmitting ? '0.5' : '1',
              border: 'none',
              fontWeight: '500'
            }}
          >
            {isSubmitting ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;