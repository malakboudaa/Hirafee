import { useState, useEffect } from "react";
import useRequest from "@/hooks/use-request";
import axios from "axios";

const Gigs = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [requirements, setRequirements] = useState("");

  const [count, setCount] = useState(1);
  const [gigsData, setGigsData] = useState([]);
  const [catsData, setCatsData] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editGigId, setEditGigId] = useState(null);

  const { doRequest: addGig, errors: addErrors } = useRequest({
    url: "/api/gigs",
    method: "post",
    body: {
      title,
      description,
      budget,
      location,
      clientId: currentUser.id,
      category,
      requirements,
    },
  });

  const { doRequest: updateGig, errors: updateErrors } = useRequest({
    url: `/api/gigs/${editGigId}`,
    method: "put",
    body: {
      title,
      description,
      budget,
      location,
      category,
      requirements,
    },
    onSuccess: () => {
      setEditMode(false);
      resetForm();
      setCount((prev) => prev + 1);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGig();
    setCount((prev) => prev + 1);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/gigs/${id}`);
    setCount((prev) => prev + 1);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateGig();
  };

  const enableEditMode = (gig) => {
    setEditMode(true);
    setEditGigId(gig.id);
    setTitle(gig.title);
    setDescription(gig.description);
    setBudget(gig.budget);
    setLocation(gig.location);
    setCategory(gig.category);
    setRequirements(gig.requirements);
  };

  const disableEditMode = () => {
    setEditMode(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setBudget(0);
    setLocation("");
    setCategory("");
    setRequirements("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/gigs");
        const filteredData = response.data.filter(
          (gig) => gig.clientId === currentUser.id
        );
        setGigsData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCatsData(data);
        setCategory(data[0]?.name || "");
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, [count]);
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
          <h1 className="text-4xl font-bold text-gray-500 m-4">Own Gigs</h1>
          <div className="w-full flex gap-2 justify-center items-start flex-wrap">
            <div className="w-136 p-4 rounded-lg border">
              <h1 className="text-xl font-bold text-gray-500 m-2">Add a Gig</h1>
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border p-2 rounded"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-2 rounded"
                ></textarea>
                <input
                  type="number"
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border p-2 rounded"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-2 rounded"
                >
                  {catsData.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="border p-2 rounded"
                ></textarea>

                <div className="w-full flex justify-end">
                  <input
                    type="submit"
                    value="Add Gig"
                    className="w-32 p-2 bg-secondary text-white hover:bg-green-600 text-center border rounded-lg cursor-pointer"
                  />
                </div>
              </form>
              {addErrors}
            </div>

            <div className="w-136 p-4 rounded-lg border flex flex-col gap-4">
              <h1 className="text-xl font-bold text-gray-500 m-2">
                Gig's List
              </h1>
              {gigsData == null ? (
                <div>no gigs found</div>
              ) : (
                gigsData.map((gig) => (
                  <div
                    key={gig.id}
                    className="border border-gray-300 rounded-lg"
                  >
                    <div className="p-4 flex flex-col gap-4">
                      <h1 className="text-2xl">
                        <span className="text-gray-500 font-bold">
                          {gig.title}
                        </span>
                      </h1>
                      <p className="text-gray-500">
                        <span className="font-bold">Description: </span>
                        {gig.description}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Budget: </span>
                        {gig.budget}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Location: </span>
                        {gig.location}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Category: </span>
                        {gig.category}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-bold">Requirements: </span>
                        {gig.requirements}
                      </p>

                      <div className="w-full flex justify-end">
                        <button
                          className="w-32 p-2 bg-red-500 text-white hover:bg-red-600 text-center border rounded-lg cursor-pointer"
                          onClick={(e) => handleDelete(e, gig.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="w-32 p-2 bg-blue-500 text-white hover:bg-blue-600 text-center border rounded-lg cursor-pointer"
                          onClick={() => enableEditMode(gig)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal for Edit Form */}
            {editMode && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-136">
                  <h1 className="text-xl font-bold text-gray-500 mb-4">
                    Edit Gig
                  </h1>
                  <form onSubmit={handleEditSubmit}>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded w-full"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <input
                        type="number"
                        placeholder="Budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded w-full"
                      >
                        {catsData.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <textarea
                        placeholder="Requirements"
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        className="border p-2 rounded w-full"
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="w-32 p-2 bg-red-500 text-white hover:bg-red-600 text-center border rounded-lg cursor-pointer mr-2"
                        onClick={disableEditMode}
                      >
                        Cancel
                      </button>
                      <input
                        type="submit"
                        value="Save Changes"
                        className="w-32 p-2 bg-blue-500 text-white hover:bg-blue-600 text-center border rounded-lg cursor-pointer"
                      />
                    </div>
                  </form>
                  {updateErrors}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
};

export default Gigs;
