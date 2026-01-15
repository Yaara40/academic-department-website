import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HelpIcon from "@mui/icons-material/Help";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "ניהול דף הבית", icon: <HomeIcon />, path: "/admin" },
    { text: "ניהול קורסים", icon: <MenuBookIcon />, path: "/admin/courses" },
    { text: "ניהול פניות", icon: <ContactMailIcon />, path: "/admin/contact" },
    { text: "ניהול צמיחה", icon: <TrendingUpIcon />, path: "/admin/growth" },
    { text: "ניהול עזרה", icon: <HelpIcon />, path: "/admin/help" },
  ];

  return (
    <Box
      sx={{
        width: 240,
        height: "calc(100vh - 64px)",
        position: "fixed",
        right: 0,
        top: 64,
        bgcolor: "background.paper",
        color: "text.primary",
        borderLeft: "1px solid",
        borderColor: "divider",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                textAlign: "right",
                "&.Mui-selected": {
                  bgcolor: "#9CCC65",
                  borderRight: "3px solid",
                  borderColor: "primary.main",
                  "&:hover": { bgcolor: "action.selected" },
                },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: "#7CB342",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body1">{item.text}</Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* מחקנו את הכפתור התחתון שהיה כאן */}
    </Box>
  );
}
