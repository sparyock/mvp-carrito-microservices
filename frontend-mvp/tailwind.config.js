export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f7f7f7',
        'surface-dark': '#121214',
        accent: '#0f4c81',
        neutral: '#6b7280'
      },
      boxShadow: {
        soft: '0 24px 64px rgba(15, 76, 129, 0.12)'
      }
    }
  },
  plugins: []
};
