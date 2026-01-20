import { Box, Typography } from "@mui/material";
import GrowthOptionsForm from "../features/growthoptions/GrowthOptionsForm";
import GrowthOptionList from "../features/growthoptions/GrowthOptionList";

// ✅ הוספה
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

export default function GrowthManagement() {
  // ✅ הוספה
  const [pageLoading, setPageLoading] = useState(true);

  // ✅ הוספה
  useEffect(() => {
    const t = setTimeout(() => setPageLoading(false), 350);

    const onPageLoading = (e: Event) => {
      const ce = e as CustomEvent<{ loading?: boolean }>;
      if (typeof ce.detail?.loading === "boolean") {
        setPageLoading(ce.detail.loading);
      }
    };

    window.addEventListener("page-loading", onPageLoading as EventListener);
    return () => {
      clearTimeout(t);
      window.removeEventListener("page-loading", onPageLoading as EventListener);
    };
  }, []);

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      {/* ✅ הוספה */}
      {pageLoading && <LinearProgress sx={{ mb: 2 }} />}

      {/* 1. כותרת */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          ניהול אפשרויות צמיחה
        </Typography>
        <Typography color="text.secondary">
          ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים
        </Typography>
      </Box>

      {/* 2. טופס עריכה */}
      <GrowthOptionsForm />

      {/* 3. כרטיסים + 4. טבלה */}
      <GrowthOptionList />
    </Box>
  );
}
