/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  plugins: [require("daisyui")],
  daisyui: { themes: ["pastel"] },
}
