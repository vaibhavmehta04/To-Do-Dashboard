// 📁 src/App.jsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Loading onFinish={() => setIsLoaded(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex min-h-screen bg-base-200"
        >
          <Sidebar />
          <Dashboard />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
