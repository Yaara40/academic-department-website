import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "hero.main",
        color: "white",
        py: 6,
        mt: "auto",
        direction: "rtl",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {/* מדעי המחשב */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <SchoolIcon sx={{ color: "primary.main" }} />
              <Typography variant="h6" fontWeight={700}>
                מדעי המחשב
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
              תואר ראשון במדעי המחשב עם דגש על הכנה מעשית לעולם ההייטק
            </Typography>
          </Box>

          {/* קישורים מהירים */}
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              קישורים מהירים
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link
                href="/user"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                דף הבית
              </Link>
              <Link
                href="/user/courses"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                קורסים
              </Link>
              <Link
                href="/user/events"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                אירועים
              </Link>
              <Link
                href="/user/growth"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                אפשרויות צמיחה
              </Link>
              <Link
                href="/user/contact"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  opacity: 0.8,
                  "&:hover": { opacity: 1, textDecoration: "underline" },
                }}
              >
                השארת פרטים
              </Link>
            </Box>
          </Box>

          {/* צור קשר */}
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              צור קשר
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  03-5311888
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  cs@ono.ac.il
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  הקריה האקדמית 1, קרית אונו
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* עקבו אחרינו */}
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              עקבו אחרינו
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "rgba(255,255,255,0.1)",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
                component="a"
                href="https://youtube.com"
                target="_blank"
                rel="noopener"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 4,
            pt: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © 2025 הקריה האקדמית אונו - כל הזכויות שמורות
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Link
              href="#"
              sx={{
                color: "white",
                textDecoration: "none",
                opacity: 0.6,
                fontSize: "0.875rem",
                "&:hover": { opacity: 1 },
              }}
            ></Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}