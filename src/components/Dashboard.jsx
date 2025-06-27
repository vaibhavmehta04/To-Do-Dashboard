// 📁 src/components/Dashboard.jsx
import React, { useState } from "react";
import RecentTasks from "./RecentTasks";
import Folders from "./Folders";
import Notes from "./Notes";
import CalendarSection from "./Calendar";
import Statistics from "./Statistics";

const Dashboard = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div className="ml-16 grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-base-200 min-h-screen">
      {/* Left section */}
      <div className="space-y-6 col-span-2">
        <RecentTasks selectedFolder={selectedFolder} />
        <Folders
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
        <Statistics />
      </div>

      {/* Right section */}
      <div className="space-y-6 col-span-1">
        <Notes />
        <CalendarSection />
      </div>
    </div>
  );
};

export default Dashboard;
