import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const CATEGORY_COLORS: { [key: string]: string } = {
  management: "#FFF3E0",
  international: "#E0F7FA",
  research: "#FCE4EC",
  advanced: "#E8F5E9",
  startup: "#F3E5F5",
  hitech: "#E3F2FD",
};

const ICONS: { [key: string]: { icon: React.ReactNode; color: string } } = {
  management: {
    icon: <NewspaperIcon sx={{ fontSize: 48 }} />,
    color: "#FF9800",
  },
  international: {
    icon: <PublicIcon sx={{ fontSize: 48 }} />,
    color: "#00BCD4",
  },
  research: {
    icon: <ScienceIcon sx={{ fontSize: 48 }} />,
    color: "#E91E63",
  },
  advanced: {
    icon: <SchoolIcon sx={{ fontSize: 48 }} />,
    color: "#2c8332",
  },
  startup: {
    icon: <RocketLaunchIcon sx={{ fontSize: 48 }} />,
    color: "#9C27B0",
  },
  hitech: {
    icon: <LaptopMacIcon sx={{ fontSize: 48 }} />,
    color: "#2196F3",
  },
};

const CAREER_TRACKS = [
  {
    role: "מפתח/ת תוכנה",
    salaryRange: "₪15,000-35,000",
    demand: "גבוה מאוד",
  },
  {
    role: "מהנדס/ת DevOps",
    salaryRange: "₪20,000-40,000",
    demand: "גבוה מאוד",
  },
  {
    role: "מנהל/ת פרויקטים",
    salaryRange: "₪18,000-45,000",
    demand: "גבוה",
  },
  {
    role: "Data Scientist",
    salaryRange: "₪22,000-50,000",
    demand: "גבוה מאוד",
  },
  {
    role: "ארכיטקט/ית תוכנה",
    salaryRange: "₪30,000-60,000",
    demand: "גבוה",
  },
  {
    role: "מנהל/ת מוצר",
    salaryRange: "₪25,000-55,000",
    demand: "גבוה",
  },
];

export default function UserGrowth() {
  const [loading, setLoading] = useState(true);
  const [headerTitle, setHeaderTitle] = useState("ניהול אפשרויות צמיחה");
  const [headerDescription, setHeaderDescription] = useState(
    "מגוון מסלולי פיתוח מקצועי והזדמנויות קריירה לבוגרי תואר ראשון במדעי המחשב בקריירה האקדמית אונו",
  );

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const settingsDocRef = doc(firestore, "siteSettings", "growthOptions");
        const settingsDoc = await getDoc(settingsDocRef);

        if (settingsDoc.exists()) {
          const data = settingsDoc.data();
          if (data.pageTitle) setHeaderTitle(data.pageTitle);
          if (data.pageDescription) setHeaderDescription(data.pageDescription);
        }
      } catch {
        console.log("No page settings found, using defaults");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ direction: "rtl" }}>
        <LinearProgress color="primary" />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ direction: "rtl" }}>
      {}
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
            {headerTitle}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {headerDescription}
          </Typography>
        </Container>
      </Box>

      {}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        {}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            fontWeight={900}
            gutterBottom
            sx={{ textAlign: "center", mb: 1 }}
          >
            לאן אפשר להגיע?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: "center", mb: 4 }}
          >
            התואר פותח דלתות למגוון רחב של אפשרויות קריירה
          </Typography>

          {}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {[
              {
                title: "לימודים מתקדמים",
                description: "המשך לתואר שני ודוקטורט במוסדות מובילים",
                iconKey: "advanced",
              },
              {
                title: "יזמות",
                description: "הקמת סטארט-אפ והפיכה ליזם עם הכלים והידע הנכונים",
                iconKey: "startup",
              },
              {
                title: "קריירה בהייטק",
                description:
                  "תפקידים מובילים בחברות הייטק כמו Google, Microsoft, Meta ועוד",
                iconKey: "hitech",
              },
              {
                title: "מחקר",
                description: "עבודה במכוני מחקר ואקדמיה",
                iconKey: "research",
              },
              {
                title: "קריירה בינלאומית",
                description: 'הזדמנויות עבודה בחברות גלובליות ובחו"ל',
                iconKey: "international",
              },
              {
                title: "ניהול",
                description: "תפקידי ניהול בכירים כמו CTO, VP R&D, ומנהל פיתוח",
                iconKey: "management",
              },
            ].map((item, index) => {
              const iconData = ICONS[item.iconKey] || ICONS["hitech"];
              return (
                <Card
                  key={index}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        bgcolor: CATEGORY_COLORS[item.iconKey] || "#E3F2FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 2,
                        color: iconData.color,
                      }}
                    >
                      {iconData.icon}
                    </Box>

                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {item.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Box>

        {}
        <Box>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <TrendingUpIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
            />
            <Typography variant="h4" fontWeight={900} gutterBottom>
              מסלולי קריירה
            </Typography>
            <Typography variant="body1" color="text.secondary">
              תפקידים מבוקשים בשוק ההייטק
            </Typography>
          </Box>

          {}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {CAREER_TRACKS.map((track, index) => (
              <Card
                key={index}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ textAlign: "center", mb: 3 }}
                  >
                    {track.role}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ mb: 0.5, fontWeight: 600 }}
                      >
                        טווח שכר
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        color="primary"
                      >
                        {track.salaryRange}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                        sx={{ mb: 0.5, fontWeight: 600 }}
                      >
                        ביקוש בשוק
                      </Typography>
                      <Chip
                        label={track.demand}
                        size="small"
                        color={
                          track.demand === "גבוה מאוד" ? "secondary" : "primary"
                        }
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
