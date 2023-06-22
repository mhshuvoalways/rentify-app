let baseUrl = "";

if (process.env.NODE_ENV === "production") {
  baseUrl = "https://rent-app-vhzp.onrender.com";
} else {
  baseUrl = "http://localhost:5000";
}

export default baseUrl;
