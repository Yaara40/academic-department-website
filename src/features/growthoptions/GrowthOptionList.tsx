import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

type GrowthOption = {
  id: string;
  emoji: string;
  title: string;
  description: string;
};

type CareerTrack = {
  id: string;
  role: string;
  salaryRange: string;
  demand: "גבוה מאוד" | "גבוה";
};

export default function GrowthOptionList() {
  const growthOptions: GrowthOption[] = [
    { id: "hitech", emoji: "💻", title: "קריירה בהייטק", description: "תפקידים מובילים בחברות הייטק" },
    { id: "entrepreneurship", emoji: "🚀", title: "יזמות", description: "הקמת סטארט-אפ ופיתוח רעיונות חדשניים" },
    { id: "advanced-studies", emoji: "🎓", title: "לימודים מתקדמים", description: "תואר שני, דוקטורט והתמחויות" },
    { id: "research", emoji: "🔬", title: "מחקר", description: "עבודה במכוני מחקר ואקדמיה" },
    { id: "global", emoji: "🌍", title: "קריירה בינלאומית", description: "הזדמנויות עבודה בחו״ל" },
    { id: "management", emoji: "📊", title: "ניהול", description: "תפקידי ניהול בכירים בארגונים" },
  ];

  const careerTracks: CareerTrack[] = [
    { id: "t1", role: "מפתח/ת תוכנה", salaryRange: "₪15,000-35,000", demand: "גבוה מאוד" },
    { id: "t2", role: "מהנדס/ת DevOps", salaryRange: "₪20,000-40,000", demand: "גבוה מאוד" },
    { id: "t3", role: "מנהל/ת פרויקטים", salaryRange: "₪18,000-45,000", demand: "גבוה" },
    { id: "t4", role: "Data Scientist", salaryRange: "₪22,000-50,000", demand: "גבוה מאוד" },
    { id: "t5", role: "ארכיטקט/ית תוכנה", salaryRange: "₪30,000-60,000", demand: "גבוה" },
    { id: "t6", role: "מנהל/ת מוצר", salaryRange: "₪25,000-55,000", demand: "גבוה" },
  ];

  const demandChip = (demand: CareerTrack["demand"]) => {
    const isVeryHigh = demand === "גבוה מאוד";
    return (
      <Chip
        label={demand}
        size="small"
        sx={{
          fontWeight: 700,
          // שימוש בשמות הצבעים מה-Theme
          bgcolor: isVeryHigh ? "cardGreen" : "cardBlue",
          color: "text.primary" // טקסט דינמי
        }}
      />
    );
  };

  return (
    <Box>
      {/* כרטיסים */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          mb: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          },
        }}
      >
        {growthOptions.map((opt) => (
          <Card
            key={opt.id}
            sx={{
              borderRadius: 3,
              height: "100%",
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              // הוספתי רקע לבן/כהה סטנדרטי לכרטיסים האלו
              bgcolor: "background.paper"
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                py: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: 44, lineHeight: 1 }}>
                {opt.emoji}
              </Typography>
              <Typography fontWeight={800}>{opt.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {opt.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* טבלה */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 2,
          bgcolor: "background.paper", // רקע דינמי
        }}
      >
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          מסלולי קריירה
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 800 }}>תפקיד</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>טווח שכר</TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>ביקוש בשוק</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {careerTracks.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    {row.role}
                  </TableCell>
                  <TableCell align="center">{row.salaryRange}</TableCell>
                  <TableCell align="center">{demandChip(row.demand)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}