import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import InputPage from "./components/InputPage";
import ResultsPage from "./components/ResultsPage";
import Navbar from "./components/Navbar";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
				<Navbar />
				<main className="pt-16">
					{" "}
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/input" element={<InputPage />} />
						<Route path="/results" element={<ResultsPage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;
