import React from 'react';
import { User } from '../types';

interface NavigationProps {
  user: User | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onLogout, currentPage, onNavigate, theme, toggleTheme }) => {
  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="relative mr-3">
              <svg className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 animate-glow-pulse"></div>
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SkillNexus</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {user && (
                <>
                  {[
                    { key: 'dashboard', label: 'Dashboard' },
                    { key: 'swap', label: 'Skill Swap' },
                    { key: 'messages', label: ' Messages' },
                    { key: 'statistics', label: ' Statistics' },
                    { key: 'resources', label: 'My Learning' },
                    { key: 'about', label: 'About' }
                  ].map((page) => (
                    <button 
                      key={page.key}
                      onClick={() => onNavigate(page.key)} 
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                        currentPage === page.key 
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <span className="relative z-10">{page.label}</span>
                      {currentPage === page.key && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      )}
                      {currentPage !== page.key && (
                        <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-300 group relative"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              {theme === 'light' ? (
                <div className="relative">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              ) : (
                <div className="relative">
                  <svg className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300 animate-glow-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-400 rounded-full animate-ping"></div>
                </div>
              )}
              <span className="ml-2 text-xs font-medium hidden sm:inline">
                {theme === 'light' ? 'Dark' : 'Light'}
              </span>
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};