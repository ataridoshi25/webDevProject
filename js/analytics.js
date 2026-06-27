async function fetchMarketRates() {
  const endpoint = "https://open.er-api.com/v6/latest/USD"; // Safe public open database
  const container = document.getElementById("ratesContainer");

  try {
    container.innerHTML = "<p>Loading market data...</p>";
    const response = await fetch(endpoint);

    if (!response.ok) throw new Error("Network latency/error occurred.");

    const data = await response.json();
    const targets = ["EUR", "GBP", "JPY", "CAD"];

    container.innerHTML = "<h3>Base: 1 USD</h3>";
    targets.forEach((currency) => {
      const rateNode = document.createElement("div");
      rateNode.className = "rate-card";
      rateNode.innerHTML = `<strong>${currency}:</strong> ${data.rates[currency].toFixed(4)}`;
      container.appendChild(rateNode);
    });
  } catch (err) {
    container.innerHTML = `<p class="error">Failed to fetch current currency targets: ${err.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", fetchMarketRates);
