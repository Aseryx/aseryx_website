import Navigation from './Navigation.jsx';
import Footer from './Footer.jsx';

const PageLayout = ({ children }) => (
  // overflow-x-clip: no horizontal bleed; avoids scroll container that breaks sticky (How scrub)
  <div className="min-h-screen bg-page text-ink font-sans selection:bg-brand-tint selection:text-ink overflow-x-clip">
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
    <Navigation />
    <main id="main-content" tabIndex={-1}>
      {children}
    </main>
    <Footer />
  </div>
);

export default PageLayout;