const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://allinoneplacebackend.onrender.com"
    : "http://localhost:5000";

export { API_BASE_URL };
