import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography } from "@mui/material";
import ContactList from "../features/contact/ContactList";
import ContactForm from "../features/contact/ContactForm";
import { useEffect, useState } from "react";

export default function ContactManagement() {
  // ✅ הוספה
  const [pageLoading, setPageLoading] = useState(true);

  // ✅ הוספה
  useEffect(() => {
    // מציג אינדיקציה קצרה בטעינת עמוד (ובנוסף מאפשר חיבור לטענת דאטה “אמיתית” דרך event)
    const t = setTimeout(() => setPageLoading(false), 500);

    const onPageLoading = (e: Event) => {
      const ce = e as CustomEvent<{ loading?: boolean }>;
      if (typeof ce.detail?.loading === "boolean") {
        setPageLoading(ce.detail.loading);
      }
    };

    window.addEventListener("page-loading", onPageLoading as EventListener);
    return () => {
      clearTimeout(t);
      window.removeEventListener(
        "page-loading",
        onPageLoading as EventListener,
      );
    };
  }, []);

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      {/* ✅ הוספה: פס טעינה */}
      {pageLoading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      {/* כותרת */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          ניהול השארת פרטים
        </Typography>
        <Typography color="text.secondary">
          צפה ונהל את הפניות מהמועמדים
        </Typography>
      </Box>

      {/* סטטיסטיקות + טבלה */}
      <ContactList />

      {/* טופס הגדרות */}
      <ContactForm />
    </Box>
  );
}
