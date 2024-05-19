"use client";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [userObjMain, setUserObjMain] = useState();
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    const session = localStorage.getItem("userObj");
    if (session) {
      setUserObjMain(JSON.parse(session));
    } else {
      redirect("/login");
    }
  }, []);

  useEffect(() => {
    console.log("userObjMain : ", userObjMain);
  }, [userObjMain]);

  async function updateUser(userData) {
    try {
      const response = await fetch("/api/updateUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, email: userObjMain.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObj((prevUserObj) => ({
      ...prevUserObj,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User data saved:", userObj);
    try {
      const updatedUser = await updateUser(userObj);
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userObjMain?.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userObjMain?.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={userObjMain?.image}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={userObjMain?.bio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facebook URL
            </label>
            <input
              type="text"
              name="facebook"
              value={userObjMain?.facebook}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Instagram URL
            </label>
            <input
              type="text"
              name="insta"
              value={userObjMain?.insta}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              YouTube URL
            </label>
            <input
              type="text"
              name="youtube"
              value={userObjMain?.youtube}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twitter URL
            </label>
            <input
              type="text"
              name="twitter"
              value={userObjMain?.twitter}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
