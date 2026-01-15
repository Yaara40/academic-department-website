import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";

export default function AdminHeader() {
  const navigate = useNavigate();

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
        bgcolor: "#9CCC65", // ירוק ברוקולי בהיר
        color: "white",
        boxShadow: 2,
        zIndex: 1100,
        direction: "rtl",
      }}
    >
      <Toolbar>
        {/* לוגו אונו */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexShrink: 0,
            ml: 2,
          }}
        >
          <Box
            component="img"
            src="https://upload.wikimedia.org/wikipedia/he/thumb/6/63/OnoAcademic.svg/1200px-OnoAcademic.svg.png"
            alt="Ono Academic College"
            sx={{
              height: 45,
              width: "auto",
              objectFit: "contain",
            }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/admin"
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              color: "white",
            }}
          >
            מערכת ניהול
          </Typography>
        </Box>

        {/* כפתורי הניווט (באמצע) */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: 1, // מרווח בין אייקון לטקסט
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              {item.icon}
              <Box component="span">{item.text}</Box>
            </Button>
          ))}
        </Box>

        {/* כפתור מעבר לאתר (בצד שמאל) */}
        <Button
          variant="contained"
          onClick={() => navigate("/user")}
          sx={{
            bgcolor: "white",
            color: "#7CB342", // ירוק על רקע לבן
            fontWeight: 700,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            px: 3,
            "&:hover": {
              bgcolor: "#f5f5f5",
            },
          }}
        >
          <PersonIcon />
          <Box component="span">מעבר לאתר</Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
