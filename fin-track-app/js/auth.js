document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const feedback = document.getElementById("feedbackMessage");
  const navLinks = document.getElementById("navLinks");

  // Check application state for mock login data
  const userSession = JSON.parse(localStorage.getItem("userSession"));

  // Render Navigation Links dynamically based on Authentication state
  function renderNavigation(isLoggedIn) {
    if (isLoggedIn) {
      navLinks.innerHTML = `
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="analytics.html">Market Rates</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
            `;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("userSession");
        window.location.href = "index.html";
      });
    } else {
      navLinks.innerHTML = `<li><a href="index.html">Login</a></li>`;
    }
  }

  renderNavigation(!!userSession);

  // Form Handling and Constraint Validation API
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email.includes("@") || password.length < 6) {
        feedback.textContent = "Error: Invalid email format or password too short.";
        feedback.className = "message-error"; // Target error styles
        return;
      }

      // Simulate server authentication persistence
      localStorage.setItem("userSession", JSON.stringify({ email: email, role: "premium_user" }));
      feedback.textContent = "Success! Redirecting...";
      feedback.className = "message-success";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    });
  }
});
