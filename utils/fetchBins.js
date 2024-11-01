// utils/fetchBins.js
import Papa from "papaparse";

const BINLIST_PERMANENT_OFFLINE = false; // Set to true to force using offline CSV only
const BINLIST = "https://raw.githubusercontent.com/venelinkochev/bin-list-data/refs/heads/master/bin-list-data.csv";

async function fetchOnlineBins() {
  const response = await fetch(BINLIST);

  if (!response.ok) {
    throw new Error('Failed to fetch online CSV');
  }

  const csvText = await response.text();
  return Papa.parse(csvText, { header: true }).data;
}

async function fetchOfflineBins() {
  const offlineResponse = await fetch("/offline-bin-list-data.csv");

  if (!offlineResponse.ok) {
    throw new Error('Failed to fetch offline CSV');
  }

  const offlineCsvText = await offlineResponse.text();
  return Papa.parse(offlineCsvText, { header: true }).data;
}

export async function fetchBins() {
  if (BINLIST_PERMANENT_OFFLINE) {
    try {
      return await fetchOfflineBins();
    } catch (error) {
      console.error("Error fetching offline CSV:", error);
      return []; 
    }
  }

  try {
    // First attempt to fetch online data
    const onlineData = await fetchOnlineBins();
    return onlineData; 
  } catch (error) {
    console.error("Error fetching online CSV:", error);
    
    // If online fetch fails, attempt to fetch offline data
    try {
      const offlineData = await fetchOfflineBins();
      return offlineData; s
    } catch (offlineError) {
      console.error("Error fetching offline CSV:", offlineError);
      return []; 
    }
  }
}

// Continuously check for online availability
export async function monitorOnlineStatus() {
  setInterval(async () => {
    try {
      const response = await fetch(BINLIST);
      if (response.ok) {
        console.log("Online CSV is available again.");
      }
    } catch (error) {
      console.log("Still unable to reach online CSV");
    }
  }, 30000); // Check every 2 seconds
}
