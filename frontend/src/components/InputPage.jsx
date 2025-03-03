import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe, FaLock, FaShieldAlt } from 'react-icons/fa';

function InputPage() {
  const [hostLink, setHostLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Navigate to results page with the target host
    navigate('/results', { state: { targetHost: hostLink } });
  };

  const features = [
    {
      icon: FaGlobe,
      title: 'Comprehensive Scanning',
      description: 'Scan web applications, networks, and APIs for vulnerabilities'
    },
    {
      icon: FaLock,
      title: 'Advanced Security',
      description: 'Industry-leading security testing methodologies'
    },
    {
      icon: FaShieldAlt,
      title: 'Real-time Protection',
      description: 'Continuous monitoring and instant alerts'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-8 text-center">
          Launch Security Assessment
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Enter your target URL below to begin a comprehensive security analysis of your web application
        </p>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-12">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <label htmlFor="hostLink" className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                  Target Host URL
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                  <input
                    type="url"
                    id="hostLink"
                    name="hostLink"
                    required
                    value={hostLink}
                    onChange={(e) => setHostLink(e.target.value)}
                    placeholder="https://example.com"
                    className="block w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg
                             focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                             focus:border-transparent transition duration-300 relative z-10
                             placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-20">
                    <FaGlobe className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Enter the complete URL including http:// or https://
                </p>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full py-4 px-8 rounded-xl text-white text-lg font-medium
                          bg-gradient-to-r from-indigo-600 to-purple-600
                          hover:from-indigo-700 hover:to-purple-700
                          shadow-lg hover:shadow-xl transition-all duration-300
                          flex items-center justify-center space-x-3
                          ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Initiating Scan...</span>
                  </>
                ) : (
                  <>
                    <FaShieldAlt className="w-6 h-6" />
                    <span>Start Security Scan</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-700/30 p-12 border-t dark:border-gray-600 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8
                           border border-gray-200 dark:border-gray-700 shadow-lg
                           hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-12 h-12 rounded-lg 
                              flex items-center justify-center mb-6 shadow-lg mx-auto
                              group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default InputPage;
