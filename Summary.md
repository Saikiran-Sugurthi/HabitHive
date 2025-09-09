# HabitHive Project Summary

## Overview & Approach

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to function as a social habit tracker. The primary goal was to build a complete, end-to-end product that is both functional and secure.

I took a "frontend-first" development approach. I began by building the entire user interface with React using static, mock data. This allowed me to perfect the UI/UX and component structure before writing any backend logic. Once the frontend was complete, I built the backend API specifically to match the data contract established by the frontend. Finally, I integrated the two, replacing the mock data with live API calls.

## Technology Choices

- **React:** Chosen for its component-based architecture, which allowed for a reusable and maintainable UI.
- **Node.js/Express:** Selected for the backend due to its speed in setting up a robust REST API and the benefit of using JavaScript across the full stack.
- **MongoDB:** The NoSQL database was chosen for its flexibility in storing user and habit data, especially for relationships like follower/following lists.
- **JWT Authentication:** Implemented for its stateless and secure standard for protecting API routes.
- **Vercel & Render:** These platforms were chosen for their seamless, Git-based deployment workflows and generous free tiers.

## Challenges Faced & Solutions

A significant challenge I encountered was a series of complex local environment configuration issues. Early in the project, `npm` was failing to install dependencies correctly, leading to a cascade of cryptic `MODULE_NOT_FOUND` errors on the backend and `command not recognized` errors in the terminal.

**Solution:**
I systematically diagnosed the problem.
1. I first isolated the issue to the package manager by switching to **Yarn**, which provided more explicit error messages.
2. Yarn's improved error logging revealed the root cause: an outdated version of **Node.js** on my system was incompatible with the project's dependencies.
3. I resolved this by installing and using **Node Version Manager (NVM)** to upgrade to a stable, compatible version of Node.js.

This process not only fixed the immediate problem but also improved my overall development environment. It was a valuable lesson in methodical debugging and the importance of maintaining a stable and up-to-date toolchain.