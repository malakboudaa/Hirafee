import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bans = ({ currentUser }) => {
  const [bans, setBans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBans();
  }, []);

  const fetchBans = async () => {
    try {
      const response = await fetch("/api/bans");
      const bansData = await response.json();
      setBans(bansData);
    } catch (error) {
      console.error("Error fetching bans:", error);
    }
  };

  const handleDeleteBan = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/bans/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success(`Ban with ID ${id} has been deleted successfully.`);
        fetchBans();
      } else {
        toast.error(`Failed to delete ban with ID ${id}.`);
      }
    } catch (error) {
      console.error("Error deleting ban:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      setLoading(true);

      const userResponse = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ banned: true }),
      });

      if (userResponse.ok) {
        toast.success(`User with ID ${userId} has been banned.`);
        fetchBans();
      } else {
        toast.error(`Failed to ban user with ID ${userId}.`);
      }
    } catch (error) {
      console.error("Error banning user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      setLoading(true);

      const userResponse = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ banned: false }),
      });

      if (userResponse.ok) {
        toast.success(`User with ID ${userId} has been unbanned.`);
        fetchBans();
      } else {
        toast.error(`Failed to unban user with ID ${userId}.`);
      }
    } catch (error) {
      console.error("Error unbanning user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 pt-16 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Bans</h1>
      <div className="grid grid-cols-1 gap-4">
        {bans.map((ban, index) => (
          <div key={index} className="bg-white rounded shadow p-4">
            <p className="text-gray-600">User ID: {ban.userId}</p>
            <p className="text-gray-600">Reason: {ban.reason}</p>
            <p className="text-gray-600">
              Created At: {new Date(ban.createdAt).toString()}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
              onClick={() => handleDeleteBan(ban.id)}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Ban"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded"
              onClick={() => handleBanUser(ban.userId)}
              disabled={loading}
            >
              {loading ? "Banning..." : "Ban User"}
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 ml-4 rounded"
              onClick={() => handleUnbanUser(ban.userId)}
              disabled={loading}
            >
              {loading ? "Unbanning..." : "Unban User"}
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </main>
  );
};

export default Bans;
