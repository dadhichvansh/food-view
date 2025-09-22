import { useState } from 'react';
import { api } from '../lib/api';

export default function AvatarUploader({ user }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(URL.createObjectURL(f));
    // upload immediately
    upload(f);
  };

  const upload = async (f) => {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('avatar', f);
      // endpoint guess - change if your backend uses /api/user/avatar etc.
      const res = await api.post('/api/auth/user/avatar', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // refresh user
      await api.get('/api/auth/me');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />
      <span className="px-3 py-2 text-sm rounded border bg-white">
        Upload avatar
      </span>
      {loading && (
        <span className="text-sm text-muted-foreground">Uploading...</span>
      )}
    </label>
  );
}
