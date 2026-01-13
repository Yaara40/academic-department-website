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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

type CategoryId = "leads" | "courses" | "calculator" | "settings";

type Category = {
  id: CategoryId;
  title: string;
  description: string;
  colorName: "cardBlue" | "cardGreen" | "cardPurple" | "cardOrange";
  icon: React.ReactNode;
};

type FAQ = { q: string; a: string };

export default function AdminHelp() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const categories: Category[] = useMemo(
    () => [
      {
        id: "leads",
        title: "ניהול מועמדים ופניות",
        description: 'טיפול בפניות שמגיעות מטופס "השארת פרטים"',
        colorName: "cardBlue",
        icon: <PeopleAltOutlinedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "courses",
        title: "ניהול קורסים ותוכן אקדמי",
        description: "ניהול רשימת הקורסים המוצגת למועמדים",
        colorName: "cardGreen",
        icon: <MenuBookOutlinedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "calculator",
        title: "מחשבון קבלה ודרישות",
        description: "הגדרת כללי מחשבון הקבלה והדרישות",
        colorName: "cardPurple",
        icon: <CalculateOutlinedIcon sx={{ fontSize: 34 }} />,
      },
      {
        id: "settings",
        title: "הגדרות אתר וניווט",
        description: "שליטה בחוויית המשתמש באתר הציבורי",
        colorName: "cardOrange",
        icon: <SettingsOutlinedIcon sx={{ fontSize: 34 }} />,
      },
    ],
    []
  );

  const scrollToSection = (id: CategoryId) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAccordionChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) =>
      setExpanded(isExpanded ? panel : false);

  const leadsFaq: FAQ[] = [
    {
      q: "למה אני לא רואה פניות חדשות?",
      a: 'ייתכן שהפניות לא עודכנו במערכת. נסו לרענן את הדף או לבדוק שהפילטר מוגדר ל"כל הסטטוסים".',
    },
    {
      q: "איך מסננים לפי סטטוס?",
      a: 'השתמשו בתפריט הנפתח "סטטוס" בחלק העליון של הטבלה כדי לבחור סטטוס ספציפי.',
    },
    {
      q: "מה עושים עם פנייה כפולה?",
      a: "בדקו את התאריכים ושמרו את הפנייה העדכנית ביותר. לחצו על כפתור המחיקה בפנייה הישנה.",
    },
    {
      q: "האם שינוי סטטוס נשמר אוטומטית?",
      a: "כן! כל שינוי סטטוס נשמר מיד לאחר הבחירה בתפריט הנפתח.",
    },
  ];

  const coursesFaq: FAQ[] = [
    {
      q: "מה ההבדל בין קורס פעיל ללא פעיל?",
      a: "קורס פעיל מוצג למועמדים באתר הציבורי. קורס לא פעיל מוסתר אך נשמר במערכת.",
    },
    {
      q: "איך אני עורכת קורס קיים?",
      a: "לחצי על כפתור העריכה (עיפרון כחול) ליד הקורס, ערכי את הפרטים ושמרי.",
    },
    {
      q: "למה קורס לא מופיע באתר?",
      a: 'וודאי שהקורס מסומן כ"פעיל" ושהסמסטר מוגדר נכון.',
    },
  ];

  const calculatorFaq: FAQ[] = [
    {
      q: 'למה התוצאות של המחשבון "קופצות"?',
      a: "ייתכן שהמשקלים או הספים שונו לאחרונה. בדקו את ההגדרות ווודאו שהם עקביים.",
    },
    {
      q: "מה עושים אם המשקלים לא מסתכמים ל-1?",
      a: "המערכת לא תאכוף זאת, אך מומלץ מאוד שסכום המשקלים יהיה 1.0 למען דיוק החישוב.",
    },
    {
      q: "איך לשנות רק סף בלי להשפיע על כל השאר?",
      a: "ערכו רק את השדה הרלוונטי ושמרו. שאר ההגדרות יישארו כפי שהיו.",
    },
  ];

  const settingsFaq: FAQ[] = [
    {
      q: "למה כפתור/קישור לא עובד?",
      a: "בדקו שהכתובת מתחילה ב-https:// ושהיא תקינה. נסו לפתוח אותה בטאב חדש.",
    },
    {
      q: "איך משנים סדר בתפריט?",
      a: 'ערכו את השדה "order" בכל קישור. מספר נמוך יופיע ראשון.',
    },
    {
      q: "איך מסתירים כרטיס בלי למחוק?",
      a: 'ערכו את הכרטיס ושנו את הסטטוס ל"מוסתר". הכרטיס יישמר אך לא יוצג למועמדים.',
    },
  ];

  const SectionHeader = ({
    title,
    icon,
    colorName,
  }: {
    title: string;
    icon: React.ReactNode;
    colorName: string;
  }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, pb: 2, borderBottom: "1px solid", borderColor: "divider" }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: colorName, display: "grid", placeItems: "center", color: "text.primary" }}>
        {icon}
      </Box>
      <Typography variant="h5" fontWeight={900} sx={{ color: "text.primary" }}>
        {title}
      </Typography>
    </Box>
  );

  const FAQBlock = ({ baseId, faqs }: { baseId: string; faqs: FAQ[] }) => (
    <Box>
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
        ❓ שאלות נפוצות
      </Typography>
      {faqs.map((f, idx) => {
        const panelId = `${baseId}-faq-${idx}`;
        return (
          <Accordion
            key={panelId}
            expanded={expanded === panelId}
            onChange={handleAccordionChange(panelId)}
            sx={{ boxShadow: "none", border: "1px solid", borderColor: "divider", mb: 1, "&:before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={700}>{f.q}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ borderTop: "1px solid", borderColor: "divider" }}>
              <Typography color="text.secondary">{f.a}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ direction: "rtl", textAlign: "right" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, color: "text.primary", mb: 1 }}>
              דף עזרה למנהל מערכת (Admin)
            </Typography>
            <Typography sx={{ fontSize: 20, color: "text.secondary" }}>
              הדרכה קצרה וברורה לשימוש נכון במערכת
            </Typography>
          </Box>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
              gap: 2,
            }}
          >
            {categories.map((cat, index) => {
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: cat.colorName,
                      transition: "all 0.2s",
                      "&:hover": { transform: 'translateY(-4px)', boxShadow: 3 },
                    }}
                  >
                    <CardActionArea onClick={() => scrollToSection(cat.id)} sx={{ p: 2 }}>
                      <CardContent sx={{ p: 0, textAlign: "center" }}>
                        <Box sx={{ color: "text.primary", mb: 1, display: "flex", justifyContent: "center" }}>
                          {cat.icon}
                        </Box>
                        <Typography fontWeight={900} sx={{ mb: 0.5, color: "text.primary" }}>
                          {cat.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {cat.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </motion.div>

        {/* Section 1: Leads */}
        <motion.section
          id="section-leads"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="ניהול מועמדים ופניות (Leads)"
              icon={<PeopleAltOutlinedIcon />}
              colorName="cardBlue"
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  🎯 מטרה
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  לעזור ל-Admin לטפל בפניות שמגיעות מטופס "השארת פרטים" באתר.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  📋 שלבים לביצוע
                </Typography>
                <List sx={{ pt:0 }}>
                  {[
                    'להיכנס ל־"ניהול השארת פרטים"',
                    "לחפש פנייה לפי שם/אימייל/טלפון",
                    "לפתוח צפייה בפרטי הפנייה",
                    "לעדכן סטטוס: חדש / נוצר קשר / מעוניין / לא רלוונטי",
                    "למחוק פנייה כפולה במקרה הצורך",
                  ].map((s, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`${i + 1}. ${s}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ bgcolor: "background.paper", borderRight: "4px solid", borderColor: "warning.main", p: 2, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  ⚠️ דגשים חשובים
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "אימייל חייב להיות בפורמט תקין (name@domain)",
                    "טלפון בישראל 9–10 ספרות (כולל 0 בתחילה)",
                    "מומלץ לעדכן סטטוס לאחר כל שיחה כדי לשמור סדר",
                  ].map((w, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`• ${w}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock baseId="leads" faqs={leadsFaq} />

              <Box sx={{ bgcolor: "cardGreen", borderRight: "4px solid", borderColor: "success.main", p: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TipsAndUpdatesOutlinedIcon sx={{ color: "success.main" }} />
                  <Typography variant="h6" fontWeight={900} sx={{ color: "text.primary" }}>
                    💡 טיפים
                  </Typography>
                </Box>
                <List sx={{ pt: 0 }}>
                  {["התחילי כל יום מטיפול בסטטוס \"חדש\"", "השתמשי בחיפוש כדי לאתר מהר מועמד", "אל תמחקי פניות לפני שתיעדת טיפול"].map(
                    (t, i) => (
                      <ListItem key={i} sx={{ py: 0 }}>
                        <ListItemText 
                          primary={<Typography color="text.primary">{`• ${t}`}</Typography>} 
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Box>
          </Paper>
        </motion.section>

        {/* Section 2: Courses */}
        <motion.section
          id="section-courses"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="ניהול קורסים ותוכן אקדמי"
              icon={<MenuBookOutlinedIcon />}
              colorName="cardGreen"
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  🎯 מטרה
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  לנהל את רשימת הקורסים שמוצגת למועמדים באתר.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  📋 שלבים לביצוע
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    'להיכנס ל־"ניהול קורסים"',
                    'ללחוץ "הוסף קורס חדש"',
                    'למלא: שם קורס, נ״ז, סמסטר, פעיל/לא פעיל',
                    "לשמור",
                    "לערוך/להשבית קורסים קיימים לפי הצורך",
                  ].map((s, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`${i + 1}. ${s}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ bgcolor: "background.paper", borderRight: "4px solid", borderColor: "warning.main", p: 2, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  ⚠️ דגשים חשובים
                </Typography>
                <List sx={{ pt: 0 }}>
                  {["נ״ז חייב להיות מספר חיובי", "שם קורס לא יכול להיות ריק", 'קורס "לא פעיל" לא יוצג למועמדים'].map(
                    (w, i) => (
                      <ListItem key={i} sx={{ py: 0 }}>
                        <ListItemText 
                          primary={<Typography color="text.primary">{`• ${w}`}</Typography>} 
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>

              <FAQBlock baseId="courses" faqs={coursesFaq} />

              <Box sx={{ bgcolor: "cardGreen", borderRight: "4px solid", borderColor: "success.main", p: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TipsAndUpdatesOutlinedIcon sx={{ color: "success.main" }} />
                  <Typography variant="h6" fontWeight={900} sx={{ color: "text.primary" }}>
                    💡 טיפים
                  </Typography>
                </Box>
                <List sx={{ pt: 0 }}>
                  {["השבתה עדיפה על מחיקה (כדי לא לאבד מידע)", "ודאי שכל שינוי מופיע גם בתצוגה הציבורית"].map((t, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`• ${t}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Paper>
        </motion.section>

        {/* Section 3: Calculator */}
        <motion.section
          id="section-calculator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="מחשבון קבלה ודרישות קבלה"
              icon={<CalculateOutlinedIcon />}
              colorName="cardPurple"
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  🎯 מטרה
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  להגדיר את הכללים שמחשבון הקבלה משתמש בהם (משקלים, ספים, דרישות).
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  📋 שלבים לביצוע
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    'להיכנס ל־"הגדרות מחשבון קבלה"',
                    "לקבוע משקל פסיכומטרי ומשקל בגרות (סכום מומלץ = 1)",
                    "להגדיר מינימום יחידות מתמטיקה, ממוצע בגרות, פסיכומטרי",
                    "להגדיר ספי סיכוי (גבוה/בינוני)",
                    "לשמור הגדרות",
                  ].map((s, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`${i + 1}. ${s}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ bgcolor: "background.paper", borderRight: "4px solid", borderColor: "warning.main", p: 2, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  ⚠️ דגשים חשובים
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "משקלים חייבים להיות בין 0 ל-1",
                    'מומלץ לוודא שספי הסיכוי הגיוניים (למשל 75% גבוה, 60% בינוני)',
                    "שינויים ישפיעו על תוצאות החישוב למועמדים מיד לאחר שמירה",
                  ].map((w, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`• ${w}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock baseId="calculator" faqs={calculatorFaq} />

              <Box sx={{ bgcolor: "cardGreen", borderRight: "4px solid", borderColor: "success.main", p: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TipsAndUpdatesOutlinedIcon sx={{ color: "success.main" }} />
                  <Typography variant="h6" fontWeight={900} sx={{ color: "text.primary" }}>
                    💡 טיפים
                  </Typography>
                </Box>
                <List sx={{ pt: 0 }}>
                  {["שמרי \"סט ערכים\" קבוע כגיבוי", "אחרי שינוי — בצעי בדיקה עם מועמד דוגמה"].map((t, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`• ${t}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Paper>
        </motion.section>

        {/* Section 4: Settings */}
        <motion.section
          id="section-settings"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <SectionHeader
              title="הגדרות אתר, ניווט ותוכן כללי"
              icon={<SettingsOutlinedIcon />}
              colorName="cardOrange"
            />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  🎯 מטרה
                </Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                  לאפשר ל-Admin לשלוט בחוויית המשתמש באתר הציבורי.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  📦 מה כולל?
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "ניהול דף הבית (כותרת/תיאור/CTA)",
                    "ניהול ניווט (תפריטים וקישורים)",
                    "ניהול אפשרויות צמיחה (כרטיסים/מסלולי קריירה)",
                    "פרטי התקשרות (פוטר + רשתות חברתיות)",
                  ].map((x, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`• ${x}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  📋 שלבים לביצוע
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "להיכנס למסך הניהול הרצוי (דף בית/ניווט/צמיחה/פרטי קשר)",
                    "לערוך תוכן/קישורים/כרטיסים",
                    "לשמור",
                    "לבדוק בתצוגה ציבורית שהכל נראה תקין",
                  ].map((s, i) => (
                    <ListItem key={i} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`${i + 1}. ${s}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ bgcolor: "background.paper", borderRight: "4px solid", borderColor: "warning.main", p: 2, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={900} sx={{ mb: 1, color: "text.primary" }}>
                  ⚠️ דגשים חשובים
                </Typography>
                <List sx={{ pt: 0 }}>
                  {[
                    "קישורים חייבים להיות URL תקין (https://...)",
                    'סדר הניווט נקבע לפי "order"',
                    'כרטיס "מוצג/מוסתר" קובע האם המועמדים רואים אותו',
                  ].map((w, i) => (
                    <ListItem key={i} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={<Typography color="text.primary">{`• ${w}`}</Typography>} 
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <FAQBlock baseId="settings" faqs={settingsFaq} />

              <Box sx={{ bgcolor: "cardGreen", borderRight: "4px solid", borderColor: "success.main", p: 2, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <TipsAndUpdatesOutlinedIcon sx={{ color: "success.main" }} />
                  <Typography variant="h6" fontWeight={900} sx={{ color: "text.primary" }}>
                    💡 טיפים
                  </Typography>
                </Box>
                <List sx={{ pt: 0 }}>
                  {["מומלץ להשתמש בתמונות באיכות טובה ולא כבדות מדי", "שמרי טקסטים קצרים וברורים בדף הבית"].map(
                    (t, i) => (
                      <ListItem key={i} sx={{ py: 0 }}>
                        <ListItemText 
                          primary={<Typography color="text.primary">{`• ${t}`}</Typography>} 
                        />
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Box>
          </Paper>
        </motion.section>

        {/* Bottom Guidelines */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: "2px solid",
              borderColor: "success.main",
              bgcolor: "cardGreen",
              boxShadow: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <TipsAndUpdatesOutlinedIcon sx={{ color: "success.main" }} />
              <Typography variant="h5" fontWeight={900} sx={{ color: "text.primary" }}>
                הנחיות כלליות
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: 2,
              }}
            >
              {[
                {
                  title: "✅ שמירה אחרי כל שינוי",
                  desc: 'לחצו על כפתור "שמור" אחרי כל עריכה כדי לוודא שהשינויים נשמרו',
                },
                {
                  title: "👁️ בדיקה בתצוגה ציבורית",
                  desc: "אחרי שינוי, עברו לעמודים הציבוריים וודאו שהכל נראה כמו שצריך",
                },
                {
                  title: "⚠️ לא למחוק לפני אימות",
                  desc: "העדיפו להשבית פריטים במקום למחוק - זה מאפשר שחזור במקרה הצורך",
                },
              ].map((x) => (
                <Card key={x.title} variant="outlined" sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography fontWeight={900} sx={{ mb: 0.5, color: "text.primary" }}>
                      {x.title}
                    </Typography>
                    <Typography color="text.secondary">{x.desc}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
}