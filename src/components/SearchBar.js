import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [city, setCity] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setCity(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    // Generate simple suggestions based on input
    if (value.length > 2) {
      const commonCities = [
        'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 
        'Moscow', 'Dubai', 'Singapore', 'Sydney', 'Toronto',
        'Beijing', 'Mumbai', 'Cairo', 'Rio de Janeiro', 'Cape Town'
      ];
      
      const filtered = commonCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name..."
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar; 