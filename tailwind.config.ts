module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        backgroundImage: {
          'cursor-gradient': 'linear-gradient(135deg, #3a5a40, #a7c957, #fcbf49, #d62828)',
          'noise': "url('/noise.png')", 
        },
      },
    },
    plugins: [],
  }
  