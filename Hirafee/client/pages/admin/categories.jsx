import React, { useState, useEffect } from "react";
import useRequest from "@/hooks/use-request";
import axios from "axios";

const Categories = () => {
  const [catName, setCatName] = useState("");
  const [count, setCount] = useState(1);
  const [data, setData] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { doRequest: addCat, errors: addErrors } = useRequest({
    url: "/api/categories",
    method: "post",
    body: {
      name: catName,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCat();
    setCount((prev) => prev + 1);
    setCatName("");
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios.delete(`/api/categories/${id}`);
    setCount((prev) => prev + 1);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/api/categories/${editCategory.id}`,
        editCategory
      );
      // Handle the response if needed
      console.log(response.data);
      setCount((prev) => prev + 1);
      setIsModalOpen(false); // Close the modal after successful update
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/categories");
        setData(response.data);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
      }
    };

    fetchData();
  }, [count]);

  return (
    <main className="flex justify-center p-4 pt-16">
      {/* Drawer */}
      <div className={`fixed top-20 left-0 w-64 h-screen bg-secondary text-white ${isDrawerOpen ? "" : "hidden"}`}>
        <ul className="py-4 px-2">
          <li className="py-2">
            <button
              className="w-full text-left text-white hover:text-gray-300"
              onClick={() => setIsDrawerOpen(false)} >
              Close Drawer
            </button>
          </li>
          <li className="py-2">
          <a href="/admin/bans" className="w-full text-left text-white hover:text-gray-300">
           Bans 
           </a>
          </li>
          <li className="py-2">
          <a href="/admin/reports" className="w-full text-left text-white hover:text-gray-300">
           Reports
           </a>
          </li>
          <li className="py-2">
          <a href="/admin/categories" className="w-full text-left text-white hover:text-gray-300">
           Categories
           </a>
          </li>
        </ul>
      </div>

      <div className="container min-h-screen flex flex-col items-center">
        <div className="w-full h-full sm:w-2/3 md:w-3/5 lg:w-3/5 xl:w-2/5">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-gray-500 font-bold text-2xl">Categories</h1>
            <div className="w-6"></div>
          </div>

          {/* Category List */}
          <div className="w-full border rounded-md hover:shadow-md m-4">
            <form className="flex" onSubmit={handleSubmit}>
              <div className="my-4 ml-4 mr-2 w-5/6">
                <input
                  type="text"
                  id="cat"
                  name="cat"
                  required
                  placeholder="New category name"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4 mr-4 ml-2 w-1/6">
                <input
                  type="submit"
                  value="Add"
                  className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                />
              </div>
            </form>
          </div>

          {data != null &&
            data.map((cat) => {
              return (
                <div
                  key={cat.id}
                  className="w-full border rounded-md hover:shadow-md m-4"
                >
                  <form
                    className="flex items-center"
                    onSubmit={(e) => handleDelete(e, cat.id)}
                  >
                    <h1 className="text-gray-500 my-4 ml-4 mr-2 w-5/6">
                      <span className="font-bold text-gray-900">
                        {cat.name}
                      </span>{" "}
                      category
                    </h1>
                    <div className="my-4 mr-4 ml-2 w-1/6">
                      <button
                        type="button"
                        onClick={() => handleEdit(cat)}
                        className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="my-4 mr-4 ml-2 w-1/6">
                      <input
                        type="submit"
                        value="Delete"
                        className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                      />
                    </div>
                  </form>
                </div>
              );
            })}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6">
            <form
              className="flex flex-col items-center"
              onSubmit={handleEditSubmit}
            >
              <h1 className="text-gray-500 font-bold m-5 text-2xl">
                Edit Category
              </h1>
              <div className="my-4">
                <input
                  type="text"
                  id="editCat"
                  name="editCat"
                  required
                  placeholder="Edit category name"
                  value={editCategory?.name || ""}
                  onChange={(e) =>
                    setEditCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="my-4">
                <input
                  type="submit"
                  value="Update"
                  className="w-full hover:cursor-pointer text-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                />
              </div>
            </form>
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Categories;
