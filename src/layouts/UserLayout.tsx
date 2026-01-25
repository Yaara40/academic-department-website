import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Fab,
} from "@mui/material";

import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import ThemeToggle from "../components/ThemeToggle";

export default function UserLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ direction: "rtl", minHeight: "100vh" }}>
      {/* ===== User Header ===== */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ position: "relative", minHeight: 64 }}>
          {/* ===== צד שמאל: Theme + חזרה למנהל ===== */}
          <Box
            sx={{
              position: "absolute",
              left: 16,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ThemeToggle />

            <Button
              onClick={() => navigate("/admin")}
              color="success"
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ fontWeight: 900 }}
            >
              חזרה למנהל
            </Button>
          </Box>

          {/* ===== ניווט משתמש – באמצע ===== */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mx: "auto",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => navigate("/user")}
              color="success"
              variant={isActive("/user") ? "contained" : "text"}
              sx={{ fontWeight: 800 }}
            >
              בית
            </Button>

            <Button
              onClick={() => navigate("/user/courses")}
              color="success"
              variant={isActive("/user/courses") ? "contained" : "text"}
              sx={{ fontWeight: 800 }}
            >
              קורסים
            </Button>

            <Button
              onClick={() => navigate("/user/contact")}
              color="success"
              variant={isActive("/user/contact") ? "contained" : "text"}
              sx={{ fontWeight: 800 }}
            >
              יצירת קשר
            </Button>

            <Button
              onClick={() => navigate("/user/help")}
              color="success"
              startIcon={<HelpOutlineRoundedIcon />}
              variant={isActive("/user/help") ? "contained" : "text"}
              sx={{ fontWeight: 800 }}
            >
              עזרה
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ===== תוכן הדפים ===== */}
      <Box sx={{ px: { xs: 1, md: 2 }, py: 2 }}>
        <Outlet />
      </Box>

      {/* ===== כפתור עזרה צף ===== */}
      <Fab
        onClick={() => navigate("/user/help")}
        color="success"
        variant="extended"
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24,
          zIndex: 9999,
          fontWeight: 900,
        }}
      >
        <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
        עזרה
      </Fab>
    </Box>
  );
}
