import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Avatar,
  Chip,
  CardMedia,
  CardActionArea,
  LinearProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getAllRequirements } from "../firebase/requirements";
import { getAllArticles } from "../firebase/articles";
import { getAllTestimonials } from "../firebase/testimonials";
import type { Requirement } from "../models/Home";
import type { Article } from "../models/Home";
import type { Testimonial } from "../models/Home";
import ThemeToggle from "../components/ThemeToggle";

export default function UserHome() {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
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

    const loadData = async () => {
      try {
        const [reqData, artData, testData] = await Promise.all([
          getAllRequirements(),
          getAllArticles(),
          getAllTestimonials(),
        ]);
        setRequirements(reqData.slice(0, 4));
        setArticles(artData.slice(0, 3));
        setTestimonials(testData.slice(0, 3));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();

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
      {}
      {pageLoading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      {}
      <Box
        sx={{
          position: "absolute",
          top: 110,
          right: 40,
          zIndex: 1000,
        }}
      >
        <ThemeToggle />
      </Box>

      {}
      <Box
        sx={{
          minHeight: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" font-size="12" fill="%23ffffff" opacity="0.05" font-family="monospace"></text></svg>')`,
            backgroundRepeat: "repeat",
            bgcolor: "hero.main",
            opacity: 0.85,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", color: "white" }}>
            {}
            <Chip
              label="ההרשמה לשנת הלימודים 2026 פתוחה"
              color="primary"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: "0.9rem",
              }}
            />

            {}
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              תואר ראשון במדעי המחשב
            </Typography>
            {}
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                maxWidth: 800,
                mx: "auto",
                opacity: 0.9,
                lineHeight: 1.8,
              }}
            >
              האפשרות הטובה ביותר ללומדים בישראל והחלל לקריירה מרתקת בעולם
              ההייטק. למידה מעשית, מרצים מהתעשייה, והכנה מושלמת לשוק העבודה.
            </Typography>

            {}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                }}
                onClick={() => navigate("/user/contact")}
              >
                הרשמה עכשיו ←
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "white",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
                onClick={() => navigate("/user/courses")}
              >
                רשימת קורסים
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
              alt="סטודנטים"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight={900} gutterBottom>
              למה לבחור בנו?
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              המחלקה למדעי המחשב בקריירה האקדמית אונו מציעה תוכנית לימודים
              מתקדמת המשלבת תיאוריה עם פרקטיקה, ומכינה את הסטודנטים לאתגרי עולם
              ההייטק.
            </Typography>
            <Box sx={{ mt: 3 }}>
              {[
                "מרצים מהתעשייה עם ניסיון מעשי",
                "מעבדות מחשב מתקדמות",
                "פרויקטים בשיתוף חברות הייטק",
                "ליווי והכוונה לקריירה",
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <CheckCircleIcon color="primary" />
                  <Typography variant="body1">{item}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>

      {}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={900}
            textAlign="center"
            gutterBottom
          >
            דרישות התואר
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            כל מה שצריך לדעת על מבנה התואר
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {requirements.map((req) => (
              <Card
                key={req.id}
                sx={{
                  textAlign: "center",
                  p: 3,
                  bgcolor: "background.paper",
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={900}
                  color="primary"
                  gutterBottom
                >
                  {req.value}
                </Typography>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {req.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {req.subtitle}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          fontWeight={900}
          textAlign="center"
          gutterBottom
        >
          מאמרים על המקצוע והתעשייה
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          הישארו מעודכנים בחדשות מעולם ההייטק
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          {articles.map((article) => (
            <Card
              key={article.id}
              sx={{
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
              }}
            >
              <CardActionArea
                component="a"
                href={article.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={article.imageUrl}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {article.title}
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}
                  >
                    {article.tags?.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        color="primary"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>

      {}
      <Box
        sx={{
          bgcolor: "hero.main",
          color: "hero.contrastText",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={900}
            textAlign="center"
            gutterBottom
          >
            מה אומרים הבוגרים
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 6, opacity: 0.8 }}
          >
            סיפורי הצלחה של בוגרי המחלקה
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                sx={{
                  bgcolor: "background.paper",
                  p: 3,
                  height: "100%",
                }}
              >
                {}
                <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon key={star} color="primary" />
                  ))}
                </Box>

                {}
                <Typography
                  variant="body1"
                  color="text.primary"
                  sx={{ mb: 3, fontStyle: "italic", lineHeight: 1.8 }}
                >
                  "{testimonial.text}"
                </Typography>

                {}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: testimonial.color || "primary.main",
                      width: 50,
                      height: 50,
                    }}
                  >
                    {testimonial.initial}
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight={700}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
