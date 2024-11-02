// pages/index.js

"use client";

import { useState, useEffect } from "react";
import { fetchBins, monitorOnlineStatus } from "./utils/fetchBins";
import "./styles/globals.css";

export default function Home() {
  const [binsData, setBinsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    async function loadBins() {
      try {
        const data = await fetchBins();
        setBinsData(data);
      } catch (err) {
        setError("Failed to fetch BIN data.");
      }
    }

    loadBins();
    const onlineMonitor = monitorOnlineStatus();

    return () => clearInterval(onlineMonitor);
  }, []);

  function handleSearch() {
    const foundBin = binsData.find((bin) => bin.BIN === searchTerm);
    setResult(foundBin || "BIN not found");
  }

  return (
    <div className="container">
      {/* Navigation Menu */}
      <nav className="nav-menu">
        <button onClick={() => setShowInfo(!showInfo)}>Info</button>
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
            </div>
          )}
        </div>
      )}

            {/* Info Section */}
            {showInfo && (
        <div className={`info-section ${showInfo ? "show" : ""}`}>
          <p>This app was made in 20 minutes, please be kind.</p>
          <p>
            {" "}
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
