/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 25%, #ff6b6b 50%, #ffa726 75%, #ff8a50 100%)',
        'mountain-gradient': 'linear-gradient(to bottom, #ff7e5f 0%, #feb47b 30%, #ff9a56 60%, #d67742 100%)',
      },
      colors: {
        'chat-bg': '#0a0a0a',
        'chat-dark': '#1a1a1a',
        'chat-gray': '#2a2a2a',
        'chat-user': '#374151',
        'chat-bot': '#1f2937',
      }
    },
  },
  plugins: [],
} 