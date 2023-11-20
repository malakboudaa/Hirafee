import React from "react";

const Profile = ({ user, onClick }) => {
  return (
    <div
      className="hover:cursor-pointer bg-white w-72 rounded-lg hover:shadow-lg border border-gray-300 p-4"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-2">{user.username}</h2>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">First Name:</span> {user.firstName}
      </p>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Last Name:</span> {user.lastName}
      </p>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Location:</span> {user.location}
      </p>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Phone:</span> {user.phoneNumber}
      </p>
      {/* <p className="text-gray-500 mb-2">
        <span className="font-semibold">Biography:</span> {user.biography}
      </p> */}
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Category:</span> {user.categorie}
      </p>
    </div>
  );
};

export default Profile;
