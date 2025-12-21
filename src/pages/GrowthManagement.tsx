import { Box } from "@mui/material";
import GrowthOptionsForm from "../features/courses/components/GrowthOptionsForm";
import GrowthOptionList from "../features/courses/components/GrowthOptionList";

export default function GrowthManagement() {
  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      {/* כותרת + תיאור + עריכה כללית */}
      <GrowthOptionsForm />

      {/* אפשרויות הצמיחה (כרטיסים) */}
      <GrowthOptionList />
    </Box>
  );
}
