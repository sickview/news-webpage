import React, { useState, useEffect } from 'react';
import Header from './Header';
import FeaturedHero from './FeaturedHero';
import NewsGrid from './NewsGrid';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ArticleModal from './ArticleModal';
import { CATEGORY_TOPICS, FALLBACK_ARTICLES } from './newsCategories';
import './App.css';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const topicKeywords = CATEGORY_TOPICS[activeCategory] || 'news';
    const fetchUrl = `https://en.wikinews.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(topicKeywords)}&utf8=&format=json&origin=*`;

    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        const searchResults = data?.query?.search || [];
        if (searchResults.length > 0) {
          const formatted = searchResults.map((item, i) => ({
            title: item.title,
            snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""),
            url: '#',
            urlToImage: FALLBACK_ARTICLES[activeCategory]?.[i % FALLBACK_ARTICLES[activeCategory].length]?.urlToImage || FALLBACK_ARTICLES.general[0].urlToImage,
            publishedAt: new Date(item.timestamp).toISOString().split('T')[0]
          }));
          setArticles(formatted);
        } else {
          setArticles(FALLBACK_ARTICLES[activeCategory] || FALLBACK_ARTICLES.general);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!isMounted) return;
        setArticles(FALLBACK_ARTICLES[activeCategory] || FALLBACK_ARTICLES.general);
        setLoading(false);
      });

    return () => { isMounted = false; };
  }, [activeCategory]);

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    art.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingArticles = (FALLBACK_ARTICLES[activeCategory] || FALLBACK_ARTICLES.general).slice(0, 3);

  return (
    <div className="app-container">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />
      <main className="main-content">
        <div>
          {loading ? (
            <div className="loading-state">Loading latest channel feeds...</div>
          ) : filteredArticles.length === 0 ? (
            <div className="empty-state">No articles found matching "{searchQuery}".</div>
          ) : (
            <>
              <FeaturedHero articles={filteredArticles} onSelectArticle={setSelectedArticle} />
              <NewsGrid articles={filteredArticles} onSelectArticle={setSelectedArticle} />
            </>
          )}
        </div>
        <Sidebar trendingArticles={trendingArticles} onSelectArticle={setSelectedArticle} />
      </main>
      <Footer />
      <ArticleModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
}