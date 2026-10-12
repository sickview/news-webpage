import React from 'react';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <span className="category-tag">Full Report</span>
        <h2 className="article-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>{article.title}</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>Published on {article.publishedAt}</p>
        <img src={article.urlToImage} alt={article.title} style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '4px', marginBottom: '20px' }} />
        <p className="article-snippet" style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>{article.snippet}</p>
        <p className="article-snippet" style={{ fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          AllDay News Channel provides rigorous, independent reporting across global politics, technology, science, and world markets. Complete coverage continues across our 24/7 digital desk.
        </p>
      </div>
    </div>
  );
}