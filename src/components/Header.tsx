import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpIcon from "@mui/icons-material/Help";

export default function Header() {
  const menuItems = [
    { text: "דף הבית", icon: <HomeIcon />, path: "/" },
    { text: "קורסים", icon: <MenuBookIcon />, path: "/courses" },
    { text: "אפשרויות צמיחה", icon: <TrendingUpIcon />, path: "/growth" },
    { text: "צור קשר", icon: <ContactMailIcon />, path: "/contact" },
    { text: "עזרה", icon: <HelpIcon />, path: "/help" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        boxShadow: 1,
        zIndex: 1100,
        direction: "rtl",
      }}
    >
      <Toolbar>
        {/* לוגו/כותרת */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
          }}
        >
          מדעי המחשב
        </Typography>

        {/* כפתורים - מרכז */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: 1,
            justifyContent: "center",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: "text.primary",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {/* כפתור הרשמה */}
        <Button
          variant="contained"
          color="success"
          component={Link}
          to="/contact"
          sx={{
            fontWeight: 700,
            display: { xs: "none", md: "inline-flex" },
          }}
        >
          הרשמה ללימודים
        </Button>
      </Toolbar>
    </AppBar>
  );
}
