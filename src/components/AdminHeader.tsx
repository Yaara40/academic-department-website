import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";

export default function AdminHeader() {
  const navigate = useNavigate();
  const theme = useTheme();

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
      color="secondary"
      sx={{
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
            sx={{ height: 45, width: "auto", objectFit: "contain" }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/admin"
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            מערכת ניהול
          </Typography>
        </Box>

        {/* כפתורי ניווט */}
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
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {item.icon}
              <Box component="span">{item.text}</Box>
            </Button>
          ))}
        </Box>

        {/* מעבר לאתר */}
        <Button
          variant="contained"
          onClick={() => navigate("/user")}
          sx={{
            bgcolor: "background.paper",
            color: theme.palette.primary.dark, // מגיע מה-theme, לא hardcode
            fontWeight: 700,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
            px: 3,
            "&:hover": {
              bgcolor: "action.hover",
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
