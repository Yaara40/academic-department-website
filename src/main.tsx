import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

import { 
  createTheme, 
  responsiveFontSizes, 
  Experimental_CssVarsProvider as CssVarsProvider 
} from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import { deepPurple, lightGreen, red, yellow } from '@mui/material/colors';

// 1. הרחבת הגדרות ה-Type של MUI כדי שיכיר בצבעים החדשים שלנו
declare module '@mui/material/styles' {
  interface Palette {
    cardGray: string;
    cardBlue: string;
    cardYellow: string;
    cardGreen: string;
    cardPurple: string;
    cardOrange: string;
  }
  interface PaletteOptions {
    cardGray?: string;
    cardBlue?: string;
    cardYellow?: string;
    cardGreen?: string;
    cardPurple?: string;
    cardOrange?: string;
  }
}

// 2. יצירת ה-Theme עם הצבעים המותאמים אישית
let theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: deepPurple,
        secondary: lightGreen,
        // צבעים למצב יום (פסטל בהיר) - הטקסט יהיה שחור
        cardGray: "#f3f4f6",
        cardBlue: "#e0f2fe",
        cardYellow: "#fef3c7",
        cardGreen: "#d1fae5",
        cardPurple: "#e9d5ff",
        cardOrange: "#fed7aa",
      },
    },
    dark: {
      palette: {
        primary: red,
        secondary: yellow,
        // צבעים למצב לילה (כהים ועמוקים) - הטקסט יהיה לבן
        cardGray: "#374151",   // אפור כהה
        cardBlue: "#0c4a6e",   // כחול עמוק
        cardYellow: "#78350f", // חום/כתום כהה
        cardGreen: "#064e3b",  // ירוק יער כהה
        cardPurple: "#581c87", // סגול עמוק
        cardOrange: "#7c2d12", // כתום שרוף
      },
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
});

theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>,
);