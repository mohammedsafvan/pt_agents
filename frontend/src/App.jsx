import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import LandingPage from "./components/LandingPage";
import InputPage from "./components/InputPage";
import ResultsPage from "./components/ResultsPage";
import Documentation from "./components/Documentation";
import Navbar from "./components/Navbar";

function App() {
	return (
		<DarkModeProvider>
			<Router>
				<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
					<Navbar />
					<main className="pt-16">
						{" "}
						{/* Add padding to account for fixed navbar */}
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/input" element={<InputPage />} />
							<Route path="/results" element={<ResultsPage />} />
							<Route path="/docs" element={<Documentation />} />
						</Routes>
					</main>
				</div>
			</Router>
		</DarkModeProvider>
	);
}

export default App;
