"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [userObjMain, setUserObjMain] = useState(null);
  const [userObj, setUserObj] = useState();
  const [passkeys, setPasskeys] = useState([]);

  useEffect(() => {
    const session = localStorage.getItem("userObj");
    if (session) {
      const parsedSession = JSON.parse(session);
      setUserObjMain(parsedSession);
      setUserObj(parsedSession);
      setPasskeys(parsedSession.passkeys || []);
    } else {
      redirect("/login");
    }
  }, []);

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
    try {
      const updatedUser = await updateUser(userObj);
      localStorage.setItem("userObj", JSON.stringify(updatedUser));
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const registerPasskey = async () => {
    try {
      const response = await fetch("/api/register-passkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userObjMain.email }),
      });

      if (!response.ok) {
        throw new Error("Failed to register passkey");
      }

      const options = await response.json();
      const credential = await navigator.credentials.create(options);

      await fetch("/api/save-passkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userObjMain.email,
          credential: JSON.stringify(credential),
        }),
      });

      setPasskeys([...passkeys, credential.id]);
      toast.success("Passkey registered successfully");
    } catch (error) {
      console.error("Error registering passkey:", error);
      toast.error("Failed to register passkey");
    }
  };

  const renderInputField = (label, name, type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={userObj?.[name]}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={userObj?.[name]}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderInputField("Name", "name")}
          {renderInputField("Username", "username")}
          {renderInputField("Profile Image URL", "image")}
          {renderInputField("Bio", "bio", "textarea")}
          {renderInputField("Facebook URL", "facebook")}
          {renderInputField("Instagram URL", "insta")}
          {renderInputField("YouTube URL", "youtube")}
          {renderInputField("Twitter URL", "twitter")}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
        <div className="mt-6">
          <h3 className="text-xl font-bold">Register Passkey</h3>
          <button
            onClick={registerPasskey}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register Passkey
          </button>
        </div>
      </div>
    </div>
  );
}
