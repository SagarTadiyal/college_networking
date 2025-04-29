import React, { useState } from "react";
import AvatarCircle from "./AvatarCircle";

export default function AdminCardEditable({ profile, onSave, onCancel }) {
  const [name, setName] = useState(profile.name);
  const [role, setRole] = useState(profile.role);
  const [responsibilities, setResponsibilities] = useState(profile.responsibilities);
  const [contact, setContact] = useState(profile.contact);
  const [accessLevels, setAccessLevels] = useState(profile.accessLevels.map(i => i.label).join(', '));

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      name,
      role,
      responsibilities,
      contact,
      accessLevels: accessLevels.split(',').map(label => ({
        label: label.trim(),
        color: "bg-red-900/80 text-red-200"
      }))
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 text-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto relative mt-8">
      <div className="absolute right-5 top-5 flex gap-2">
        <button type="button" className="text-red-300 underline" onClick={onCancel}>Cancel</button>
        <button type="submit" className="bg-blue-700 text-white px-3 py-1 rounded-md font-semibold">Save</button>
      </div>
      <AvatarCircle />
      <input className="w-full text-3xl font-bold text-white text-center mt-2 mb-0.5 bg-transparent outline-none" value={name} onChange={e => setName(e.target.value)} />
      <input className="w-full text-center text-zinc-300 mb-6 bg-transparent outline-none" value={role} onChange={e => setRole(e.target.value)} />
      <div className="mb-2">
        <p className="font-semibold">Responsibilities</p>
        <textarea className="w-full rounded-md p-1 outline-none bg-zinc-800/60 text-zinc-200" rows={2} value={responsibilities} onChange={e => setResponsibilities(e.target.value)} />
      </div>
      <div className="mb-2">
        <p className="font-semibold">Contact</p>
        <input className="w-full rounded-md p-1 outline-none bg-zinc-800/60 text-zinc-200" type="email" value={contact} onChange={e => setContact(e.target.value)} />
      </div>
      <div className="mt-2">
        <p className="font-semibold mb-1">Access Level <span className="font-normal text-xs">(comma separated)</span></p>
        <input className="w-full rounded-md p-1 outline-none bg-zinc-800/60 text-zinc-200" value={accessLevels} onChange={e => setAccessLevels(e.target.value)} />
      </div>
    </form>
  );
}