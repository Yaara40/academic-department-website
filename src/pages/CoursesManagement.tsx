import CourseList from '../features/courses/components/CourseList';
import Box from '@mui/material/Box';

// ✅ הוספה
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";

const CoursesManagement = () => {
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
    <Box sx={{ direction: 'rtl' }}>
      {/* ✅ הוספה */}
      {pageLoading && <LinearProgress sx={{ mb: 2 }} />}

      <CourseList />
    </Box>
  );
};

export default CoursesManagement;
