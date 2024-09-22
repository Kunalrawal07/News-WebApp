import React from 'react';
import { asset } from './Asset/asset';  // Assuming this is for logo or assets
import '../index.css';  // Assuming this contains styles

function Header({ query, setQuery, darkMode, setDarkMode }) {

  const handleSearch = (e) => {
    if ((e.key === 'Enter' || e.type === 'click') && query.trim()) {
      console.log("Search initiated with query:", query); 
    }
  };

  // first method for dark mode
  // const toggleDarkMode = () => {
  //   const newDarkMode = !darkMode;
  //   setDarkMode(newDarkMode);
  //   document.body.classList.toggle('dark-mode', newDarkMode);
  //   document.body.style.color="green";
  // };

  // secound method for darkmode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');

  };

  return (
    <header>
      <nav>
        <div className="main-nav container flex">
          <button className="company-logo" onClick={() => window.location.reload()}>
            <img src={asset.Logo} alt="NEWS Logo" />
          </button>
          <div className="nav-links">
            <ul className="flex">
              <li className="hover-links nav-items" onClick={() => setQuery('finance')}>FINANCE</li>
              <li className="hover-links nav-items" onClick={() => setQuery('politics')}>POLITICS</li>
              <li className="hover-links nav-items" onClick={() => setQuery('defence')}>DEFENCE</li>
            </ul>
          </div>

          <div className="search-bar">
            <input
              type="text"
              className="news-input"
              placeholder="Search News..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src="https://cdn-icons-png.flaticon.com/128/4250/4250972.png" height="30px" alt="Search" />
            </button>
          </div>

          <div>
            <button id="dark-mode-toggle" onClick={toggleDarkMode}>
              <img src="https://cdn-icons-png.flaticon.com/128/12301/12301351.png" height="28px" alt="Dark Mode" />
            </button>
          </div>

          <aside id="top-button" className="fixed">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <i className="fa-solid fa-angle-up" style={{ color: '#ffffff' }}></i>
            </button>
          </aside>
        </div>
      </nav>
    </header>
  );
}

export default Header;
