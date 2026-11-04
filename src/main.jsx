import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { preloadAllPages, preloadRoute } from './pageRoutes.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { blogSlugFromPath } from './data/blog/index.js'
import { loadBlogContent } from './data/blog/loadContent.js'
import './index.css'

const root = document.getElementById('root')

const app = (
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)

function mount() {
  if (root.hasChildNodes()) {
    ReactDOM.hydrateRoot(root, app)
  } else {
    ReactDOM.createRoot(root).render(app)
  }
  // The other pages load once this one is up, so their links open at once
  const idle = window.requestIdleCallback ?? ((run) => setTimeout(run, 1500))
  idle(() => preloadAllPages())
}

// A prerendered page already contains its page and, for a post, its body.
// Load both before hydrating so the first client render matches the server HTML.
const { pathname } = window.location
const slug = blogSlugFromPath(pathname)
const ready = Promise.all([preloadRoute(pathname), slug ? loadBlogContent(slug) : null])
ready.catch(() => null).then(mount)
