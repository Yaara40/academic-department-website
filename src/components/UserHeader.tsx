import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider 
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; 

export default function UserHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "דף הבית", icon: <HomeIcon />, path: "/user" },
    { text: "קורסים", icon: <MenuBookIcon />, path: "/user/courses" },
    { text: "אפשרויות צמיחה", icon: <TrendingUpIcon />, path: "/user/growth" },
    { text: "צור קשר", icon: <ContactMailIcon />, path: "/user/contact" },
  ];

  const drawerContent = (
    <Box sx={{ width: 250, pt: 2 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin')}>
                <ListItemIcon><AdminPanelSettingsIcon color="action" /></ListItemIcon>
                <ListItemText primary="כניסת מנהל" />
            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          direction: "rtl",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/user"
            sx={{
              fontWeight: 700,
              textDecoration: "none",
              color: "inherit",
              flexShrink: 0,
              ml: { xs: 2, md: 0 }
            }}
          >
            🎓 מדעי המחשב
          </Typography>

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

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            
            {/* ✅ שינוי ל-endIcon ומרווח קטן */}
            <Button
                variant="outlined" 
                color="inherit"
                endIcon={<AdminPanelSettingsIcon />} // כאן השינוי!
                onClick={() => navigate('/admin')}
                sx={{ 
                    borderColor: 'divider',
                    "&:hover": { borderColor: 'text.primary', bgcolor: 'transparent' },
                    gap: 1 // מרווח נוסף ליתר ביטחון
                }}
            >
                כניסת מנהל
            </Button>

            <Button
                variant="contained"
                color="success"
                component={Link}
                to="/user/contact"
                sx={{ fontWeight: 700 }}
            >
                הרשמה ללימודים
            </Button>
          </Box>

        </Toolbar>
      </AppBar>

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
}