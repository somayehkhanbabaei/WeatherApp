import React from "react";
import "./Sidebar.css";

function Sidebar({ query, setQuery, handleSearch }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {/* Weather search icon SVG */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="22" cy="22" r="12" fill="#61dafb" />
          <ellipse cx="22" cy="22" rx="10" ry="7" fill="#fff" opacity="0.8"/>
          <rect x="32" y="32" width="10" height="4" rx="2" transform="rotate(45 32 32)" fill="#61dafb"/>
        </svg>
      </div>
      <form onSubmit={handleSearch} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          className="sidebar-search"
          placeholder="Tehran"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <nav className="sidebar-nav">
        <button className="nav-btn active">Weather</button>
      </nav>
    </aside>
  );
}

export default Sidebar;
