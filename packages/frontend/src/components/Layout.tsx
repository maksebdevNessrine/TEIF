import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@teif/shared/types';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    // Language switching logic to be implemented
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-emerald-900/30 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <Link to="/invoices" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <span className="font-bold text-slate-950">T</span>
              </div>
              <span className="text-lg font-bold">TEIF Invoice</span>
            </Link>

            {/* Navigation and Controls */}
            <div className="flex items-center space-x-6">
              {/* Navigation Links */}
              <nav className="hidden sm:flex items-center space-x-4">
                <Link
                  to="/invoices"
                  className="text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/invoices/new"
                  className="flex items-center justify-center text-sm text-gray-300 hover:text-emerald-400 transition-colors"
                >
                  New Invoice
                </Link>
              </nav>

              {/* Language Switcher */}
              <div className="flex items-center space-x-2 border-l border-emerald-900/30 pl-6">
                {(['ar', 'fr', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                      language === lang
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-400 hover:text-emerald-400'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-slate-950 bg-emerald-500 hover:bg-emerald-600 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
