import LinearProgress from "@mui/material/LinearProgress";
import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GrowthOptionsForm from "../features/growthoptions/GrowthOptionsForm";
import GrowthOptionList from "../features/growthoptions/GrowthOptionList";

export default function GrowthManagement() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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

  if (isMobile) {
    return (
      <Box sx={{ p: 3, textAlign: "center", direction: "rtl" }}>
        <Typography variant="h4" gutterBottom>
          מסך מנהל
        </Typography>
        <Typography variant="body1" color="text.secondary">
          מסך זה מיועד לשימוש במחשב שולחני בלבד. אנא גש ממכשיר עם מסך גדול יותר.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
   
      {pageLoading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      <Box sx={{ textAlign: "right", mb: 3 }}>
        <Typography variant="h4" fontWeight={800}>
          ניהול אפשרויות צמיחה
        </Typography>
        <Typography color="text.secondary">
          ערוך את המידע על אפשרויות הקריירה והצמיחה לבוגרים
        </Typography>
      </Box>

      <GrowthOptionsForm />

      <GrowthOptionList />
    </Box>
  );
}
