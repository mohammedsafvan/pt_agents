import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaTerminal,
  FaDownload,
} from "react-icons/fa";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    running: {
      icon: FaSpinner,
      text: "Scan in Progress",
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    completed: {
      icon: FaCheckCircle,
      text: "Scan Completed",
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    error: {
      icon: FaExclamationTriangle,
      text: "Error",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center px-4 py-2 rounded-full ${config.className}`}
    >
      <Icon
        className={`w-5 h-5 mr-2 ${status === "running" ? "animate-spin" : ""}`}
      />
      <span className="font-medium">{config.text}</span>
    </div>
  );
};

function ResultsPage() {
  const location = useLocation();
  const [status, setStatus] = useState("running");
  const [output, setOutput] = useState([]);
  const outputRef = useRef(null);
  const targetHost = location.state?.targetHost || "Unknown Host";

  // Simulated streaming output - Replace with your actual WebSocket or streaming implementation
  useEffect(() => {
    const sampleOutput = [
      { type: "info", content: "Initializing security scan..." },
      { type: "command", content: "Running port scan..." },
      { type: "warning", content: "Open port detected: 80/tcp" },
      { type: "info", content: "Analyzing web server headers..." },
      { type: "error", content: "Vulnerable SSL configuration detected" },
      { type: "success", content: "Completed initial reconnaissance" },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < sampleOutput.length) {
        setOutput((prev) => [...prev, sampleOutput[index]]);
        index++;
      } else {
        clearInterval(interval);
        setStatus("completed");
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom when new output arrives
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const getOutputClassName = (type) => {
    switch (type) {
      case "error":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      case "command":
        return "text-purple-600 dark:text-purple-400 font-mono";
      default:
        return "text-gray-600 dark:text-gray-300";
    }
  };

  const handleExport = () => {
    const text = output
      .map((line) => `[${line.type.toUpperCase()}] ${line.content}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pentest-results-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Scan Results: {targetHost}
              </h2>
              <StatusBadge status={status} />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExport}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
                         bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 
                         transition-colors duration-200"
              >
                <FaDownload className="w-4 h-4 mr-2" />
                Export Results
              </button>
            </div>
          </div>

          {/* Terminal Output */}
          <div
            ref={outputRef}
            className="p-6 bg-gray-50 dark:bg-gray-900 h-[500px] overflow-y-auto font-mono"
          >
            <div className="space-y-2">
              {output.map((line, index) =>
                line ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start space-x-2 ${getOutputClassName(line.type)}`}
                  >
                    <FaTerminal className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>{line.content}</span>
                  </motion.div>
                ) : null,
              )}
              {status === "running" && (
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary Footer */}
          {status === "completed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Scan Summary
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    3
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Vulnerabilities Found
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    8
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Services Scanned
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    2
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Critical Issues
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ResultsPage;
