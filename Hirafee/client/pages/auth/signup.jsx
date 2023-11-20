import { useState, useEffect } from "react";
import useRequest from "@/hooks/use-request";
import Router from "next/router";
import Link from "next/link";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [biography, setBiography] = useState("");

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("no-cat");
  const [role, setRole] = useState("");

  let user;

  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie: selectedCategory, // Set category as empty string for client role
      role,
    },
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setData(data);
        console.log("data");
        console.log(data);
        setSelectedCategory(data[0].name);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    user = await doRequest();
    fetch("/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        belongsTo: user?.id,
        portfolio: [],
        firstName: firstName,
        lastName: lastName,
        username: username,
        phoneNumber: phoneNumber,
        location: location,
        biography: biography,
        categorie: selectedCategory,
        role: role,
      }),
    })
      .then((response) => {
        // Handle the response
      })
      .catch((error) => {
        // Handle the error
      });
  };

  return (
    <main className="py-3 flex justify-center min-h-screen items-center">
      <div className="container p-6 my-10  flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-700 mb-4">Sign Up</h1>
        <div className="w-full md:w-4/5 lg:w-3/5 xl:w-2/5 ">
          <form onSubmit={handleSubmit}>
            <div className="m-4">
              <select
                id="role"
                name="role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <optgroup label="Roles">
                  <option value="client" className="py-2 px-4">
                    Client
                  </option>
                  <option value="artisan" className="py-2 px-4">
                    Artisan
                  </option>
                  <option value="admin" className="py-2 px-4">
                    Admin
                  </option>
                </optgroup>
              </select>
            </div>

            <div className="m-4">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="username"
                name="username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <input
                type="text"
                id="location"
                name="location"
                required
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="m-4">
              <textarea
                id="biography"
                name="biography"
                required
                placeholder="Biography"
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {role !== "artisan" ? null : (
              <div className="m-4">
                <select
                  id="category"
                  name="category"
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {data.length === 0 && (
                    <option value="nocats">Select Category</option>
                  )}

                  {data.length > 0 && (
                    <>
                      <option value="">Select Category</option>
                      {data.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}

            <div className="m-4">
              <input
                type="submit"
                value="Sign Up"
                className="w-full px-4 py-2 text-white bg-secondary rounded-full hover:bg-white cursor-pointer  border border-secondary hover:text-secondary"
              />
            </div>
            <div className="m-4 flex gap-4">
              <p className="text-gray-400 text-md">Already signed up ? </p>
              <Link className="text-blue-500" href="/auth/signin">
                Signin
              </Link>
            </div>
          </form>
          {errors}
        </div>
      </div>
    </main>
  );
};

export default Signup;
