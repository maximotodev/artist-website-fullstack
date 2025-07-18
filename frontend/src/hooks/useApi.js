import { useState, useEffect } from "react";

// Use the production URL from an environment variable, but if it's not available (i.e., in local development),
// fall back to the local Django server's address.
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

// Rename the function to useApi
export function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    // ... rest of the code is identical
    setLoading(true);
    setError(null);

    fetch(`${API_BASE_URL}/api/${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData.error) {
          throw new Error(responseData.error);
        }
        // If data is paginated, we just pass it all through.
        // The component using the hook will decide to use data.results or not.
        setData(responseData);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}
