import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";

import PhoneInTalkRoundedIcon from "@mui/icons-material/PhoneInTalkRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

// 🎨 מערך צבעים ירוקים מ-MUI
const COLORS = {
  GREEN_LIGHTEST: "#E8F5E9", // green[50]
  GREEN_LIGHT: "#C5E1A5", // lightGreen[200]
  GREEN_MEDIUM: "#A5D6A7", // green[200]
  GREEN_MAIN: "#81C784", // green[300]
  GREEN_PRIMARY: "#2c8332", // הירוק העיקרי שלנו
};

type SectionId =
  | "contact"
  | "openDays"
  | "schedule"
  | "tuition"
  | "admission"
  | "program";

type Category = {
  id: SectionId;
  title: string;
  description: string;
  colorName: string;
  icon: React.ReactNode;
};

type FAQ = { q: string; a: string };

const SectionHeader = ({
  title,
  icon,
  colorName,
}: {
  title: string;
  icon: React.ReactNode;
  colorName: string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 2,
      pb: 2,
      borderBottom: "1px solid",
      borderColor: "divider",
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: colorName,
        display: "grid",
        placeItems: "center",
        color: "text.primary",
      }}
    >
      {icon}
    </Box>

    <Typography variant="h5" fontWeight={900} sx={{ color: "text.primary" }}>
      {title}
    </Typography>
  </Box>
);

