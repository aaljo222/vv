import React, { useState, useEffect, useCallback } from "react";
import Particles from "react-tsparticles";
import { tsParticles } from "tsparticles"; // tsParticles로 대체
import { ParticlesParams } from "../Schemas/Particles";

export const Options = () => {
  let lsTheme, lsIcon, lsSnow;

  // Initialize localStorage values
  try {
    lsTheme = localStorage.getItem("theme");
    lsIcon = localStorage.getItem("icon");
    lsSnow = JSON.parse(localStorage.getItem("snow"));
  } catch (e) {
    console.error(`All Cookies blocked - Error: ${e.message}`);
    lsTheme = "light";
    lsIcon = "bx-moon";
    lsSnow = false;
  }

  const [theme, setTheme] = useState(lsTheme || "light");
  const [icon, setIcon] = useState(lsIcon || "bx-moon");
  const [snow, setSnow] = useState(lsSnow);

  // Save state to localStorage and update theme class on body
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("icon", icon);
    localStorage.setItem("snow", JSON.stringify(snow));
    document.body.classList[theme === "dark" ? "add" : "remove"]("dark-theme");
  }, [theme, snow, icon]);

  // Initialize Particles using tsParticles
  const particlesInit = useCallback((engine) => {
    console.log("Initializing tsParticles instance:", engine);
  }, []);

  const particlesOptions = ParticlesParams;

  // Snow effect component
  const SnowEffect = () =>
    snow &&
    theme === "dark" && (
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
    );

  // Toggle snow effect
  const _enableSnow = () => setSnow((prev) => !prev);

  // Toggle theme
  const _toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setIcon((prev) => (prev === "bx-sun" ? "bx-moon" : "bx-sun"));
  };

  return (
    <div className="home__options">
      {theme === "dark" && (
        <i
          className="bx bx-cloud-snow enable-snow"
          title="Activate Snow"
          id="snow-button"
          onClick={_enableSnow}
        />
      )}
      <SnowEffect />
      <i
        className={`bx ${icon} change-theme`}
        title="Toggle Theme"
        id="theme-button"
        onClick={_toggleTheme}
      />
    </div>
  );
};
