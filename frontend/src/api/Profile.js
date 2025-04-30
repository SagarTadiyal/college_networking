
// ... existing getProfile and updateProfile ...

export async function uploadAvatar(file, token) {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await fetch('/api/profile/avatar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to upload avatar');
    return res.json();
  }