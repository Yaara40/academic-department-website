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
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import PublicIcon from "@mui/icons-material/Public";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import NewspaperIcon from "@mui/icons-material/Newspaper";

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

type GrowthOption = {
  id: string;
  iconKey: string;
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
    {
      id: "hitech",
      iconKey: "hitech",
      title: "קריירה בהייטק",
      description: "תפקידים מובילים בחברות הייטק",
    },
    {
      id: "entrepreneurship",
      iconKey: "startup",
      title: "יזמות",
      description: "הקמת סטארט-אפ ופיתוח רעיונות חדשניים",
    },
    {
      id: "advanced-studies",
      iconKey: "advanced",
      title: "לימודים מתקדמים",
      description: "תואר שני, דוקטורט והתמחויות",
    },
    {
      id: "research",
      iconKey: "research",
      title: "מחקר",
      description: "עבודה במכוני מחקר ואקדמיה",
    },
    {
      id: "global",
      iconKey: "international",
      title: "קריירה בינלאומית",
      description: "הזדמנויות עבודה בחו״ל",
    },
    {
      id: "management",
      iconKey: "management",
      title: "ניהול",
      description: "תפקידי ניהול בכירים בארגונים",
    },
  ];

  const careerTracks: CareerTrack[] = [
    {
      id: "t1",
      role: "מפתח/ת תוכנה",
      salaryRange: "₪15,000-35,000",
      demand: "גבוה מאוד",
    },
    {
      id: "t2",
      role: "מהנדס/ת DevOps",
      salaryRange: "₪20,000-40,000",
      demand: "גבוה מאוד",
    },
    {
      id: "t3",
      role: "מנהל/ת פרויקטים",
      salaryRange: "₪18,000-45,000",
      demand: "גבוה",
    },
    {
      id: "t4",
      role: "Data Scientist",
      salaryRange: "₪22,000-50,000",
      demand: "גבוה מאוד",
    },
    {
      id: "t5",
      role: "ארכיטקט/ית תוכנה",
      salaryRange: "₪30,000-60,000",
      demand: "גבוה",
    },
    {
      id: "t6",
      role: "מנהל/ת מוצר",
      salaryRange: "₪25,000-55,000",
      demand: "גבוה",
    },
  ];

  const demandChip = (demand: CareerTrack["demand"]) => {
    const isVeryHigh = demand === "גבוה מאוד";
    return (
      <Chip
        label={demand}
        size="small"
        color={isVeryHigh ? "secondary" : "primary"}
        sx={{ fontWeight: 700 }}
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
        {growthOptions.map((opt) => {
          const iconData = ICONS[opt.iconKey] || ICONS["hitech"];
          return (
            <Card
              key={opt.id}
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                bgcolor: "background.paper",
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
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    bgcolor: CATEGORY_COLORS[opt.iconKey] || "#E3F2FD",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: iconData.color,
                    mb: 1,
                  }}
                >
                  {iconData.icon}
                </Box>
                <Typography fontWeight={800}>{opt.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {opt.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* טבלה */}
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          מסלולי קריירה
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  תפקיד
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  טווח שכר
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  ביקוש בשוק
                </TableCell>
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
