import React, { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode") === "true";
    console.log("Initial theme:", storedTheme); // Add this line
    setDarkMode(storedTheme);
    document.body.className = darkMode ? "dark-mode" : "";
  }, []);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;