const FAQBlock = ({
  baseId,
  faqs,
  expanded,
  handleAccordionChange,
}: {
  baseId: string;
  faqs: FAQ[];
  expanded: string | false;
  handleAccordionChange: (
    panel: string
  ) => (_: React.SyntheticEvent, isExpanded: boolean) => void;
}) => (
  <Box>
    <Typography
      variant="h6"
      fontWeight={900}
      sx={{ mb: 1, color: "text.primary" }}
    >
      ❓ שאלות נפוצות
    </Typography>

    {faqs.map((f, idx) => {
      const panelId = `${baseId}-faq-${idx}`;
      return (
        <Accordion
          key={panelId}
          expanded={expanded === panelId}
          onChange={handleAccordionChange(panelId)}
          sx={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: "divider",
            mb: 1,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={700}>{f.q}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          >
            <Typography color="text.secondary">{f.a}</Typography>
          </AccordionDetails>
        </Accordion>
      );
    })}
  </Box>
);

export default function HelpUser() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [query, setQuery] = useState("");

  const categories: Category[] = useMemo(
    () => [
      {
        id: "contact",
        title: "צור קשר",
        description: "איך יוצרים קשר עם יועץ/ת רישום או מזכירות",
        colorName: COLORS.GREEN_LIGHTEST,
        icon: <PhoneInTalkRoundedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "openDays",
        title: "ימים פתוחים",
        description: "הרשמה והגעה, מה להביא ומה קורה ביום פתוח",
        colorName: COLORS.GREEN_LIGHT,
        icon: <EventAvailableRoundedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "schedule",
        title: "לוחות זמנים",
        description: "שעות לימוד, מועדי סמסטר ומבחנים",
        colorName: COLORS.GREEN_MEDIUM,
        icon: <CalendarMonthRoundedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "tuition",
        title: "שכר לימוד ומימון",
        description: "שכר לימוד, מלגות ואפשרויות תשלום",
        colorName: COLORS.GREEN_MAIN,
        icon: <AttachMoneyRoundedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "admission",
        title: "תנאי קבלה והרשמה",
        description: "מסמכים, דרישות, ותהליך הרשמה מלא",
        colorName: COLORS.GREEN_LIGHTEST,
        icon: <SchoolRoundedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "program",
        title: "על התוכנית",
        description: "מידע כללי על התואר, קורסים וקריירה",
        colorName: COLORS.GREEN_LIGHT,
        icon: <InfoRoundedIcon sx={{ fontSize: 34 }} />,
      },
    ],
    []
  );

  const scrollToSection = (id: SectionId) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : false);

  // FAQs לכל סקשן
  const contactFaq: FAQ[] = [
    {
      q: "איך יוצרים קשר?",
      a: "אפשר דרך טופס יצירת קשר באתר או דרך הטלפון/מייל שמופיעים בעמוד.",
    },
    {
      q: "מתי חוזרים אליי?",
      a: "בדרך כלל בשעות הפעילות. אם דחוף – עדיף לציין זאת בפנייה.",
    },
  ];

  const openDaysFaq: FAQ[] = [
    {
      q: "איך נרשמים ליום פתוח?",
      a: "נרשמים דרך עמוד הימים הפתוחים/אירועים באתר.",
    },
    {
      q: "מה להביא?",
      a: "מומלץ להביא תעודה מזהה, שאלות מוכנות, ואם יש – מסמכי בגרות/פסיכומטרי.",
    },
  ];

  const scheduleFaq: FAQ[] = [
    {
      q: "האם יש מסלול ערב?",
      a: "בחלק מהמסלולים כן. בדקי בעמוד לוחות הזמנים של המסלול.",
    },
    {
      q: "אפשר לשלב עבודה?",
      a: "כן, אבל כדאי לבחור מסלול מתאים ולהיערך לעומס בהתאם.",
    },
  ];

  const tuitionFaq: FAQ[] = [
    {
      q: "איך משלמים שכר לימוד?",
      a: "לרוב יש אפשרויות תשלום לפי תנאי המוסד (תשלומים/הוראת קבע וכו').",
    },
    {
      q: "יש מלגות?",
      a: "כן, קיימות מלגות שונות לפי קריטריונים. מומלץ לבדוק בעמוד מלגות.",
    },
  ];

  const admissionFaq: FAQ[] = [
    {
      q: "מה תנאי הקבלה?",
      a: "תלוי במסלול. יש מסלולים עם חלופות (מכינה/מסלולים ייעודיים).",
    },
    {
      q: "איך נרשמים?",
      a: "ממלאים טופס הרשמה, מצרפים מסמכים וממתינים להמשך תהליך.",
    },
  ];

  const programFaq: FAQ[] = [
    {
      q: "מה לומדים בתואר?",
      a: 'קורסי יסוד במדמ"ח, מתמטיקה, פרויקטים וקורסים מתקדמים בהתאם למסלול.',
    },
    {
      q: "מה אפשר לעשות אחרי התואר?",
      a: "פיתוח תוכנה, QA, DevOps, Data ועוד — בהתאם להתמחות ולניסיון.",
    },
  ];

  // חיפוש פשוט
  const filterFaqs = (faqs: FAQ[]) => {
    const q = query.trim();
    if (!q) return faqs;
    const qq = q.toLowerCase();
    return faqs.filter((x) => `${x.q} ${x.a}`.toLowerCase().includes(qq));
  };

  return (
    <Box
      sx={{
        direction: "rtl",
        textAlign: "right",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 900, color: "text.primary", mb: 1 }}
            >
              מרכז העזרה
            </Typography>
            <Typography sx={{ fontSize: 18, color: "text.secondary" }}>
              כאן תמצאו מענה לכל השאלות לגבי התואר במדעי המחשב
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 520, mx: "auto", mt: 2 }}>
            <TextField
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חפשו שאלה..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </motion.div>

        {/* Quick Links (Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.06 }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: cat.colorName,
                    transition: "all 0.2s",
                    "&:hover": { transform: "translateY(-4px)", boxShadow: 3 },
                  }}
                >
                  <CardActionArea
                    onClick={() => scrollToSection(cat.id)}
                    sx={{ p: 2 }}
                  >
                    <CardContent sx={{ p: 0, textAlign: "center" }}>
                      <Box
                        sx={{
                          mb: 1,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {cat.icon}
                      </Box>
                      <Typography
                        fontWeight={900}
                        sx={{ mb: 0.5, color: "text.primary" }}
                      >
                        {cat.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {cat.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Section: Contact */}
        <motion.section
          id="section-contact"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="צור קשר"
              icon={<PhoneInTalkRoundedIcon />}
              colorName={COLORS.GREEN_LIGHTEST}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  🎯 מטרה
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  לעזור לכם להגיע מהר לגורם הנכון (יועץ/ת רישום, מזכירות, תמיכה
                  טכנית).
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  📋 מה עושים?
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "בחרו את סוג הפנייה (קבלה/שכר לימוד/מערכת שעות וכו')",
                    "מלאו פרטים מדויקים (שם, טלפון, אימייל)",
                    "תארו את השאלה בקצרה וברור",
                    "שלחו והמתינו למענה בשעות הפעילות",
                  ].map((s, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={
                          <Typography color="text.primary">{`${
                            i + 1
                          }. ${s}`}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock
                baseId="contact"
                faqs={filterFaqs(contactFaq)}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />
            </Box>
          </Paper>
        </motion.section>

        {/* Section: Open Days */}
        <motion.section
          id="section-openDays"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="ימים פתוחים"
              icon={<EventAvailableRoundedIcon />}
              colorName={COLORS.GREEN_LIGHT}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  📌 מה יש ביום פתוח?
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "הסבר על התוכנית והמסלולים",
                    "שאלות ותשובות עם צוות",
                    "מידע על תנאי קבלה ומלגות",
                  ].map((x, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText
                        primary={
                          <Typography color="text.primary">{`• ${x}`}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock
                baseId="openDays"
                faqs={filterFaqs(openDaysFaq)}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />
            </Box>
          </Paper>
        </motion.section>

        {/* Section: Schedule */}
        <motion.section
          id="section-schedule"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="לוחות זמנים"
              icon={<CalendarMonthRoundedIcon />}
              colorName={COLORS.GREEN_MEDIUM}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  📋 למה זה חשוב?
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  כדי להתאים מסלול לשגרה שלכם (עבודה/שירות/משפחה) ולהבין עומסים.
                </Typography>
              </Box>

              <FAQBlock
                baseId="schedule"
                faqs={filterFaqs(scheduleFaq)}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />
            </Box>
          </Paper>
        </motion.section>

        {/* Section: Tuition */}
        <motion.section
          id="section-tuition"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="שכר לימוד ומימון"
              icon={<AttachMoneyRoundedIcon />}
              colorName={COLORS.GREEN_MAIN}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  ⚠️ דגשים
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "בדקו מה כולל שכר לימוד (אגרות/מעבדות וכו')",
                    "הכינו מסמכים למלגות מראש",
                    "שמרו אישורים על תשלום/פנייה",
                  ].map((w, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText
                        primary={
                          <Typography color="text.primary">{`• ${w}`}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock
                baseId="tuition"
                faqs={filterFaqs(tuitionFaq)}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />
            </Box>
          </Paper>
        </motion.section>

        {/* Section: Admission */}
        <motion.section
          id="section-admission"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="תנאי קבלה והרשמה"
              icon={<SchoolRoundedIcon />}
              colorName={COLORS.GREEN_LIGHTEST}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ mb: 1, color: "text.primary" }}
                >
                  ✅ מסמכים נפוצים
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "תעודת בגרות / גיליון ציונים",
                    "פסיכומטרי (אם רלוונטי)",
                    "תעודה מזהה",
                  ].map((x, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText
                        primary={
                          <Typography color="text.primary">{`• ${x}`}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock
                baseId="admission"
                faqs={filterFaqs(admissionFaq)}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />
            </Box>
          </Paper>
        </motion.section>

        {/* Section: Program */}
        <motion.section
          id="section-program"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="על התוכנית"
              icon={<InfoRoundedIcon />}
              colorName={COLORS.GREEN_LIGHT}
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FAQBlock
                baseId="program"
                faqs={filterFaqs(programFaq)}
                expanded={expanded}
                handleAccordionChange={handleAccordionChange}
              />

              <Box
                sx={{
                  bgcolor: COLORS.GREEN_LIGHTEST,
                  borderRight: "4px solid",
                  borderColor: COLORS.GREEN_PRIMARY,
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <TipsAndUpdatesOutlinedIcon
                    sx={{ color: COLORS.GREEN_PRIMARY }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={900}
                    sx={{ color: "text.primary" }}
                  >
                    💡 טיפ קטן
                  </Typography>
                </Box>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  אם יש לכם רק שאלה אחת — חפשו אותה למעלה. אם אתם לא בטוחים
                  מאיפה להתחיל — לחצו על אחד הכרטיסים למעלה ותגיעו ישר לסקשן
                  המתאים.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.section>
      </Box>
    </Box>
  );
}
