import { useState } from 'react';
import { api, authApi } from '../lib/api';
import { Toast } from '@/components/ui/toast';

export default function ProfileForm({ user, editing, setEditing }) {
  // prefill form with user props (safe copy)
  const initial = {
    fullName: user.fullName || user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    restaurantName: user.restaurantName || '',
    description: user.description || '',
  };

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  // update handler - adjust the endpoint to match backend
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // try backend user update endpoint - change path if backend differs
      // if your backend expects /api/user/update or /api/auth/user/update, update the path below
      const resp = await api
        .put('/api/auth/user/update', form)
        .catch(async (err) => {
          // fallback: some backends accept PATCH at /api/user
          return api.patch('/api/user', form);
        });

      // if backend returns updated user, you can update context by re-calling /me or if it returns user, update context
      // call /api/auth/me to reload global user - optional: use a context method if provided
      await authApi.me(); // triggers server side check; you might want to use a context function to refresh user

      if (typeof Toast === 'function')
        Toast({ title: 'Saved', description: 'Profile updated.' });
      setEditing(false);
    } catch (err) {
      console.error(err);
      if (typeof Toast === 'function')
        Toast({
          title: 'Error',
          description: err?.response?.data?.message || 'Could not save',
        });
    } finally {
      setLoading(false);
    }
  };

  // input handler
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // render different fields for partner vs user
  const isPartner = user?.role === 'partner' || user?.restaurantName;

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Full name</span>
          <input
            value={form.fullName}
            onChange={set('fullName')}
            className="input mt-1"
            disabled={!editing}
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Email</span>
          <input
            value={form.email}
            onChange={set('email')}
            className="input mt-1"
            disabled
          />
        </label>
      </div>

      {isPartner && (
        <>
          <label className="flex flex-col">
            <span className="text-sm text-muted-foreground">
              Restaurant name
            </span>
            <input
              value={form.restaurantName}
              onChange={set('restaurantName')}
              className="input mt-1"
              disabled={!editing}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-muted-foreground">Description</span>
            <textarea
              value={form.description}
              onChange={set('description')}
              rows="4"
              className="input mt-1"
              disabled={!editing}
            />
          </label>
        </>
      )}

      <label className="flex flex-col">
        <span className="text-sm text-muted-foreground">Phone</span>
        <input
          value={form.phone}
          onChange={set('phone')}
          className="input mt-1"
          disabled={!editing}
        />
      </label>

      <label className="flex flex-col">
        <span className="text-sm text-muted-foreground">Address</span>
        <input
          value={form.address}
          onChange={set('address')}
          className="input mt-1"
          disabled={!editing}
        />
      </label>

      <div className="flex items-center gap-3">
        {editing ? (
          <>
            <button
              disabled={loading}
              className="px-4 py-2 rounded bg-primary text-white"
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="px-4 py-2 rounded bg-primary text-white"
            onClick={() => setEditing(true)}
          >
            Edit profile
          </button>
        )}
      </div>
    </form>
  );
}
