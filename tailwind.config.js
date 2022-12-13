/** @type {import('tailwindcss').Config} */
module.exports = {
	// darkMode: 'class',
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-color": "#45CDE9",
				"secondary-color": "#7A8FD3",
			},
		},
	},
	plugins: [],
};
