import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";

const Header = () => {
  const menuItems = [
    { text: "ניהול דף הבית", icon: <HomeIcon />, path: "/" },
    { text: "ניהול קורסים", icon: <MenuBookIcon />, path: "/courses" },
    { text: "ניהול צמיחה", icon: <TrendingUpIcon />, path: "/growth" },
    { text: "ניהול השארת פרטים", icon: <ContactMailIcon />, path: "/contact" },
    { text: "ניהול עזרה", icon: <HelpIcon />, path: "/help" },
  ];

  // ✅ במקום reverse() שמשנה את המערך עצמו:
  const menuItemsReversed = [...menuItems].reverse();

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#49c1a5ff" }}>
        <Toolbar sx={{ minHeight: 72 }}>
          {/* Buttons Row */}
          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            {menuItemsReversed.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  minWidth: "auto",
                  px: 2,
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" }, // שיפור קטן להובר
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Title + Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "inherit",
              "&:hover": { opacity: 0.8 },
            }}
          >
            <Typography variant="h6" component="div">
              מערכת ניהול מידע
            </Typography>

            {/* ✅ בלי inline style */}
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/he/thumb/6/63/OnoAcademic.svg/1200px-OnoAcademic.svg.png"
              alt="לוגו המכללה האקדמית אונו"
              sx={{ height: 35, width: "auto" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Right Side Vertical Menu - תיקון למצב כהה */}
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: "72px",
          height: "calc(100vh - 64px - 105px)",
          width: 200,
          bgcolor: "background.paper", // ✅ תיקון: צבע רקע דינמי
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          pt: 3,
          zIndex: 1000,
          borderLeft: "1px solid",
          borderColor: "divider", // ✅ תיקון: צבע גבול דינמי
          boxSizing: "border-box",
        }}
      >
        {menuItemsReversed.map((item) => (
          <Button
            key={`side-${item.text}`}
            color="inherit"
            component={Link}
            to={item.path}
            sx={{
              justifyContent: "flex-start",
              width: "100%",
              color: "text.primary", // ✅ תיקון: צבע טקסט שחור ביום ולבן בלילה
              display: "flex",
              flexDirection: "row",
              gap: 1,
              "&:hover": { bgcolor: "action.hover" }, // ✅ תיקון: צבע הובר סטנדרטי
            }}
          >
            {item.icon}
            {/* ✅ בלי span עם style */}
            <Box component="span" sx={{ mr: 1 }}>
              {item.text}
            </Box>
          </Button>
        ))}
      </Box>
    </>
  );
};

export default Header;