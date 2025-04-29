import React from "react";
import AvatarCircle from "./AvatarCircle";

export default function AdminCard({ profile, onEdit }) {
  return (
    <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-lg max-w-xl mx-auto relative mt-8">
      <div className="absolute right-5 top-5 flex gap-2">
        <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold tracking-wide bg-red-950 text-red-200 border border-red-700">
          <svg className="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
          Admin
        </span>
        <button
          className="ml-2 px-3 py-1 text-sm font-medium bg-red-800 text-white rounded-md shadow hover:bg-red-900 transition-colors"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <AvatarCircle />
      <h2 className="text-3xl font-bold text-white text-center mt-2 mb-0.5">{profile.name}</h2>
      <p className="text-center text-zinc-300 mb-6">{profile.role}</p>
      <div className="mb-2">
        <p className="font-semibold">Responsibilities</p>
        <p className="text-zinc-300">{profile.responsibilities}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Contact</p>
        <p className="text-zinc-300">{profile.contact}</p>
      </div>
      <div className="mt-2">
        <p className="font-semibold mb-1">Access Level</p>
        <div className="flex flex-wrap gap-2">
          {profile.accessLevels.map(({ label, color }) => (
            <span key={label} className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}