import { useState, useEffect } from "react";
import axios from "axios";

const Gigs = ({ currentUser }) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [reportedItemId, setReportedItemId] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/gigs");
        const filteredData = response.data.filter(
          (gig) => gig.category === currentUser.categorie
        );
        setData(filteredData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("/api/reports");
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, [count]);

  const indexOfLastGig = currentPage * perPage;
  const indexOfFirstGig = indexOfLastGig - perPage;
  const currentGigs =
    data &&
    data.slice(indexOfFirstGig, indexOfLastGig).map((gig) => {
      const isReported = reports.some(
        (report) => report.reportedItemId === gig.id
      );

      return {
        ...gig,
        isReported,
      };
    });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProposal = async (gigId) => {
    try {
      const gig = currentGigs.find((gig) => gig.id === gigId);
      if (!gig) return;
      const updatedProposals = [...gig.proposals, currentUser.id];
      const response = await axios.put(`/api/gigs/${gigId}`, {
        proposals: updatedProposals,
      });
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReport = async () => {
    try {
      const response = await axios.post("/api/reports", {
        type: "gig",
        reportedItemId,
        reason,
      });
      setShowModal(false);
      setReason("");
      setReportedItemId(null);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen p-4 pt-16 flex justify-center">
      <div className="container flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-500 m-4">Gig's List</h1>
        <div className="flex flex-col m-4 p-4 rounded-lg border w-fit">
          <div className="justify-center gap-4 flex flex-wrap">
            {currentGigs &&
              currentGigs.map((gig) => (
                <div key={gig.id} className="border border-gray-300 rounded-lg">
                  <div className="p-4 flex flex-col gap-4 w-80">
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
                      <span className="font-bold">categorie: </span>
                      {gig.category}
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
                      <span className="font-bold">Requirements: </span>
                      {gig.requirements}
                    </p>
                    <button
                      className={`${
                        gig.proposals.includes(currentUser.id) || gig.isReported
                          ? "bg-gray-300 text-gray-400 px-4 py-2 rounded"
                          : "bg-blue-500 text-white px-4 py-2 rounded"
                      }`}
                      onClick={() => handleProposal(gig.id)}
                      disabled={
                        gig.proposals.includes(currentUser.id) || gig.isReported
                      }
                    >
                      {gig.proposals.includes(currentUser.id)
                        ? "Already Proposed"
                        : "Propose"}
                    </button>
                    <button
                      className={`${
                        gig.isReported
                          ? "bg-red-300 text-gray-400 px-4 py-2 rounded"
                          : "bg-red-500 text-white px-4 py-2 rounded"
                      } mt-2`}
                      onClick={() => {
                        setShowModal(true);
                        setReportedItemId(gig.id);
                      }}
                      disabled={gig.isReported}
                    >
                      {gig.isReported ? "Reported" : "Report"}
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-4">
            {data &&
              Array.from({ length: Math.ceil(data.length / perPage) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-2 py-1 mx-1 ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white w-full lg:w-1/2
           p-4 rounded-lg"
          >
            <h1 className="text-2xl font-bold mb-4">Report Gig</h1>
            <textarea
              className="w-full p-2 mb-4 border"
              placeholder="Enter reason for reporting..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleReport}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gigs;
