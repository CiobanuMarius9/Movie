import React from "react";

import "./DarkMode.css";
const DarkMode = () => {
  const toggleDarkTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const toggleLightTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "light") {
    toggleLightTheme();
  } else {
    toggleDarkTheme();
  }

  const toggleTheme = (e) => {
    if (e.target.checked) {
      toggleDarkTheme();
    } else {
      toggleLightTheme();
    }
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        defaultChecked={selectedTheme !== "light"}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle" />
    </div>
  );
};

export default DarkMode;
