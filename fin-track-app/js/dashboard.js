// Remove the old shared transaction key so stale entries do not leak between accounts
localStorage.removeItem("finTrackEntries");

// Restore saved ledger entries for the current signed-in user only
const currentUser = JSON.parse(localStorage.getItem("userSession"));
const storageKey = currentUser ? `finTrackEntries_${currentUser.email}` : "finTrackEntries_guest";
let entries = JSON.parse(localStorage.getItem(storageKey) || "[]");

// Grab the form and display elements from the HTML page
const entryForm = document.getElementById("entryForm");
const ledger = document.getElementById("ledgerList");
const balanceDisplay = document.getElementById("totalBalance");

// Save the current list to browser storage so it stays after navigation
function saveEntries() {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

// If the form exists, listen for submit events
if (entryForm) {
  entryForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    // Read input values from the form
    const description = document.getElementById("desc").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);

    // Ignore invalid input
    if (!description || Number.isNaN(amount)) return;

    // Create a transaction object and add it to the array
    const entry = { id: Date.now(), description, amount };
    entries.push(entry);

    // Save the updated list
    saveEntries();

    // Re-render the UI and clear the form
    updateInterface();
    entryForm.reset();
  });
}

// Rebuild the visible transaction list from the current entries array
function updateInterface() {
  ledger.innerHTML = ""; // Clear old rows before drawing the new ones

  // Create a list item for each entry
  entries.forEach((item) => {
    const li = document.createElement("li");
    li.className = "ledger-item";

    // Show description, amount, and delete button
    li.innerHTML = `
      <span>${item.description}</span>
      <span class="${item.amount < 0 ? "neg" : "pos"}">$${item.amount.toFixed(2)}</span>
      <button type="button" onclick="removeEntry(${item.id})">Delete</button>
    `;

    ledger.appendChild(li);
  });

  // Calculate total budget balance by adding all amounts
  const balance = entries.reduce((acc, current) => acc + current.amount, 0);
  balanceDisplay.textContent = `$${balance.toFixed(2)}`;
}

// Remove a transaction by its id, then save and redraw
window.removeEntry = (id) => {
  entries = entries.filter((item) => item.id !== id);
  saveEntries();
  updateInterface();
};

// Draw the current list as soon as the script loads
updateInterface();
