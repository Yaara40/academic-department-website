import { useEffect, useState } from "react";
import { Box, Button, Snackbar, TextField, Typography } from "@mui/material";

interface HeaderValues {
  pageTitle: string;
  pageDescription: string;
}

const LS_KEY = "growthOptionsHeader_v1";

const DEFAULTS: HeaderValues = {
  pageTitle: "כותרת הדף",
  pageDescription: "אפשרויות צמיחה וקריירה",
};

function safeParse(raw: string | null): HeaderValues | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<HeaderValues>;
    if (typeof parsed?.pageTitle !== "string") return null;
    if (typeof parsed?.pageDescription !== "string") return null;
    return { pageTitle: parsed.pageTitle, pageDescription: parsed.pageDescription };
  } catch {
    return null;
  }
}

export default function GrowthOptionsForm() {
  const [values, setValues] = useState<HeaderValues>(DEFAULTS);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [saved, setSaved] = useState(false);

  // ✅ טוענים מ-localStorage רק אחרי mount (יציב)
  useEffect(() => {
    try {
      const fromLS = safeParse(localStorage.getItem(LS_KEY));
      if (fromLS) setValues(fromLS);
    } catch {
      // אם יש חסימה/הגבלה בדפדפן, פשוט נשארים על ברירת מחדל
    }
  }, []);

  const validate = () => {
    const e: Record<string, boolean> = {};
    e.pageTitle = values.pageTitle.trim().length === 0;
    e.pageDescription = values.pageDescription.trim().length === 0;
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleSave = () => {
    if (!validate()) return;

    try {
      localStorage.setItem(LS_KEY, JSON.stringify(values));
      setSaved(true);
    } catch {
      // אם localStorage חסום (נדיר) – לא נקרוס
      alert("לא ניתן לשמור כרגע (ייתכן שהדפדפן חוסם LocalStorage).");
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: 3,
        p: 3,
        display: "grid",
        gap: 2,
        direction: "rtl",
      }}
    >
      <Typography fontWeight={900} sx={{ textAlign: "right" }}>
        כותרת ותיאור ראשי
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="כותרת הדף"
          value={values.pageTitle}
          onChange={(e) => setValues({ ...values, pageTitle: e.target.value })}
          error={Boolean(errors.pageTitle)}
          helperText={errors.pageTitle ? "חובה להזין כותרת" : " "}
          fullWidth
          inputProps={{ style: { textAlign: "right" } }}
        />

        <TextField
          label="תיאור הדף"
          value={values.pageDescription}
          onChange={(e) => setValues({ ...values, pageDescription: e.target.value })}
          error={Boolean(errors.pageDescription)}
          helperText={errors.pageDescription ? "חובה להזין תיאור" : " "}
          multiline
          minRows={3}
          fullWidth
          inputProps={{ style: { textAlign: "right" } }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSave}>
            שמור
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={1600}
        onClose={() => setSaved(false)}
        message="נשמר ✅"
      />
    </Box>
  );
}
