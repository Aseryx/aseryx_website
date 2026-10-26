import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { blogSlugFromPath, loadBlogContent } from './data/blog/loadContent.js'
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
}

// A prerendered post already contains its body. Load it before hydrating
// so the first client render matches the server HTML.
const slug = blogSlugFromPath(window.location.pathname)
const ready = slug ? loadBlogContent(slug) : Promise.resolve()
ready.catch(() => null).then(mount)
