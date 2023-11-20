import React, { useEffect, useState } from "react";

const ClientDashboard = ({ currentUser }) => {
  if (currentUser.banned) {
    return (
      <main className="min-h-screen p-4 pt-16">
        <h1 className="text-3xl font-bold mb-8">You are currently Banned</h1>
      </main>
    );
  } else {
    return <main className="min-h-screen p-4 pt-16"></main>;
  }
};

export default ClientDashboard;
