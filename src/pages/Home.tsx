import { useMediaQuery, useTheme, Box, Typography } from "@mui/material";
import HomeList from "../features/home/components/HomeList.tsx";
import ThemeToggle from "../components/ThemeToggle";
import { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

export default function Home() {
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

  // אם מסך קטן מדי - הצג הודעה
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
    <Box sx={{ direction: "rtl" }}>
      {/* ✅ הוספה: פס טעינה */}
      {pageLoading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

      <Box sx={{ p: 3 }}>
        {/* אזור הכותרת המעודכן עם הכפתור */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // זה מה שדוחף צדדים מנוגדים
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* צד ימין: הכותרת */}
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "text.primary" }}
            >
              ניהול דף הבית
            </Typography>
            <Typography color="text.secondary">
              נהל את כל המידע המוצג בדף הבית
            </Typography>
          </Box>

          {/* צד שמאל: הכפתור החדש */}
          <ThemeToggle />
        </Box>

        <HomeList />
      </Box>
    </Box>
  );
}
