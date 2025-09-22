import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) {
    // should be protected route, but safe fallback
    return <div className="p-8">No user data found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ProfileHeader user={user} editing={editing} setEditing={setEditing} />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-slate-900 p-4 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Profile summary</h3>
            <p className="text-sm text-muted-foreground">
              Role: <span className="font-medium">{user.role || 'user'}</span>
            </p>
            <p className="text-sm mt-3">Email: {user.email}</p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-6 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Account details</h3>
            <ProfileForm
              user={user}
              editing={editing}
              setEditing={setEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
