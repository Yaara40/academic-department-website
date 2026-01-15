import { Box, Card, CardContent, Typography } from "@mui/material";
import RequirementsForm from "./RequirementsForm";
import ArticlesForm from "./ArticlesForm";
import TestimonialsForm from "./TestimonialsForm";
import ContactForm from "../../contact/ContactForm";

export default function HomeList() {
  // שימוש בשמות הסמנטיים שהגדרנו ב-Theme
  const stats = [
    { title: "סה״כ קורסים", value: "12", color: "#E8F5E9" },
    { title: "מועמדים פעילים", value: "4", color: "#E8F5E9" },
    { title: "בוגרים", value: "120", color: "#E8F5E9" },
    { title: "שיעור השמה", value: "95%", color: "#E8F5E9" },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((stat, index) => (
          // bgcolor: stat.color מושך עכשיו את הצבע הנכון מה-Theme
          <Card key={index} sx={{ bgcolor: stat.color }}>
            <CardContent sx={{ textAlign: "center" }}>
              {/* הסרנו את הצבעים הקשיחים! עכשיו זה יסתדר אוטומטית */}
              <Typography variant="h3" fontWeight={800}>
                {stat.value}
              </Typography>
              <Typography color="text.secondary">{stat.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <RequirementsForm />
      <ArticlesForm />
      <TestimonialsForm />
      <ContactForm />
    </Box>
  );
}
