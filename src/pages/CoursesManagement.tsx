import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import CourseList from "../features/courses/components/CourseList";

const CoursesManagement = () => {
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
    <Box sx={{ direction: "rtl" }}>
      {pageLoading && <LinearProgress color="primary" sx={{ mb: 2 }} />}
      <CourseList />
    </Box>
  );
};

export default CoursesManagement;
