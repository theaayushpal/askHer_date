/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // L8: Rose × WarmWhite
        rose: {
          primary:  '#E8A0B0',
          deep:     '#D4607A',
          blush:    '#F5C6D0',
          mist:     '#FDE8ED',
        },
        warm: {
          white:  '#FFF8F5',
          cream:  '#FFF0E8',
        },
        text: {
          dark:  '#3D1A24',
          mid:   '#7A3A4A',
          soft:  '#B06070',
        },
      },
      fontFamily: {
        nunito:   ['"Nunito"', 'sans-serif'],
        dm:       ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        rose: '0 8px 32px rgba(212, 96, 122, 0.15)',
        'rose-md': '0 4px 16px rgba(212, 96, 122, 0.12)',
      },
      borderRadius: {
        card: '20px',
      },
    },
  },
  plugins: [],
}
