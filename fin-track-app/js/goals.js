document.addEventListener("DOMContentLoaded", () => {
  const goalForm = document.getElementById("goalForm");
  const goalsList = document.getElementById("goalsList");

  localStorage.removeItem("finTrackGoals");

  const currentUser = JSON.parse(localStorage.getItem("userSession"));
  const storageKey = currentUser ? `finTrackGoals_${currentUser.email}` : "finTrackGoals_guest";
  let goals = JSON.parse(localStorage.getItem(storageKey) || "[]");

  function saveGoals() {
    localStorage.setItem(storageKey, JSON.stringify(goals));
  }

  goalForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("goalName").value.trim();
    const target = parseFloat(document.getElementById("targetAmount").value);

    if (!name || Number.isNaN(target)) return;

    const newGoal = { id: Date.now(), name, target };
    goals.push(newGoal);
    saveGoals();

    renderGoals();
    goalForm.reset();
  });

  function renderGoals() {
    goalsList.innerHTML = "";

    if (goals.length === 0) {
      goalsList.innerHTML = "<p>No active savings goals set yet.</p>";
      return;
    }

    goals.forEach((goal) => {
      const card = document.createElement("div");
      card.className = "goal-card";
      card.style.border = "1px solid #e2e8f0";
      card.style.padding = "1rem";
      card.style.margin = "1rem 0";
      card.style.borderRadius = "6px";
      card.style.background = "#ffffff";

      card.innerHTML = `
                <h4>${goal.name}</h4>
                <p>Target: <strong>$${goal.target.toFixed(2)}</strong></p>
                <button class="btn-delete" onclick="deleteGoal(${goal.id})" style="background:#ef4444; color:white; border:none; padding:0.25rem 0.5rem; border-radius:4px; cursor:pointer; margin-top:0.5rem;">Remove</button>
            `;
      goalsList.appendChild(card);
    });
  }

  window.deleteGoal = (id) => {
    goals = goals.filter((g) => g.id !== id);
    saveGoals();
    renderGoals();
  };

  renderGoals();
});
