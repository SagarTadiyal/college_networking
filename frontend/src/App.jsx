import React, { useState } from "react";
import { defaultUser, defaultAdmin } from "./data/profiles";
import UserCard from "./components/UserCard";
import UserCardEditable from "./components/UserCardEditable";
import AdminCard from "./components/AdminCard";
import AdminCardEditable from "./components/AdminCardEditable";

export default function App() {
  const [profileType, setProfileType] = useState("user");
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(defaultUser);
  const [admin, setAdmin] = useState(defaultAdmin);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex justify-center mb-4">
        <div className="bg-white/90 border rounded-xl px-2 py-1 flex gap-2 shadow-md">
          <button
            className={`px-3 py-2 rounded-lg text-base font-semibold transition-colors shadow-sm focus:outline-none ${profileType === 'user'
              ? 'bg-blue-700 text-white border border-blue-800'
              : 'text-blue-700 hover:bg-blue-100'}`}
            onClick={() => { setProfileType('user'); setEdit(false); }}
            aria-pressed={profileType === 'user'}
          >
            User Profile
          </button>
          <button
            className={`px-3 py-2 rounded-lg text-base font-semibold transition-colors shadow-sm focus:outline-none ${profileType === 'admin'
              ? 'bg-blue-700 text-white border border-blue-800'
              : 'text-blue-700 hover:bg-blue-100'}`}
            onClick={() => { setProfileType('admin'); setEdit(false); }}
            aria-pressed={profileType === 'admin'}
          >
            Admin Profile
          </button>
        </div>
      </div>
      {profileType === "user" ? (
        edit ? (
          <UserCardEditable
            profile={user}
            onSave={fields => { setUser({ ...user, ...fields }); setEdit(false); }}
            onCancel={() => setEdit(false)}
          />
        ) : (
          <UserCard profile={user} onEdit={() => setEdit(true)} />
        )
      ) : (
        edit ? (
          <AdminCardEditable
            profile={admin}
            onSave={fields => { setAdmin({ ...admin, ...fields }); setEdit(false); }}
            onCancel={() => setEdit(false)}
          />
        ) : (
          <AdminCard profile={admin} onEdit={() => setEdit(true)} />
        )
      )}
    </div>
  );
}