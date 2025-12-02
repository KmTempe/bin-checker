// utils/fetchBins.js

export async function fetchBinDetails(bin) {
  try {
    const response = await fetch(`/api/bin?bin=${bin}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Not found
      }
      throw new Error('Failed to fetch BIN details');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching BIN details:", error);
    throw error;
  }
}
