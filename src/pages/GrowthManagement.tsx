import { Box, Typography, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import GrowthOptionsForm from "../features/growthoptions/GrowthOptionsForm";
import GrowthOptionList from "../features/growthoptions/GrowthOptionList";

export default function GrowthManagement() {
  const [pageLoading, setPageLoading] = useState(true);

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
      window.removeEventListener(
        "page-loading",
        onPageLoading as EventListener,
      );
    };
  }, []);

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      {/* פס טעינה */}
      {pageLoading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      {/* כותרת */}
      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          ניהול אפשרויות צמיחה
        </Typography>
        <Typography color="text.secondary">
          ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים
        </Typography>
      </Box>

      {/* טופס עריכה */}
      <GrowthOptionsForm />

      {/* כרטיסים + טבלה */}
      <GrowthOptionList />
    </Box>
  );
}
