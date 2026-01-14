import { useEffect, useState } from "react";
import { 
  Box, Container, Typography, Paper, Chip, LinearProgress, Stack 
} from "@mui/material";
// ודאי שהייבוא תואם לקובץ ה-Services שלך
import { getGrowthOptions, getCareerPaths, GrowthOptions, CareerPath } from "../features/growthoptions/growthOptions"; 

// אייקונים
import SchoolIcon from "@mui/icons-material/School";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ScienceIcon from "@mui/icons-material/Science";
import PublicIcon from "@mui/icons-material/Public";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const UserGrowth = () => {
  const [loading, setLoading] = useState(true);
  const [headerData, setHeaderData] = useState<GrowthOptions | null>(null);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);

  // נתונים סטטיים לכרטיסיות האמצעיות
  const staticCards = [
    { title: "לימודים מתקדמים", desc: "המשך לתואר שני ודוקטורט במוסדות מובילים", icon: <SchoolIcon fontSize="large" color="success" /> },
    { title: "יזמות", desc: "הקמת סטארט-אפ והפיכת רעיונות לעסק", icon: <RocketLaunchIcon fontSize="large" color="secondary" /> },
    { title: "קריירה בהייטק", desc: "תפקידים מובילים בחברות הייטק כמו Google, Microsoft", icon: <BusinessCenterIcon fontSize="large" color="primary" /> },
    { title: "מחקר", desc: "עבודה במכוני מחקר ואקדמיה", icon: <ScienceIcon fontSize="large" color="error" /> },
    { title: "קריירה בינלאומית", desc: "הזדמנויות עבודה בחברות גלובליות ובחו\"ל", icon: <PublicIcon fontSize="large" color="info" /> },
    { title: "ניהול", desc: "תפקידי ניהול בכירים כמו CTO, VP R&D ומנהל פיתוח", icon: <ManageAccountsIcon fontSize="large" color="warning" /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await getGrowthOptions();
        setHeaderData(options);
        
        const paths = await getCareerPaths();
        setCareerPaths(paths);
      } catch (error) {
        console.error("Error loading page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", mt: 10, px: 4, textAlign: "center" }}>
        <LinearProgress color="success" sx={{ maxWidth: 400, mx: "auto", mb: 2 }} />
        <Typography>טוען נתונים...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", pb: 8, direction: "rtl" }}>
      
      {/* --- חלק 1: Header ירוק --- */}
      <Box sx={{ bgcolor: "#005e36", color: "white", pt: 8, pb: 12, textAlign: "center", px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ mb: 2 }}>
            {headerData?.pageTitle || "אפשרויות צמיחה וקריירה"}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
            {headerData?.pageDescription || "תואר במדעי המחשב פותח בפניכם עולם של הזדמנויות. גלו את האפשרויות."}
          </Typography>
        </Container>
      </Box>

      {/* --- חלק 2: סטטיסטיקות (Box Flex) --- */}
      <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
        <Paper elevation={0} sx={{ py: 4, px: 2, borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          
          {/* מחליף את ה-Grid Container */}
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "space-between", 
            textAlign: "center",
            gap: 2
          }}>
            
            {/* פריט סטטיסטיקה */}
            {[
              { val: "3 חודשים", text: "זמן ממוצע למציאת עבודה" },
              { val: "+500", text: "חברות שותפות לגיוס" },
              { val: "₪25,000", text: "שכר ממוצע למשרה ראשונה" },
              { val: "95%", text: "מהבוגרים מועסקים בתחום" }
            ].map((stat, i) => (
              <Box key={i} sx={{ width: { xs: "45%", md: "22%" }, mb: { xs: 2, md: 0 } }}>
                <Typography variant="h4" color="success.main" fontWeight={800}>{stat.val}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.text}</Typography>
              </Box>
            ))}

          </Box>
        </Paper>
      </Container>

      {/* --- חלק 3: לאן אפשר להגיע? (Box Flex) --- */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          לאן אפשר להגיע?
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          התואר פותח דלתות למגוון רחב של אפשרויות קריירה
        </Typography>

        {/* מיכל Flexbox לכרטיסיות */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {staticCards.map((card, index) => (
            <Box 
              key={index} 
              sx={{ 
                // חישוב רוחב: 100% בנייד, 50% בטאבלט (פחות רווח), 33% במחשב
                width: { xs: "100%", sm: "calc(50% - 12px)", md: "calc(33.333% - 16px)" },
                display: "flex"
              }}
            >
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  textAlign: "center", 
                  width: "100%", // למלא את ה-Box העוטף
                  borderRadius: 3,
                  bgcolor: "white",
                  border: "1px solid #f0f0f0",
                  transition: "0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }
                }}
              >
                <Box sx={{ mb: 2, bgcolor: "#f0fdf4", display: "inline-flex", p: 2, borderRadius: 3 }}>
                  {card.icon}
                </Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                  {card.desc}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>

      {/* --- חלק 4: מסלולי קריירה נפוצים (Box Flex) --- */}
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" gutterBottom>
          מסלולי קריירה נפוצים
        </Typography>
        <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          תפקידים מבוקשים בשוק ההייטק (מתעדכן מהמערכת)
        </Typography>

        {/* מיכל Flexbox למסלולים */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {careerPaths.length > 0 ? (
            careerPaths.map((path) => (
              <Box 
                key={path.id} 
                sx={{ 
                  // חישוב רוחב: 100% בנייד, 50% במחשב (פחות הרווח)
                  width: { xs: "100%", md: "calc(50% - 12px)" }
                }}
              >
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    bgcolor: "white",
                    border: "1px solid #e5e7eb",
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: "0.2s",
                    "&:hover": { borderColor: "success.light", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#111827" }}>
                      {path.role}
                    </Typography>
                    
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                       <Typography variant="body2" fontWeight={700} sx={{ color: "#059669", direction: 'ltr' }}>
                        {path.salary} ₪
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontSize="0.85rem">
                         :שכר ממוצע
                      </Typography>
                    </Stack>
                  </Box>

                  <Chip 
                    label={path.demand} 
                    size="small"
                    sx={{ 
                      bgcolor: "#ecfdf5", 
                      color: "#059669", 
                      fontWeight: 700,
                      borderRadius: 2,
                      px: 1
                    }}
                  />
                </Paper>
              </Box>
            ))
          ) : (
            <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
               <Typography color="text.secondary">לא נמצאו מסלולי קריירה במערכת</Typography>
            </Box>
          )}
        </Box>
      </Container>

    </Box>
  );
};

export default UserGrowth;
