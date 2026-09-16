// Wait until the page is fully loaded before touching the DOM
document.addEventListener("DOMContentLoaded", () => {
  const demoUser = {
    email: "demo@fintrack.com",
    password: "fintrack123",
  };

  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const feedback = document.getElementById("feedbackMessage");
  const navLinks = document.getElementById("navLinks");
  const toggleAuthBtn = document.getElementById("toggleAuthBtn");
  const authTitle = document.getElementById("authTitle");

  function showMessage(message, type) {
    feedback.textContent = message;
    feedback.className = type === "error" ? "message-error" : "message-success";
    feedback.classList.remove("hidden");
  }

  function toggleForms(showRegister) {
    if (!loginForm || !registerForm || !authTitle || !toggleAuthBtn) return;

    loginForm.classList.toggle("hidden", showRegister);
    registerForm.classList.toggle("hidden", !showRegister);
    authTitle.textContent = showRegister ? "Create Account" : "Welcome Back";
    toggleAuthBtn.textContent = showRegister ? "Already have an account? Login" : "Need an account? Register";
  }

  const savedUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

  function renderNavigation(isLoggedIn) {
    if (isLoggedIn) {
      navLinks.innerHTML = `
        <li><a href="dashboard.html">Dashboard</a></li>
        <li><a href="analytics.html">Market Rates</a></li>
        <li><a href="goals.html">Savings Goals</a></li>
        <li><a href="profile.html">Profile</a></li>
        <li><a href="#" id="logoutBtn">Logout</a></li>
      `;

      document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("userSession");
        window.location.href = "index.html";
      });
    } else {
      navLinks.innerHTML = "";
    }
  }

  const userSession = JSON.parse(localStorage.getItem("userSession"));
  renderNavigation(!!userSession);
  toggleForms(false);

  if (toggleAuthBtn && registerForm) {
    toggleAuthBtn.addEventListener("click", () => {
      const isRegisterVisible = !registerForm.classList.contains("hidden");
      toggleForms(!isRegisterVisible);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;

      if (!email.includes("@") || password.length < 6) {
        showMessage("Error: Invalid email format or password too short.", "error");
        return;
      }

      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const matchingUser = registeredUsers.find((user) => user.email === email && user.password === password);

      const validDemoUser = email === demoUser.email && password === demoUser.password;

      if (!matchingUser && !validDemoUser) {
        showMessage("Error: Incorrect email or password.", "error");
        return;
      }

      localStorage.setItem("userSession", JSON.stringify({ email, role: "premium_user" }));

      showMessage("Success! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!name || !email.includes("@") || password.length < 6) {
        showMessage("Please enter valid information.", "error");
        return;
      }

      if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "error");
        return;
      }

      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

      const alreadyExists = registeredUsers.some((user) => user.email === email);

      if (alreadyExists) {
        showMessage("This email is already registered.", "error");
        return;
      }

      registeredUsers.push({ name, email, password });

      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
      localStorage.setItem("userSession", JSON.stringify({ email, role: "premium_user" }));

      showMessage("Account created! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    });
  }
});
