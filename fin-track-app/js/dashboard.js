// Target data structures
let entries = [];

const entryForm = document.getElementById("entryForm"); // Second validated form required
const ledger = document.getElementById("ledgerList");
const balanceDisplay = document.getElementById("totalBalance");

entryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!description || isNaN(amount)) return;

  // Mutate state logic
  const entry = { id: Date.now(), description, amount };
  entries.push(entry);

  updateInterface();
  entryForm.reset();
});

function updateInterface() {
  // Clear display slate
  ledger.innerHTML = "";

  // Imperatively alter DOM structure based on mutated array state
  entries.forEach((item) => {
    const li = document.createElement("li");
    li.className = "ledger-item";
    li.innerHTML = `
            <span>${item.description}</span>
            <span class="${item.amount < 0 ? "neg" : "pos"}">$${item.amount.toFixed(2)}</span>
            <button onclick="removeEntry(${item.id})">Delete</button>
        `;
    ledger.appendChild(li);
  });

  // Reduce data to compute metrics
  const balance = entries.reduce((acc, current) => acc + current.amount, 0);
  balanceDisplay.textContent = `$${balance.toFixed(2)}`;
}

// Global scope bindings to handle structural deletion nodes
window.removeEntry = (id) => {
  entries = entries.filter((item) => item.id !== id);
  updateInterface();
};
