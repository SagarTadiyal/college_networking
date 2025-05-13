
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function Profile() {
    const { user } = useContext(AuthContext)
    console.log(user);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            {/* Buttons */}
            <div className="mb-6 space-x-2">
                <button
                    className={"px-4 py-2 rounded-md font-semibold bg-blue-600 text-white"}
                >
                    {user?.isAdmin ? "Admin Profile" :
                        "User Profile"}
                </button>


            </div>

            {/* Profile Card */}
            {user?.isAdmin ? (
                <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-8 shadow-lg relative">
                    {/* Admin Tag */}
                    <div className="absolute top-4 right-4 bg-red-700 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <span className="w-2 h-2 bg-white
                         rounded-full"></span>
                        <span>Admin</span>
                    </div>

                    {/* Profile Image */}
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 rounded-full">
                            <img src="./Admin.jpg" alt="admin" className="object-cover rounded-full" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-1">Admin User</h2>
                    <p className="text-center text-gray-300 mb-4">System Administrator</p>

                    <div className="mb-4">
                        <h3 className="font-semibold">Responsibilities</h3>
                        <p className="text-gray-400">Managing system security and user permissions.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold">Administrator Contact</h3>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Access Level</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-red-700 px-3 py-1 rounded-full text-xs">Full Access</span>
                            <span className="bg-red-700 px-3 py-1 rounded-full text-xs">User Management</span>
                            <span className="bg-red-700 px-3 py-1 rounded-full text-xs">System Config</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-md bg-gradient-to-br from-blue-100 to-white text-blue-800 rounded-xl p-8 shadow-lg relative">
                    {/* Student Tag */}
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                        <span className="w-2 h-2 bg-white rounded-full">

                        </span>
                        <span>Student</span>
                    </div>

                    {/* Profile Image */}
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 bg-blue-200 rounded-full">
                            <img src="/user.jpeg" alt="user" className="object-cover rounded-full" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center mb-1">{user?.username}</h2>
                    <p className="text-center text-blue-700 mb-4">Student</p>

                    <div className="mb-4">
                        <h3 className="font-semibold">About</h3>
                        <p className="text-blue-600">
                            Passionate about web development and artificial intelligence.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold">Contact</h3>
                        <p className="text-blue-600">{user?.email}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-blue-200 px-3 py-1 rounded-full text-xs">Web Development</span>
                            <span className="bg-purple-200 px-3 py-1 rounded-full text-xs">AI/ML</span>
                            <span className="bg-purple-200 px-3 py-1 rounded-full text-xs">Data Structures</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}