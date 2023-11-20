import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/Profile";
import Router from "next/router";

const artisan = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onClick = (user) => {
    Router.push(`/client/artisan/${user.id}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/profiles");
        const artisanUsers = response.data.filter(
          (user) => user.role === "artisan"
        );
        setUsers(artisanUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  if (currentUser.banned) {
    return (
      <main className="min-h-screen p-4 pt-16">
        <h1 className="text-3xl font-bold mb-8">You are currently Banned</h1>
      </main>
    );
  } else {
    return (
      <main className="min-h-screen p-4 pt-16 flex justify-center">
        <div className="container flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-500 m-8">Artisans</h1>
          <div className="w-full flex flex-col items-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-56 p-2  border border-gray-300 mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-wrap gap-4 justify-center">
            {filteredUsers.map((user) => (
              <Profile
                key={user.id}
                user={user}
                onClick={() => onClick(user)}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }
};

export default artisan;
