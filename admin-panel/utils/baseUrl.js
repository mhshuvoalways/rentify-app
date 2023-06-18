let baseUrl = "";

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://rent-app.cyclic.app";
} else {
  baseUrl = "http://localhost:5000";
}

export default baseUrl;
