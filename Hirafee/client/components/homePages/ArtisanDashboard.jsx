import React, { useEffect, useState } from "react";
import Router from "next/router";
import logo from "@/public/logo.png";
import Image from "next/image";

const ArtisanDashboard = ({ currentUser }) => {
  const [profile, setProfile] = useState(null);
  const [count, setCount] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
  });
  const [addForm, setAddForm] = useState({
    image: null,
    description: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profiles");
        const data = await response.json();
        const foundProfile = data.find(
          (profile) => profile.belongsTo === currentUser.id
        );
        setProfile(foundProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [count]);

  const handleDelete = async () => {
    try {
      await fetch(`/api/profiles/${profile.id}`, {
        method: "DELETE",
        body: {},
      });
      await fetch(`/api/users/${currentUser.id}`, { method: "DELETE" });
      handleSignOut();
      Router.push("/");
      // Perform any additional actions after successful deletion
      // For example, redirect to another page or display a success message
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting profile:", error);
      // Handle error condition, such as displaying an error message
    }
  };

  const handleDeletePortfolioItem = async (index) => {
    try {
      const updatedPortfolio = [...profile.portfolio];
      updatedPortfolio.splice(index, 1);
      const updatedProfile = { ...profile, portfolio: updatedPortfolio };

      await fetch(`/api/profiles/${profile.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await fetch(`/api/users/${currentUser.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCount((prev) => prev + 1);
      // Perform any additional actions after successful update
      // For example, fetch the updated profile data
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      // Handle error condition, such as displaying an error message
    }
  };

  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/profiles/${profile.id}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetch(`/api/users/${currentUser.id}`, {
        method: "PUT",
        body: JSON.stringify(editForm),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Perform any additional actions after successful update
      // For example, fetch the updated profile data
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Handle error condition, such as displaying an error message
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/users/signout", { method: "POST" });
      // Perform any additional actions after successful sign-out
      // For example, redirect to the login page
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error condition, such as displaying an error message
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAddForm({ ...addForm, image: file });
  };

  const handleDescriptionChange = (e) => {
    setAddForm({ ...addForm, description: e.target.value });
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", addForm.image);
      const response = await fetch("https://file.io/?expires=1w", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.link;
      const updatedProfile = {
        ...profile,
        portfolio: [
          ...profile.portfolio,
          { image: imageUrl, description: addForm.description },
        ],
      };
      await fetch(`/api/profiles/${profile.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      await fetch(`/api/users/${currentUser.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProfile),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Perform any additional actions after successful update
      // For example, fetch the updated profile data
      setShowAddModal(false);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      // Handle error condition, such as displaying an error message
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 pt-16">
      <div className="lg:flex">
        <div className="lg:w-1/2 lg:sticky lg:top-0">
          {profile ? (
            <div className="bg-white rounded-lg shadow-lg p-8 mx-auto mb-4 max-w-lg relative">
              <div className="flex justify-between mb-4">
                <button
                  className="p-2 rounded-full bg-red-500 text-white mr-2"
                  onClick={() => {
                    setShowConfirmationModal(true);
                  }}
                >
                  Delete
                </button>
                <button
                  className="p-2 rounded-full bg-blue-500 text-white"
                  onClick={() => setShowEditModal(true)}
                >
                  Edit
                </button>
              </div>
              {/* <Image
                src={logo}
                alt="Profile"
                className="w-40 h-40 rounded-full mx-auto mb-4"
              /> */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600 mb-4">
                <strong>Email:</strong> {profile.email}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Username:</strong> {profile.username}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Phone Number:</strong> {profile.phoneNumber}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {profile.location}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Category:</strong> {profile.categorie}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Biography:</strong> {profile.biography}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No profile found.</p>
          )}
        </div>

        <div className="lg:w-1/2 lg:overflow-auto lg:pl-4">
          {profile && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Portfolio
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {profile.portfolio.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-4 relative"
                  >
                    <button
                      className="p-2 rounded-full bg-red-500 text-white absolute top-0 right-0 m-2"
                      onClick={() => handleDeletePortfolioItem(index)}
                    >
                      Delete
                    </button>
                    <Image
                      src={item.image}
                      alt={`Portfolio Item ${index + 1}`}
                      className="w-full h-40 object-cover rounded"
                      width={300}
                      height={300}
                    />
                    <p className="text-gray-800 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 p-2 rounded-full bg-green-500 text-white"
                onClick={() => setShowAddModal(true)}
              >
                Add Item
              </button>
            </section>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md">
            <p className="text-gray-800 text-lg mb-4">
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </p>
            <div className="flex justify-end">
              <button
                className="p-2 rounded-full bg-red-500 text-white mr-2"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-2 rounded-full bg-green-500 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditFormChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditFormChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditFormChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editForm.phoneNumber}
                  onChange={handleEditFormChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditFormChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="p-2 rounded-full bg-red-500 text-white mr-2"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 rounded-full bg-blue-500 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-10 ">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg max-w-md ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add Portfolio Item
            </h2>
            <form onSubmit={handleAddFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={addForm.description}
                  onChange={handleDescriptionChange}
                  className="border border-gray-400 p-2 rounded w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="p-2 rounded-full bg-red-500 text-white mr-2"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 rounded-full bg-green-500 text-white"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ArtisanDashboard;
