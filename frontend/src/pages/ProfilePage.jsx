// src/pages/ProfilePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { getProfile, updateProfile, uploadAvatar } from '../api/Profile';

const getToken = () => localStorage.getItem('token');

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', bio: '', skills: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  const refresh = () => {
    setLoading(true);
    setError('');
    const token = getToken();
    if (!token) {
      setError("Not logged in");
      setLoading(false);
      return;
    }
    getProfile(token)
      .then(data => {
        setProfile(data);
        setForm({
          name: data.name || '',
          bio: data.bio || '',
          skills: data.skills ? data.skills.join(', ') : '',
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleEditClick = () => setEditMode(true);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const token = getToken();
      const skills = form.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      const res = await updateProfile({
        name: form.name,
        bio: form.bio,
        skills,
        token,
      });
      setProfile(res.user);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
    setSaving(false);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.value = null;
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    setAvatarError('');
    try {
      const token = getToken();
      await uploadAvatar(file, token);
      refresh();
    } catch (e) {
      setAvatarError(e.message || 'Upload failed');
    }
    setAvatarUploading(false);
  };

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <span className="loader"></span>
        <div>Loading profile...</div>
      </div>
    );
  if (error)
    return (
      <div
        style={{
          color: '#d32f2f',
          background: '#ffeaea',
          border: '1px solid #ffa6a6',
          padding: 24,
          borderRadius: 8,
          maxWidth: 370,
          margin: '48px auto',
          textAlign: 'center',
        }}>
        <strong>Error:</strong> {error}
      </div>
    );
  if (!profile) return null;

  return (
    <div
      style={{
        maxWidth: 520,
        margin: '2rem auto',
        background: 'linear-gradient(#e3f2fd,#fff)',
        borderRadius: 12,
        padding: 34,
        boxShadow: '0 2px 18px #aee4ff70',
      }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleAvatarChange}
        />
        <div
          style={{
            width: 92,
            height: 92,
            marginRight: 22,
            borderRadius: '50%',
            border: '3px solid #b3dffe',
            overflow: 'hidden',
            boxShadow: '0 1px 6px #aee',
            cursor: avatarUploading ? 'wait' : 'pointer',
            background: '#fff',
            position: 'relative',
          }}
          title="Click to change avatar"
          onClick={handleAvatarClick}>
          <img
            src={
              profile.avatar
                ? profile.avatar
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.name
                  )}&background=f7fafc&color=1976d2&size=220`
            }
            alt="avatar"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: avatarUploading ? 0.38 : 1 }}
          />
          {avatarUploading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#ffffffcc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1976d2',
                fontWeight: 'bold',
                fontSize: 26,
              }}>
              <span className="loader-small"></span>
            </div>
          )}
        </div>
        <div>
          <h2 style={{ margin: 0 }}>{profile.name}
            <span style={{ fontSize: 13, color: '#1e88e5', marginLeft: 9 }}>
              ({profile.role})
            </span>
          </h2>
          <div style={{ color: '#669' }}>{profile.email}</div>
        </div>
      </div>
      {avatarError && (
        <div style={{ marginBottom: 14, color: '#cc0022' }}>
          <strong>Avatar upload error:</strong> {avatarError}
        </div>
      )}
      {!editMode ? (
        <>
          <div>
            <strong>Bio:</strong> {profile.bio || <span style={{ color: '#bbb' }}>No bio provided.</span>}
          </div>
          <div style={{ margin: '14px 0' }}>
            <strong>Skills:</strong>{' '}
            {profile.skills && profile.skills.length
              ? profile.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      display: 'inline-block',
                      background: '#bbdefb',
                      color: '#1976d2',
                      borderRadius: 8,
                      padding: '3px 9px',
                      margin: '1px 7px 2px 0',
                      fontSize: '0.96em',
                    }}>
                    {s}
                  </span>
                ))
              : <span style={{ color: '#bbb' }}>Not set.</span>}
          </div>
          <button
            onClick={handleEditClick}
            style={{
              background: 'linear-gradient(90deg,#1976d2 35%,#67b7ee 100%)',
              color: '#fff',
              borderRadius: 8,
              border: 'none',
              padding: '9px 28px',
              fontSize: 17,
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: 6,
            }}>
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSave} style={{ marginTop: 7 }}>
          <div>
            <label>
              Name
              <br />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 5,
                  border: '1px solid #bbc',
                  marginTop: 2,
                }}
              />
            </label>
          </div>
          <div style={{ marginTop: 12 }}>
            <label>
              Bio
              <br />
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 5,
                  border: '1px solid #bbc',
                  marginTop: 2,
                }}
              />
            </label>
          </div>
          <div style={{ marginTop: 13 }}>
            <label>
              Skills
              <span style={{ color: '#777', fontSize: 13, marginLeft: 7 }}>
                (comma separated)
              </span>
              <br />
              <input
                type="text"
                name="skills"
                value={form.skills}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: 8,
                  borderRadius: 5,
                  border: '1px solid #bbc',
                  marginTop: 2,
                }}
              />
            </label>
          </div>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'start', gap: 10 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: 'linear-gradient(90deg,#388e3c 60%,#a5d6a7 100%)',
                color: '#fff',
                borderRadius: 8,
                border: 'none',
                padding: '9px 27px',
                fontSize: 17,
                cursor: 'pointer',
                fontWeight: 'bold',
              }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              disabled={saving}
              style={{
                color: '#555',
                background: '#eef3fa',
                borderRadius: 7,
                border: 'none',
                padding: '9px 16px',
                fontSize: 15,
                marginLeft: 4,
                cursor: 'pointer',
              }}
              onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </div>
          {error && (
            <div style={{ color: 'red', marginTop: 12, fontWeight: 500 }}>
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
}

/* [Optional] Add this CSS for animated loaders: */
export const loaderCSS = `
.loader, .loader-small {
  border-radius: 50%;
  display: inline-block;
  border-top: 4px solid #1976d2;
  border-right: 4px solid #1976d2;
  border-bottom: 4px solid #1976d2;
  border-left: 4px solid #e3e3e3;
  width: 35px;
  height: 35px;
  animation: spin 1s linear infinite;
}
.loader-small {
  width: 24px;
  height: 24px;
  border-width: 3px;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
// `;

// In your main index.css, append loaderCSS if you want the loader styles!