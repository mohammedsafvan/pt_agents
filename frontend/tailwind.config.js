/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f5f3ff",
					100: "#ede9fe",
					200: "#ddd6fe",
					300: "#c4b5fd",
					400: "#a78bfa",
					500: "#8b5cf6",
					600: "#7c3aed",
					700: "#6d28d9",
					800: "#5b21b6",
					900: "#4c1d95",
				},
			},
			keyframes: {
				gradient: {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "0% 50%",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "100% 50%",
					},
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"fade-in": {
					"0%": {
						opacity: "0",
					},
					"100%": {
						opacity: "1",
					},
				},
			},
			animation: {
				gradient: "gradient 15s ease infinite",
				"fade-in-up": "fade-in-up 0.5s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
			},
			boxShadow: {
				"inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
			},
		},
	},
	plugins: [],
};
