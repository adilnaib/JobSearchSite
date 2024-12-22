// src/components/Header.js
import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <h1>Interview Scheduler</h1>
      <nav>
        <ul>
          <li>
            <a href="/employer">Employer Dashboard</a>
          </li>
          <li>
            <a href="/jobseeker">Job Seeker Dashboard</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
