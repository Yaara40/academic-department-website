import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// אייקונים
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "ניהול דף הבית", icon: <HomeIcon />, path: "/" },
    { text: "ניהול קורסים", icon: <MenuBookIcon />, path: "/courses" },
    { text: "ניהול צמיחה", icon: <TrendingUpIcon />, path: "/growth" },
    { text: "ניהול השארת פרטים", icon: <ContactMailIcon />, path: "/contact" },
    { text: "ניהול עזרה", icon: <HelpIcon />, path: "/help" },
  ];

  const menuItemsReversed = [...menuItems].reverse();

  // תוכן המגירה לנייד
  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItemsReversed.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#49c1a5ff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ minHeight: 72 }}>
          
          {/* כפתור המבורגר - מופיע רק בטלפון (xs) */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }} 
          >
            <MenuIcon />
          </IconButton>

          {/* ✅ תיקון: החזרנו את הכפתורים העליונים למחשב (md ומעלה) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
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
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* לוגו וכותרת */}
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
              // בנייד הלוגו יזוז שמאלה כי הכפתורים נעלמים
              marginLeft: { xs: "auto", md: 0 } 
            }}
          >
            <Typography variant="h6" component="div">
              מערכת ניהול מידע
            </Typography>

            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/he/thumb/6/63/OnoAcademic.svg/1200px-OnoAcademic.svg.png"
              alt="לוגו"
              sx={{ height: 35, width: "auto" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* תפריט צדדי קבוע - למחשב בלבד */}
      <Box
        sx={{
          position: "fixed",
          right: 0,
          top: "72px",
          height: "calc(100vh - 72px)",
          width: 200,
          bgcolor: "background.paper", // צבע מותאם ללילה
          display: { xs: "none", md: "flex" }, // מופיע רק במחשב
          flexDirection: "column",
          gap: 1,
          p: 2,
          pt: 3,
          zIndex: 1000,
          borderLeft: "1px solid",
          borderColor: "divider",
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
              color: "text.primary", // צבע טקסט מותאם
              display: "flex",
              flexDirection: "row",
              gap: 1,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            {item.icon}
            <Box component="span" sx={{ mr: 1 }}>
              {item.text}
            </Box>
          </Button>
        ))}
      </Box>

      {/* תפריט נשלף (Drawer) - לטלפון בלבד */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Header;