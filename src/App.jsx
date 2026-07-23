import { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingBlobs from './components/effects/FloatingBlobs';
import ParticlesBackground from './components/effects/ParticlesBackground';
import CustomCursor from './components/effects/CustomCursor';
import ScrollProgressBar from './components/effects/ScrollProgressBar';
import BackToTop from './components/effects/BackToTop';
import LoadingScreen from './components/effects/LoadingScreen';
import CommandPalette from './components/effects/CommandPalette';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UpdateToast from './pwa/UpdateToast';
import useScrollToHash from './hooks/useScrollToHash';

// Needs router context, so it can't live in App() itself - App renders
// BrowserRouter as a child, it isn't inside it.
function ScrollToHash() {
  useScrollToHash();
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}

      {/* import.meta.env.BASE_URL mirrors vite.config.js `base`, so routing
          keeps working whether the app is served from "/" (dev) or the
          GitHub Pages project path "/my-portfolio/" (production). */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollToHash />

        <div className="relative min-h-screen">
          <FloatingBlobs />
          <ParticlesBackground />
          <CustomCursor />
          <ScrollProgressBar />
          <CommandPalette />

          <Navbar />

          <main id="main-content">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <BackToTop />
          <UpdateToast />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
