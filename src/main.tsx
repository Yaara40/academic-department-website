import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App.tsx";
import "./index.css";

declare module "@mui/material/styles" {
  interface Palette {
    hero: Palette["primary"];
    cardGreen: Palette["primary"];
  }
  interface PaletteOptions {
    hero?: PaletteOptions["primary"];
    cardGreen?: PaletteOptions["primary"];
  }
}

let theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#2c8332",
          light: "#4CAF50",
          dark: "#1B5E20",
          contrastText: "#fff",
        },
        secondary: {
          main: "#8BC34A",
          light: "#AED581",
          dark: "#689F38",
          contrastText: "#000",
        },
        hero: {
          main: "#1a2332",
          contrastText: "#fff",
        },
        cardGreen: {
          main: "#f1f8e9",
          contrastText: "#333",
        },
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#66BB6A",
          light: "#81C784",
          dark: "#388E3C",
          contrastText: "#fff",
        },
        secondary: {
          main: "#9CCC65",
          light: "#D7FFD7",
          dark: "#7CB342",
          contrastText: "#000",
        },
        hero: {
          main: "#0d1117",
          contrastText: "#fff",
        },
        cardGreen: {
          main: "#2c3b2d",
          contrastText: "#eee",
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      },
    },
  },
  typography: {
    fontFamily: "Heebo, Roboto, Arial, sans-serif",
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
