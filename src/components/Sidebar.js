import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";

function Sidebar({ query, setQuery, handleSearch, loading }) {
  const [progress, setProgress] = useState(0);
  const [wormActive, setWormActive] = useState(false);
  const wormTimeout = useRef();

  // Fill progress as user types (based on length, max 20 chars)
  useEffect(() => {
    if (!loading && !wormActive) {
      setProgress(query.length === 0 ? 0 : Math.min(query.length / 20, 1));
    }
  }, [query, loading, wormActive]);

  // When loading starts, fill to 100%
  useEffect(() => {
    if (loading) {
      setProgress(1);
    }
    if (!loading && !wormActive) {
      setProgress(0);
    }
  }, [loading, wormActive]);

  function handleRemoveChar(e) {
    e.preventDefault();
    if (query.length > 0) setQuery(query.slice(0, -1));
  }

  function handleInputKeyDown(e) {
    if (e.key === "Enter") {
      triggerWorm();
      handleSearch(e);
      setQuery("");
    }
  }

  function handleFormSubmit(e) {
    triggerWorm();
    handleSearch(e);
    setQuery("");
  }

  function triggerWorm() {
    setWormActive(true);
    setProgress(1);
    clearTimeout(wormTimeout.current);
    wormTimeout.current = setTimeout(() => {
      setWormActive(false);
      setProgress(0);
    }, 600);
  }

  useEffect(() => {
    return () => clearTimeout(wormTimeout.current);
  }, []);

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
      <form
        onSubmit={handleFormSubmit}
        style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}
        autoComplete="off"
      >
        <input
          className="sidebar-search"
          placeholder="Tehran"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          style={{ paddingRight: 36 }}
        />
        <button
          type="button"
          className="sidebar-search-remove"
          onClick={handleRemoveChar}
          tabIndex={-1}
          aria-label="Remove last character"
          disabled={query.length === 0}
        >
          ×
        </button>
      </form>
      <nav className="sidebar-nav">
        <button
          className={`nav-btn active nav-btn-progress`}
          style={{
            "--progress": progress,
          }}
          disabled={loading}
          onClick={triggerWorm}
        >
          Weather
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
