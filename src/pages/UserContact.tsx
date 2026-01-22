import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContactForm from "../features/contact/ContactForm";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

export default function UserContact() {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 350);

    const onPageLoading = (e: Event) => {
      const ce = e as CustomEvent<{ loading?: boolean }>;
      if (typeof ce.detail?.loading === "boolean") {
        setPageLoading(ce.detail.loading);
      }
    };

    window.addEventListener("page-loading", onPageLoading as EventListener);
    return () => {
      clearTimeout(t);
      window.removeEventListener(
        "page-loading",
        onPageLoading as EventListener,
      );
    };
  }, []);

  return (
    <Box sx={{ direction: "rtl" }}>
      {pageLoading && <LinearProgress color="primary" />}

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "hero.main",
          color: "hero.contrastText",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={900} gutterBottom>
            צור קשר
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            רוצים לשמוע עוד? השאירו פרטים ונחזור אליכם בהקדם
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -4, mb: 8 }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* טופס יצירת קשר */}
          <Box sx={{ flex: { md: "1 1 60%" } }}>
            <ContactForm />
          </Box>

          {/* פרטי התקשרות */}
          <Box sx={{ flex: { md: "1 1 40%" } }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  פרטי התקשרות
                </Typography>

                <Box sx={{ mt: 3 }}>
                  {/* טלפון */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "secondary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <PhoneIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        טלפון
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        03-531-1888
                      </Typography>
                    </Box>
                  </Box>

                  {/* אימייל */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "secondary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <EmailIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        אימייל
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        cs@ono.ac.il
                      </Typography>
                    </Box>
                  </Box>

                  {/* כתובת */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "secondary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <LocationOnIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        כתובת
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        השדרה האקדמית 1, קרית אונו
                      </Typography>
                    </Box>
                  </Box>

                  {/* שעות פעילות */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "secondary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <AccessTimeIcon color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        שעות פעילות
                      </Typography>
                      <Typography variant="body1" fontWeight={600}>
                        א'-ה': 9:00-17:00
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* מפה */}
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Box
                  component="iframe"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3382.2187426134233!2d34.86823375920072!3d32.03627012157968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4a7f686d93bb%3A0x415afc2aca521e8f!2z15TXp9eo15nXlCDXlNeQ16fXk9ee15nXqiDXkNeV16DXlQ!5e0!3m2!1siw!2sil!4v1768483362989!5m2!1siw!2sil"
                  sx={{
                    width: "100%",
                    height: 300,
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
