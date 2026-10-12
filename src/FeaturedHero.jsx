import React from 'react';

export default function FeaturedHero({ articles, onSelectArticle }) {
  if (!articles || articles.length === 0) return null;

  const leadArticle = articles[0];
  const subArticles = articles.slice(1, 3);

  return (
    <div className="hero-section">
      <div className="hero-card" onClick={() => onSelectArticle(leadArticle)}>
        <img src={leadArticle.urlToImage} alt={leadArticle.title} className="hero-image" />
        <span className="category-tag">Breaking Lead Story</span>
        <h2 className="article-title">{leadArticle.title}</h2>
        <p className="article-snippet">{leadArticle.snippet}</p>
      </div>
      <div className="sub-hero-list">
        {subArticles.map((art, idx) => (
          <div key={idx} className="sub-hero-item" onClick={() => onSelectArticle(art)}>
            <span className="category-tag">Update 0{idx + 1}</span>
            <h3 className="article-title" style={{ fontSize: '1.05rem' }}>{art.title}</h3>
            <p className="article-snippet" style={{ fontSize: '0.85rem' }}>{art.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}