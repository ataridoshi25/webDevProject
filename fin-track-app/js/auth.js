// Wait until the page is fully loaded before touching the DOM
document.addEventListener("DOMContentLoaded", () => {
  // Get the login form, message box, and nav container from the page
  const loginForm = document.getElementById("loginForm");
  const feedback = document.getElementById("feedbackMessage");
  const navLinks = document.getElementById("navLinks");

  // Check if the user already has a saved session in browser storage
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  // Build the navigation links depending on whether the user is logged in
  function renderNavigation(isLoggedIn) {
    if (isLoggedIn) {
      // Show links for the logged-in dashboard app
      navLinks.innerHTML = `
        <li><a href="dashboard.html">Dashboard</a></li>
        <li><a href="analytics.html">Market Rates</a></li>
        <li><a href="goals.html">Savings Goals</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="#" id="logoutBtn">Logout</a></li>
      `;

      // Attach a logout click handler to clear the session and return to login
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("userSession");
        window.location.href = "index.html";
      });
    } else {
      // If not logged in, show only the login link
      navLinks.innerHTML = `<li><a href="index.html">Login</a></li>`;
    }
  }

  // Render the nav based on whether a session exists
  renderNavigation(!!userSession);

  // If login form exists, validate input and simulate authentication
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent normal form submission

      // Read the email and password values from the form
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validate basic email and password requirements
      if (!email.includes("@") || password.length < 6) {
        feedback.textContent = "Error: Invalid email format or password too short.";
        feedback.className = "message-error"; // Apply error styling
        return;
      }

      // Simulate a successful login by saving a mock user session
      localStorage.setItem("userSession", JSON.stringify({ email: email, role: "premium_user" }));
      feedback.textContent = "Success! Redirecting...";
      feedback.className = "message-success";

      // Redirect to the dashboard after a short delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    });
  }
});
