import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  CircularProgress,
  Container,
  Tabs,
  Tab,
  Button,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { getAllCourses } from "../firebase/courses";
import type { Course } from "../models/Course";

export default function UserCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCourses();
        // מציג רק קורסים פעילים
        const activeCourses = data.filter((c) => c.isActive === true);
        setCourses(activeCourses);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseId.includes(searchTerm);

    const matchesYear = selectedYear === "all" || course.year === selectedYear;

    return matchesSearch && matchesYear;
  });

  const totalCourses = courses.length;
  const totalYears = [...new Set(courses.map((c) => c.year))].length;
  const totalCredits = courses.reduce((sum, c: Course) => {
    const credits =
      typeof c.credits === "string" ? parseInt(c.credits) : c.credits;
    return sum + (credits || 0);
  }, 0);

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
            תוכנית הלימודים
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            תוכנית מקיפה הכוללת קורסי יסוד, התמחות וקורסי בחירה מגוונים
          </Typography>
        </Container>
      </Box>

      {}
      <Container maxWidth="lg" sx={{ mt: -4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 6,
          }}
        >
          <Card sx={{ textAlign: "center", py: 3 }}>
            <MenuBookIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
            <Typography variant="h3" fontWeight={900} color="primary">
              {totalCourses}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              קורסים
            </Typography>
          </Card>

          <Card sx={{ textAlign: "center", py: 3 }}>
            <Box
              component="span"
              sx={{ fontSize: 48, display: "block", mb: 1 }}
            >
              ⏱️
            </Box>
            <Typography variant="h3" fontWeight={900} color="primary">
              {totalYears}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              שנות לימוד
            </Typography>
          </Card>

          <Card sx={{ textAlign: "center", py: 3 }}>
            <Box
              component="span"
              sx={{ fontSize: 48, display: "block", mb: 1 }}
            >
              📚
            </Box>
            <Typography variant="h3" fontWeight={900} color="primary">
              {totalCredits}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              נקודות זכות
            </Typography>
          </Card>
        </Box>

        {}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            color="primary"
            placeholder="חיפוש קורס לפי שם או מספר..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Tabs
            value={selectedYear}
            onChange={(_, newValue) => setSelectedYear(newValue)}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              "& .MuiTab-root": {
                fontWeight: 600,
              },
            }}
          >
            <Tab label="הכל" value="all" />
            <Tab label="שנה א" value="שנה א" />
            <Tab label="שנה ב" value="שנה ב" />
            <Tab label="שנה ג" value="שנה ג" />
          </Tabs>
        </Box>

        {}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            mb: 6,
          }}
        >
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
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
              <CardContent sx={{ flexGrow: 1 }}>
                {}
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: "secondary.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <MenuBookIcon sx={{ fontSize: 32, color: "primary.main" }} />
                </Box>

                {}
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {course.name}
                </Typography>

                {}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {course.year} • סמסטר {course.semester} • {course.credits} נ"ז
                </Typography>

                {}
                {course.isMandatory === true && (
                  <Chip
                    label="חובה"
                    size="small"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  />
                )}

                {}
                {course.syllabus && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    href={course.syllabus}
                    target="_blank"
                    fullWidth
                    sx={{
                      mt: "auto",
                    }}
                  >
                    סילבוס
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        {}
        {filteredCourses.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              לא נמצאו קורסים התואמים את החיפוש 🔍
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              נסה לשנות את מילות החיפוש או הסינון
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
