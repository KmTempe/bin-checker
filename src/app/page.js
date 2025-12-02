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

  useEffect(() => {
    // Load theme and set initial state
    let themeLink = document.getElementById("theme-style");

    if (!themeLink) {
      themeLink = document.createElement("link");
      themeLink.id = "theme-style";
      themeLink.rel = "stylesheet";

      const handleLoad = () => {
        setLoading(false);
        setTimeout(() => setShowLoadingText(false), 200);
      };

      themeLink.onload = handleLoad;
      themeLink.onerror = handleLoad; // Proceed even if CSS fails

      document.head.appendChild(themeLink);
    } else {
      setLoading(false);
      setShowLoadingText(false);
    }

    const savedTheme = localStorage.getItem("theme");
    themeLink.href = savedTheme === "dark" ? "/styles/dark-globals.css" : "/styles/light-globals.css";
    setIsDarkMode(savedTheme === "dark");

    // Safety timeout in case onload/onerror never fires
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
      setShowLoadingText(false);
    }, 2000);

    return () => clearTimeout(safetyTimeout);
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
        <button onClick={() => window.location.href = 'https://l7feeders.dev/'}>Home</button>
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
              <p><span>BIN:</span> <span>{result.BIN}</span></p>
              <p><span>Brand:</span> <span>{result.Brand}</span></p>
              <p><span>Type:</span> <span>{result.Type}</span></p>
              <p><span>Category:</span> <span>{result.Category}</span></p>
              <p><span>Issuer:</span> <span>{result.Issuer}</span></p>
              <p><span>Issuer Phone:</span> <span>{result.IssuerPhone || "N/A"}</span></p>
              <p>
                <span>Issuer URL:</span>
                <span>
                  <a
                    href={result.IssuerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {result.IssuerUrl || "N/A"}
                  </a>
                </span>
              </p>
              <p><span>Country Code 2:</span> <span>{result.isoCode2}</span></p>
              <p><span>Country Code 3:</span> <span>{result.isoCode3}</span></p>
              <p><span>Country Name:</span> <span>{result.CountryName}</span></p>
              <p className="source-info" style={{ fontSize: '0.8em', color: 'var(--text-secondary)', marginTop: '10px', border: 'none', justifyContent: 'center' }}>
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
