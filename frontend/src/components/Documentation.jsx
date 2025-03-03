import React from 'react';
import { FaRocket, FaTools, FaShieldAlt, FaBug } from 'react-icons/fa';

function Documentation() {
  const sections = [
    {
      title: 'Getting Started',
      icon: FaRocket,
      description: 'PenTest Pro is an advanced security testing automation platform that helps identify vulnerabilities in your web applications. Simply enter your target URL and let our AI-powered system do the rest.',
    },
    {
      title: 'Key Features',
      icon: FaTools,
      description: 'Automated vulnerability scanning, real-time monitoring, and detailed reporting. Our platform uses advanced AI to minimize false positives and provide actionable insights.',
    },
    {
      title: 'Security First',
      icon: FaShieldAlt,
      description: 'All scans are performed securely and ethically. We follow industry best practices and compliance requirements to ensure safe and reliable testing.',
    },
    {
      title: 'Smart Detection',
      icon: FaBug,
      description: 'Detect common vulnerabilities including XSS, SQL injection, CSRF, and more. Our intelligent system learns and adapts to new security threats.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn how to use PenTest Pro to secure your web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-8
                       border border-gray-200 dark:border-gray-700 shadow-lg
                       hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-12 h-12 rounded-lg 
                          flex items-center justify-center mb-6 shadow-lg"
              >
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Documentation;
