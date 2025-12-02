"use client";

import { useState, useEffect } from "react";
import { fetchBinDetails } from "./utils/fetchBins";
import "./styles/global.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoadingText, setShowLoadingText] = useState(true);

  // Removed initial load of bins

  useEffect(() => {
    // Load theme and set initial state
    let themeLink = document.getElementById("theme-style");

    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = "theme-style";
      themeLink.rel = "stylesheet";
      themeLink.onload = () => {
        setLoading(false);
        setTimeout(() => setShowLoadingText(false), 200);
      };
      document.head.appendChild(themeLink);
    }

    const savedTheme = localStorage.getItem("theme");
    themeLink.href = savedTheme === "dark" ? "/styles/dark-globals.css" : "/styles/light-globals.css";
    setIsDarkMode(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const themeLink = document.getElementById("theme-style");
    if (isDarkMode) {
      themeLink.href = "/styles/light-globals.css";
      localStorage.setItem("theme", "light");
    } else {
      themeLink.href = "/styles/dark-globals.css";
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  async function handleSearch() {
    if (!searchTerm) return;

    setError(null);
    setResult(null);

    try {
      const data = await fetchBinDetails(searchTerm);
      setResult(data || "BIN not found");
    } catch (err) {
      setError("Failed to fetch BIN data.");
    }
  }

  // Loading screen
  if (loading || showLoadingText) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {/* Navigation Menu */}
      <nav className="nav-menu">
        <button onClick={() => setShowInfo(!showInfo)}>Info</button>
        <button onClick={toggleTheme}>
          Switch to {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </nav>

      <h1>BIN Checker</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter BIN number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="results">
          {typeof result === "string" ? (
            <p>{result}</p>
          ) : (
            <div>
              <p>BIN: {result.BIN}</p>
              <p>Brand: {result.Brand}</p>
              <p>Type: {result.Type}</p>
              <p>Category: {result.Category}</p>
              <p>Issuer: {result.Issuer}</p>
              <p>Issuer Phone: {result.IssuerPhone || "N/A"}</p>
              <p>
                Issuer URL:{" "}
                <a
                  href={result.IssuerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {result.IssuerUrl || "N/A"}
                </a>
              </p>
              <p>Country Code 2: {result.isoCode2}</p>
              <p>Country Code 3: {result.isoCode3}</p>
              <p>Country Name: {result.CountryName}</p>
              <p className="source-info" style={{ fontSize: '0.8em', color: '#888', marginTop: '10px' }}>
                Data Source: {result.source}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      {showInfo && (
        <div className={`info-section ${showInfo ? "show" : ""}`}>
          <p>This app was made in 20 minutes, please be kind.</p>
          <p>Version: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
          <p>
            <a
              href="https://github.com/KmTempe/bin-checker/tree/master"
              target="_blank"
              rel="noopener noreferrer"
            >
              KmTempe/bin-checker
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
