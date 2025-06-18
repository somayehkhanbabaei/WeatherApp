import React, { useRef, useState } from "react";
import "./Sidebar.css";

function Sidebar({ query, setQuery, handleSearch, loading }) {
  const [wormActive, setWormActive] = useState(false);
  const wormTimeout = useRef();

  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setWormActive(true);
    handleSearch(e);
    setQuery("");
    clearTimeout(wormTimeout.current);
    wormTimeout.current = setTimeout(() => setWormActive(false), 600);
  }

  function handleIconClick(e) {
    e.preventDefault();
    handleFormSubmit(e);
  }

  function handleRemoveChar(e) {
    e.preventDefault();
    if (!query) return;
    setQuery(query.slice(0, -1));
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ cursor: "pointer" }} onClick={handleIconClick}>
        {/* Weather search icon SVG */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="22" cy="22" r="12" fill="#61dafb" />
          <ellipse cx="22" cy="22" rx="10" ry="7" fill="#fff" opacity="0.8"/>
          <rect x="32" y="32" width="10" height="4" rx="2" transform="rotate(45 32 32)" fill="#61dafb"/>
        </svg>
      </div>
      <form className="sidebar-search-form" onSubmit={handleFormSubmit} autoComplete="off" style={{ position: "relative", width: "100%" }}>
        <div className="sidebar-search-wrapper">
          <input
            className="sidebar-search"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Tehran"
            disabled={loading}
          />
          <button
            type="button"
            className="sidebar-search-remove"
            onClick={handleRemoveChar}
            disabled={!query || loading}
            aria-label="Remove last character"
          >
            ×
          </button>
        </div>
      </form>
      <nav className="sidebar-nav">
        {/* ...existing nav buttons if any... */}
      </nav>
    </aside>
  );
}

export default Sidebar;
