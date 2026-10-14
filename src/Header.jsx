import React from 'react';

export default function Header({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, isDarkMode, setIsDarkMode }) {
  const categories = [
    { id: 'general', label: 'General' },
    { id: 'politics', label: 'Politics' },
    { id: 'business', label: 'Business' },
    { id: 'sports', label: 'Sports' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'technology', label: 'Technology' },
    { id: 'science', label: 'Science' },
    { id: 'health', label: 'Health' }
  ];

  return (
    <header className="header">
      <div className="ticker-bar">
        <span className="ticker-badge">Nigeria Live Feed</span>
        <span>AllDay News Channel — Bringing you verified 24/7 coverage across Lagos, Abuja, and nationwide updates.</span>
      </div>
      <div className="header-top">
        <div className="logo-area">
          <h1>ALLDAY<span>NEWS</span></h1>
          <p>Nigeria News Network</p>
        </div>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search Nigerian news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="theme-toggle"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <nav className="nav-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`nav-tab ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </header>
  );
}