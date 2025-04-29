import React from "react";
import AvatarCircle from "./AvatarCircle";

export default function UserCard({ profile, onEdit }) {
  return (
    <div className="bg-blue-50/80 p-8 rounded-2xl shadow-lg max-w-xl mx-auto relative mt-8">
      <div className="absolute right-5 top-5 flex gap-2">
        <span className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold tracking-wide bg-blue-600 text-white shadow-sm">
          <svg className="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="7" r="4" />
            <path d="M12 11a9 9 0 0 0 9 9.002H3A9 9 0 0 0 12 11Z" />
          </svg>
          Student
        </span>
        <button
          className="ml-2 px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <AvatarCircle />
      <h2 className="text-3xl font-bold text-blue-700 text-center mt-2 mb-0.5">{profile.name}</h2>
      <p className="text-center text-gray-700 mb-6">{profile.role}</p>
      <div className="mb-2">
        <p className="font-semibold">About</p>
        <p className="text-gray-700">{profile.about}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Contact</p>
        <p className="text-gray-700">{profile.contact}</p>
      </div>
      <div className="mt-2">
        <p className="font-semibold mb-1">Interests</p>
        <div className="flex flex-wrap gap-2">
          {profile.interests.map(({ label, color }) => (
            <span key={label} className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}