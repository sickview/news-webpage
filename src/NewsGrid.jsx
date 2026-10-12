import React from 'react';

export default function NewsGrid({ articles, onSelectArticle }) {
  const gridArticles = articles.slice(3);

  if (gridArticles.length === 0) return null;

  return (
    <div className="news-grid">
      {gridArticles.map((art, idx) => (
        <div key={idx} className="news-card" onClick={() => onSelectArticle(art)}>
          <img src={art.urlToImage} alt={art.title} />
          <div className="news-card-content">
            <span className="category-tag">Report</span>
            <h3 className="article-title" style={{ fontSize: '1.1rem' }}>{art.title}</h3>
            <p className="article-snippet" style={{ fontSize: '0.9rem' }}>{art.snippet}</p>
          </div>
        </div>
      ))}
    </div>
  );
}