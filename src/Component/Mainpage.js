import React, { useEffect, useState } from 'react';
import Header from './Header';  // Assuming your header is in the same folder

const API_KEY = "1ad14a9b2aaf1a5488fc400ba59fbb20";
const BASE_URL = "https://gnews.io/api/v4/search?";

function MainPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("world");
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 

  // Fetch news on component mount and query change
  useEffect(() => {
    setArticles([]); // Clear articles when a new query is initiated
    setPage(1);      // Reset page number
    setHasMore(true); // Reset hasMore
    fetchNews(query, 1);  // Fetch first page of results for the new query
  }, [query]);

  // Fetch news data from GNews API
  const fetchNews = async (query, page) => {
    const gNewsURL = `${BASE_URL}q=${query}&lang=en&country=us&max=10&page=${page}&apikey=${API_KEY}`;
    setLoading(true);
    try {
      const response = await fetch(gNewsURL);

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Debugging: Log fetched data

      if (data.articles && Array.isArray(data.articles)) {
        const sortedArticles = data.articles.sort(
          (newest, oldest) => new Date(newest.publishedAt) - new Date(oldest.publishedAt)
        );

        // Append new articles to the existing list
        setArticles((prevArticles) => [...prevArticles, ...sortedArticles]);

        // If fewer than 10 articles are returned, we assume there's no more data
        setHasMore(data.articles.length === 10);
      } else {
        setHasMore(false); // No more articles to load
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1); 
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchNews(query, page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
  }, [loading, hasMore]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header query={query} setQuery={setQuery} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <div className="card-container container flex" id="card-container">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div className="card" key={index}>
                <div className="card-header">
                  <img
                    src={article.image || "https://via.placeholder.com/400x200"}
                    alt="news"
                    id="news-img"
                  />
                </div>
                <div className="card-content">
                  <h3 id="news-title">{article.title}</h3>
                  <h6 className="news-source" id="news-source">
                    {`${article.source.name} -- ${new Date(article.publishedAt).toLocaleString()}`}
                  </h6>
                  <p className="news-desc" id="news-desc">{article.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No news articles found for "{query}".</p>
          )}

          {loading && <p>Loading more articles...</p>}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
