import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaSun, FaMoon, FaShieldAlt, FaBook, FaSearch } from 'react-icons/fa';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: FaShieldAlt },
    { path: '/input', label: 'Security Scan', icon: FaSearch },
    { path: '/docs', label: 'Documentation', icon: FaBook },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed w-full z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <FaShieldAlt className="h-6 w-6 text-indigo-600 dark:text-indigo-400 transform transition-transform group-hover:scale-110" />
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                PenTest Pro
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full 
                            transition-all duration-300 transform hover:scale-105
                            ${location.pathname === item.path
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:from-indigo-500 dark:to-purple-500'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300
                       transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
