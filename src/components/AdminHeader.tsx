import { Link, useNavigate } from "react-router-dom"; // הוספנו useNavigate
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person"; // אייקון למשתמש

export default function AdminHeader() {
  const navigate = useNavigate(); // מאפשר מעבר עמודים

  const menuItems = [
    { text: "דף הבית", icon: <HomeIcon />, path: "/admin" },
    { text: "ניהול קורסים", icon: <MenuBookIcon />, path: "/admin/courses" },
    { text: "ניהול פניות", icon: <ContactMailIcon />, path: "/admin/contact" },
    { text: "אפשרויות צמיחה", icon: <TrendingUpIcon />, path: "/admin/growth" },
    { text: "עזרה", icon: <HelpIcon />, path: "/admin/help" },
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
        {/* לוגו */}
        <Typography
          variant="h6"
          component={Link}
          to="/admin"
          sx={{
            fontWeight: 700,
            textDecoration: "none",
            color: "inherit",
            flexShrink: 0,
            ml: 2
          }}
        >
          🔧 מערכת ניהול
        </Typography>

        {/* כפתורי הניווט (באמצע) */}
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

        {/* כפתור מעבר לתצוגת משתמש (בצד שמאל) */}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/user")}
          startIcon={<PersonIcon />}
          sx={{ 
            fontWeight: 700,
            display: { xs: "none", md: "inline-flex" } 
          }}
        >
          מעבר לאתר
        </Button>

      </Toolbar>
    </AppBar>
  );
}