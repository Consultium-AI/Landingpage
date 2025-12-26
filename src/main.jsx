// 📁 src/main.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FlashcardsPage from './pages/FlashcardsPage.jsx';
import './index.css';

// Simple hash-based router
function Router() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Route matching
  if (route === '#/flashcards' || route === '#flashcards') {
    return <FlashcardsPage />;
  }

  // Default route: landing page
  return <App />;
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Failed to render app:', error);
  rootElement.innerHTML = '<div style="padding: 20px; color: red;">Error loading application. Please check the console.</div>';
}
