import React from 'react';

export default function Sidebar({ onSelectArticle, trendingArticles }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-box">
        <h3 className="sidebar-title">Trending Stories</h3>
        {trendingArticles.map((art, idx) => (
          <div key={idx} className="trending-item" onClick={() => onSelectArticle(art)}>
            <span className="trending-number">0{idx + 1}</span>
            <p className="trending-text">{art.title}</p>
          </div>
        ))}
      </div>
      <div className="sidebar-box">
        <h3 className="sidebar-title">Daily Dispatch</h3>
        <p className="article-snippet" style={{ marginBottom: '16px' }}>
          Get top international headlines and breaking updates delivered straight to your inbox every morning.
        </p>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
          <input type="email" placeholder="Enter your email address" className="newsletter-input" required />
          <button type="submit" className="newsletter-btn">Subscribe</button>
        </form>
      </div>
    </aside>
  );
}