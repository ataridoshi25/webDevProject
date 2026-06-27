# FinTrack - Personal Finance Dashboard & Analytics

## Project Overview
FinTrack is a dynamic, single-user responsive web application built with semantic HTML5, CSS3 (Flexbox), and Vanilla JavaScript. The application allows users to manage their personal budget, track income and expenses, set savings targets, and view live global currency exchange rates via asynchronous data fetching. 

This project was built from scratch to fulfill the Web Development Final Exam criteria, strictly emphasizing DOM manipulation, state persistence via LocalStorage, and API integration without relying on external frameworks.

## Core Features
- **Client-Side Authentication:** Secure-looking gateway simulation that manages user sessions and alters application layout states depending on authentication status.
- **Dynamic Ledger Management (`dashboard.html`):** Imperative DOM manipulation allows users to add, read, and delete financial transactions with real-time balance calculations.
- **Asynchronous Market Analytics (`analytics.html`):** Integrates with a public REST API utilizing the Fetch API and `async/await` syntax to pull current currency exchange data.
- **Savings Goals Tracker (`goals.html`):** An additional dedicated interactive space allowing users to set target savings items and clear them dynamically via event listeners.
- **User Profile Context (`profile.html`):** Reads active authentication states to showcase protected user tier details.
- **Multi-Device Responsive Interface:** Built using mobile-first Flexbox layouts and fluid media queries to ensure compatibility across mobile, tablet, and desktop viewports.

## Architecture & Technologies
- **Frontend:** HTML5 (Semantic Structure), CSS3 (Flexbox, Media Queries, Custom Properties)
- **Scripting Layer:** JavaScript (ES6+, Fetch API, LocalStorage, DOM Exception Handling)
- **Data Source:** Open Exchange Rates API (https://open.er-api.com/)

## Setup & Execution
1. Extract the `fin-track-app.zip` archive.
2. Open the directory using an editor like Visual Studio Code.
3. Launch `index.html` using a local environment host (such as the VS Code Live Server extension) or simply double-click `index.html` to execute the application directly in any modern web browser.
