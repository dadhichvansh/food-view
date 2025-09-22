import AvatarUploader from './AvatarUploader';

export default function ProfileHeader({ user, editing, setEditing }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-2xl">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            (user.fullName || user.name || 'U')[0].toUpperCase()
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {user.fullName || user.name || user.email}
          </h2>
          <p className="text-sm text-muted-foreground">
            {user.restaurantName || user.role || 'Customer'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Avatar uploader visible only in edit mode */}
        {editing && <AvatarUploader user={user} />}
        <button
          className="px-4 py-2 rounded bg-primary text-white hover:opacity-95"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel' : 'Edit profile'}
        </button>
      </div>
    </div>
  );
}
