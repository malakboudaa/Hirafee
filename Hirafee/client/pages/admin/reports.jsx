import React, { useEffect, useState } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [bans, setBans] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    fetchReports();
    fetchGigs();
    fetchBans();
  }, [count]);

  const fetchReports = async () => {
    try {
      const responseReports = await fetch("/api/reports");
      if (!responseReports.ok) {
        throw new Error("Failed to fetch reports.");
      }
      const reportsData = await responseReports.json();
      setCount((prev) => prev + 1);
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const fetchGigs = async () => {
    try {
      const responseGigs = await fetch("/api/gigs");
      if (!responseGigs.ok) {
        throw new Error("Failed to fetch gigs.");
      }
      const gigsData = await responseGigs.json();
      setGigs(gigsData);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  const fetchBans = async () => {
    try {
      const responseBans = await fetch("/api/bans");
      if (!responseBans.ok) {
        throw new Error("Failed to fetch bans.");
      }
      const bansData = await responseBans.json();
      setBans(bansData);
    } catch (error) {
      console.error("Error fetching bans:", error);
    }
  };

  const handleBan = async (reportedItemId) => {
    const foundGig = gigs.find((gig) => gig.id === reportedItemId);
    if (!foundGig) {
      console.error("Gig not found.");
      return;
    }

    const gigOwnerId = foundGig.clientId;

    const isBanned = bans.some((ban) => ban.userId === gigOwnerId);
    if (isBanned) {
      console.log("User is already banned.");
      return;
    }

    try {
      const responseBan = await fetch("/api/bans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: gigOwnerId,
          reason: "Violation of terms",
          createdAt: new Date(),
        }),
      });

      if (!responseBan.ok) {
        throw new Error("Failed to create ban.");
      }

      console.log("Ban created successfully.");
    } catch (error) {
      console.error("Error creating ban:", error);
    }
  };

  const handleCancelBan = async (reportedItemId) => {
    const foundGig = gigs.find((gig) => gig.id === reportedItemId);
    if (!foundGig) {
      console.error("Gig not found.");
      return;
    }

    const gigOwnerId = foundGig.clientId;

    const foundBan = bans.find((ban) => ban.userId === gigOwnerId);
    if (!foundBan) {
      console.error("Ban not found.");
      return;
    }

    try {
      const responseCancelBan = await fetch(`/api/bans/${foundBan.id}`, {
        method: "DELETE",
      });

      if (!responseCancelBan.ok) {
        throw new Error("Failed to cancel ban.");
      }

      console.log("Ban cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling ban:", error);
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      const responseDeleteReport = await fetch(`/api/reports/${reportId}`, {
        method: "DELETE",
      });

      if (!responseDeleteReport.ok) {
        throw new Error("Failed to delete report.");
      }

      console.log("Report deleted successfully.");
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-16 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, index) => (
          <div
            key={report.reportedItemId}
            className="bg-white rounded shadow p-4"
          >
            <p className="text-gray-600">
              Reported Item ID: {report.reportedItemId}
            </p>
            <p className="text-gray-600">Type: {report.type}</p>
            <p className="text-gray-600">Reason: {report.reason}</p>
            <p className="text-gray-600">State: {report.state}</p>
            <p className="text-gray-600">
              Created At: {new Date(report.createdAt).toString()}
            </p>
            {report.type === "gig" && (
              <>
                <button
                  className={`${
                    bans.some(
                      (ban) =>
                        ban.userId ===
                        gigs.find((gig) => gig.id === report.reportedItemId)
                          ?.clientId
                    )
                      ? "bg-red-500 opacity-50 cursor-not-allowed"
                      : "bg-red-500"
                  } text-white rounded px-4 py-2 mt-2 mr-2`}
                  onClick={() => handleBan(report.reportedItemId)}
                  disabled={bans.some(
                    (ban) =>
                      ban.userId ===
                      gigs.find((gig) => gig.id === report.reportedItemId)
                        ?.clientId
                  )}
                >
                  Schedule Ban
                </button>
                <button
                  className={`${
                    !bans.some(
                      (ban) =>
                        ban.userId ===
                        gigs.find((gig) => gig.id === report.reportedItemId)
                          ?.clientId
                    )
                      ? "bg-gray-500 opacity-50 cursor-not-allowed"
                      : "bg-gray-500"
                  } text-white rounded px-4 py-2 mt-2 mr-2`}
                  onClick={() => handleCancelBan(report.reportedItemId)}
                  disabled={
                    !bans.some(
                      (ban) =>
                        ban.userId ===
                        gigs.find((gig) => gig.id === report.reportedItemId)
                          ?.clientId
                    )
                  }
                >
                  Cancel Scheduled Ban
                </button>
              </>
            )}
            <button
              className="bg-red-500 text-white rounded px-4 py-2 mt-2"
              onClick={() => handleDeleteReport(report.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
