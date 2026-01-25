import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/services/i18n';
import { getFlexDirectionClass, getSpacingClass } from '@/utils/rtl';
import type { Language } from '@teif/shared/types';

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const flexDirClass = getFlexDirectionClass(language);
  const borderDir = getSpacingClass(language, 'border-r', 'border-l');
  const paddingDir = getSpacingClass(language, 'pr-6', 'pl-6');
  const spacingDir = getSpacingClass(language, 'space-x-2 flex-row-reverse', 'space-x-2');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-emerald-900/30 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className={`flex items-center justify-between ${flexDirClass}`}>
            {/* Logo and Title */}
            <Link to="/invoices" className={`flex items-center ${spacingDir}`}>
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-slate-950">T</span>
              </div>
              <span className="text-lg font-bold whitespace-nowrap">TEIF Invoice</span>
            </Link>

            {/* Navigation and Controls */}
            <div className={`flex items-center gap-6 ${flexDirClass}`}>
              {/* Navigation Links */}
              <nav className={`hidden sm:flex items-center gap-4 ${flexDirClass}`}>
                <Link
                  to="/invoices"
                  className="text-sm text-gray-300 hover:text-emerald-400 transition-colors whitespace-nowrap"
                >
                  {t('dashboard')}
                </Link>
                <Link
                  to="/invoices/new"
                  className="flex items-center justify-center text-sm text-gray-300 hover:text-emerald-400 transition-colors whitespace-nowrap"
                >
                  {t('newInvoice')}
                </Link>
              </nav>

              {/* Language Switcher */}
              <div className={`flex items-center gap-2 ${borderDir} border-emerald-900/30 ${paddingDir}`}>
                {(['ar', 'fr', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
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
              <div className={`flex items-center gap-4 ${flexDirClass}`}>
                <span className="text-sm text-gray-400 whitespace-nowrap">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm font-medium text-slate-950 bg-emerald-500 hover:bg-emerald-600 rounded transition-colors whitespace-nowrap"
                >
                  {t('logout')}
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
