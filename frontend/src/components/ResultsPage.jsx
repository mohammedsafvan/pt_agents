import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";
import html2pdf from "html2pdf.js";
import {
	FaCheckCircle,
	FaExclamationTriangle,
	FaSpinner,
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
	const [output, setOutput] = useState(null);
	const outputRef = useRef(null);
	const markdownContentRef = useRef(null);
	const targetHost = location.state?.targetHost || "Unknown Host";

	// Simulated streaming output - Replace with your actual WebSocket or streaming implementation
	useEffect(() => {
		function cleanMarkdownOutput(text) {
			return text
				.replace(/^```markdown\s*/, "")
				.replace(/\s*```$/, "")
				.trim();
		}
		// Fetching for testing with demo data
		fetch("http://localhost:8000/test")
			.then((res) => res.json())
			.then((data) => {
				setOutput(cleanMarkdownOutput(data.result.raw));
			})
			.then(() => {
				setStatus("completed");
			});
	}, []);

	const handleExport = () => {
		const element = markdownContentRef.current;
		if (!element) return;

		// For PDF with proper markdown rendering
		const opt = {
			margin: 10,
			filename: `scan_results_${targetHost}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2, useCORS: true, logging: false },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
		};

		html2pdf().from(element).set(opt).save();
	};

	// Export as markdown file
	const exportMarkdown = () => {
		if (!output) return;

		const blob = new Blob([output], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `scan_results_${targetHost}.md`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="px-4 py-8 max-w-7xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="mx-auto flex flex-col"
			>
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl min-w-full flex flex-col flex-grow">
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
								Export as PDF
							</button>
							<button
								onClick={exportMarkdown}
								className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 
                         bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 
                         transition-colors duration-200"
							>
								<FaDownload className="w-4 h-4 mr-2" />
								Export as Markdown
							</button>
						</div>
					</div>

					{/* Output - Now expanded to fill available space with bottom margin */}
					<div
						ref={outputRef}
						className="p-6 bg-gray-50 dark:bg-gray-900 flex-grow overflow-auto font-mono mb-6"
					>
						{output ? (
							<div
								ref={markdownContentRef}
								className="markdown-body"
								style={{ padding: "20px" }}
							>
								<Markdown remarkPlugins={[remarkGfm]}>{output}</Markdown>
							</div>
						) : (
							<div className="flex h-full items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
								<FaSpinner className="w-16 h-9 animate-spin" />
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default ResultsPage;
