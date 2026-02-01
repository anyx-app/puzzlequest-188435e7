import { Outlet, Link, useLocation } from 'react-router-dom';
import { Gamepad2, Map, Star, User, Menu, X, Music } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Gamepad2 },
    { name: 'World Map', path: '/map', icon: Map },
    { name: 'Rewards', path: '/rewards', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6F61] via-[#FFD700] to-[#32CD32] font-sans text-slate-100 selection:bg-[#32CD32] selection:text-white overflow-x-hidden">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <div className="p-2 bg-white/20 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 backdrop-blur-sm border border-white/40 shadow-inner">
              <Gamepad2 className="w-8 h-8 text-white drop-shadow-md" />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] font-display">
              PuzzleQuest
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-black/10 p-1 rounded-full backdrop-blur-md border border-white/10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-[#FF6F61] shadow-md font-bold'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <link.icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : ''}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Profile / Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/20 transition-colors text-white" aria-label="Toggle Music">
                <Music className="w-6 h-6" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#FF6F61] font-bold border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 transition-all shadow-lg hover:shadow-xl">
              <User className="w-5 h-5" />
              <span>Login</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-[#FF6F61] border-b border-white/20 shadow-2xl md:hidden p-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg"
                >
                  <link.icon className="w-6 h-6" />
                  {link.name}
                </Link>
              ))}
              <button className="w-full py-4 mt-2 rounded-xl bg-white text-[#FF6F61] font-black text-lg shadow-lg">
                LOGIN / SIGNUP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8 md:py-12 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-black/10 backdrop-blur-lg mt-auto">
        <div className="container mx-auto px-4 py-12 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                 <Gamepad2 className="w-6 h-6 text-white" />
                 <h3 className="text-xl font-bold text-white">PuzzleQuest</h3>
              </div>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto md:mx-0">
                An interactive learning journey for children aged 5-12. Solve puzzles, explore worlds, and unlock your potential!
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Game</h4>
              <ul className="space-y-2 text-white/70">
                <li><Link to="/map" className="hover:text-white transition-colors">Worlds</Link></li>
                <li><Link to="/rewards" className="hover:text-white transition-colors">Badges</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Parents</h4>
              <ul className="space-y-2 text-white/70">
                <li><span className="cursor-pointer hover:text-white transition-colors">Progress Tracker</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
                <li><span className="cursor-pointer hover:text-white transition-colors">Safety Guide</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm font-medium">
            © {new Date().getFullYear()} PuzzleQuest. Made with 💖 for Kids.
          </div>
        </div>
      </footer>
    </div>
  );
}
