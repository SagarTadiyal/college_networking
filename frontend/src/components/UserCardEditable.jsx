import React, { useState } from "react";
import AvatarCircle from "./AvatarCircle";

export default function UserCardEditable({ profile, onSave, onCancel }) {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [about, setAbout] = useState(profile.about);
  const [contact, setContact] = useState(profile.contact);
  const [interests, setInterests] = useState(profile.interests.map(i => i.label).join(', '));

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      name,
      role,
      about,
      contact,
      interests: interests.split(',').map(label => ({
        label: label.trim(),
        color: "bg-blue-100 text-blue-600"
      }))
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-blue-50/80 p-8 rounded-2xl shadow-lg max-w-xl mx-auto relative mt-8">
      <div className="absolute right-5 top-5 flex gap-2">
        <button type="button" className="text-blue-600 underline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="bg-blue-700 text-white px-3 py-1 rounded-md font-semibold">Save</button>
      </div>
      <AvatarCircle />
      <input className="w-full text-3xl font-bold text-blue-700 text-center mt-2 mb-0.5 bg-transparent outline-none" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full text-center text-gray-700 mb-6 bg-transparent outline-none" value={role} onChange={e => setRole(e.target.value)} />
      <div className="mb-2">
        <p className="font-semibold">About</p>
        <textarea className="w-full bg-white/50 rounded-md p-1 outline-none" rows={2} value={about} onChange={e => setAbout(e.target.value)} />
      </div>
      <div className="mb-2">
        <p className="font-semibold">Contact</p>
        <input className="w-full bg-white/50 rounded-md p-1 outline-none" type="email" value={contact} onChange={e => setContact(e.target.value)} />
      </div>
      <div className="mt-2">
        <p className="font-semibold mb-1">Interests <span className="font-normal text-xs">(comma separated)</span></p>
        <input className="w-full bg-white/50 rounded-md p-1 outline-none" value={interests} onChange={e => setInterests(e.target.value)} />
      </div>
    </form>
  );
}