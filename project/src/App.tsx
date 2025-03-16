import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Predict from './pages/Predict';
import History from './pages/History';
import Guide from './pages/Guide';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from './components/ui/Toaster';
import Footer from './components/Footer';
import { useViewportHeight } from './hooks/useViewportHeight';

function App() {
  useViewportHeight();

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
          <Navbar />
          <AnimatePresence mode="wait">
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/predict" element={<Predict />} />
                <Route path="/history" element={<History />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </AnimatePresence>
          <Toaster />
          <Footer className="mt-auto" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;