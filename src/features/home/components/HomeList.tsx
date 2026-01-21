import { Box, Card, CardContent, Typography } from "@mui/material";
import RequirementsForm from "./RequirementsForm";
import ArticlesForm from "./ArticlesForm";
import TestimonialsForm from "./TestimonialsForm";
import ContactForm from "../../contact/ContactForm";

export default function HomeList() {
  const stats = [
    { title: "סה״כ קורסים", value: "12" },
    { title: "מועמדים פעילים", value: "4" },
    { title: "בוגרים", value: "120" },
    { title: "שיעור השמה", value: "95%" },
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
          <Card key={index} sx={{ bgcolor: "cardGreen.main" }}>
            <CardContent sx={{ textAlign: "center" }}>
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
