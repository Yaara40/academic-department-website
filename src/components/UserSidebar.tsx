import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "דף הבית", icon: <HomeIcon />, path: "/user" },
    { text: "קורסים", icon: <MenuBookIcon />, path: "/user/courses" },
    { text: "צור קשר", icon: <ContactMailIcon />, path: "/user/contact" },
    { text: "אפשרויות צמיחה", icon: <TrendingUpIcon />, path: "/user/growth" },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        top: 64,
        width: 220,
        height: "calc(100vh - 64px)",
        bgcolor: "background.paper",
        borderLeft: "1px solid",
        borderColor: "divider",
        overflowY: "auto",
        direction: "rtl",
      }}
    >
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.light",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* כפתור חזרה לתצוגת מנהל */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/admin")}
            sx={{
              color: "success.main",
              "&:hover": {
                bgcolor: "success.light",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "success.main" }}>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography fontWeight={700}>חזרה לתצוגת מנהל</Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
