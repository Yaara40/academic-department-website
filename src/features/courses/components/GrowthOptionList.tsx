import {
    Box,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

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
    // כרטיסים (אימוג׳ים)
    const growthOptions: GrowthOption[] = [
        { id: "hitech", emoji: "💻", title: "קריירה בהייטק", description: "תפקידים מובילים בחברות הייטק" },
        { id: "entrepreneurship", emoji: "🚀", title: "יזמות", description: "הקמת סטארט-אפ ופיתוח רעיונות חדשניים" },
        { id: "advanced-studies", emoji: "🎓", title: "לימודים מתקדמים", description: "תואר שני, דוקטורט והתמחויות" },
        { id: "research", emoji: "🔬", title: "מחקר", description: "עבודה במכוני מחקר ואקדמיה" },
        { id: "global", emoji: "🌍", title: "קריירה בינלאומית", description: "הזדמנויות עבודה בחו״ל" },
        { id: "management", emoji: "📊", title: "ניהול", description: "תפקידי ניהול בכירים בארגונים" },
    ];

    // הטבלה (כמו בצילום)
    const careerTracks: CareerTrack[] = [
        { id: "t1", role: "מפתחת/ת תוכנה", salaryRange: "₪15,000-35,000", demand: "גבוה מאוד" },
        { id: "t2", role: "מהנדס/ת DevOps", salaryRange: "₪20,000-40,000", demand: "גבוה מאוד" },
        { id: "t3", role: "מנהלת/ל פרויקטים", salaryRange: "₪18,000-45,000", demand: "גבוה" },
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
                    bgcolor: isVeryHigh ? "#D1FAE5" : "#DBEAFE",
                    color: isVeryHigh ? "#065F46" : "#1E3A8A",
                }}
            />
        );
    };

    return (
        <Box sx={{ p: 3, direction: "rtl" }}>
            {/* 1) כותרת סטטית */}
            <Box sx={{ textAlign: "right", mb: 3 }}>
                <Typography variant="h4" fontWeight={800}>
                    ניהול אפשרויות צמיחה
                </Typography>
                <Typography color="text.secondary">
                    ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים
                </Typography>
            </Box>

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
                        }}
                    >
                        <CardActionArea sx={{ height: "100%" }}>
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
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            {/* 3) טבלה */}
            <Box
                sx={{
                    border: "1px solid #eee",
                    borderRadius: 3,
                    p: 2,
                    bgcolor: "#fff",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight={800} sx={{ textAlign: "right" }}>
                        מסלולי קריירה
                    </Typography>

                    <Button variant="contained">הוסף מסלול +</Button>
                </Box>


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
                                <TableCell align="left" sx={{ fontWeight: 800 }}>
                                    פעולות
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

                                    <TableCell align="center">
                                        <IconButton size="small" aria-label="edit">
                                            <EditOutlinedIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" aria-label="delete">
                                            <DeleteOutlineOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
