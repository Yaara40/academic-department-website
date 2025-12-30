import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Course } from "../../../models/Course";
import { addCourse } from "../../../firebase/courses";

interface FormValues {
  courseId: string;
  name: string;
  description: string;
  credits: number;
  year: string;
  semester: string;
  syllabus: string;
  isMandatory: boolean;
  isActive: boolean;
  instructor: string;
}

interface FormErrors {
  [key: string]: boolean | string;
}

export default function CoursesForm() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    courseId: "",
    name: "",
    description: "",
    credits: 3,
    year: "",
    semester: "",
    syllabus: "",
    isMandatory: false,
    isActive: true,
    instructor: "",
  };

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "credits") {
      const num = Number(value);
      setValues({ ...values, credits: Number.isNaN(num) ? 0 : num });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleToggleChange =
    (field: "isMandatory" | "isActive") =>
    (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      if (newValue !== null) {
        const boolValue = newValue === "yes";
        setValues({ ...values, [field]: boolValue });
        setErrors({ ...errors, [field]: false });
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};

    // 1. מזהה קורס - חובה: 8 מספרים
    if (!values.courseId.trim()) {
      newErrors.courseId = 'מזהה קורס הוא שדה חובה';
    } else if (!/^\d{8}$/.test(values.courseId)) {
      newErrors.courseId = 'מזהה קורס חייב להיות בדיוק 8 ספרות';
    }

    // 2. שם הקורס - חובה: 2-80 תווים
    if (!values.name.trim()) {
      newErrors.name = 'שם הקורס הוא שדה חובה';
    } else if (values.name.length < 2 || values.name.length > 80) {
      newErrors.name = 'שם הקורס חייב להיות בין 2-80 תווים';
    } else if (/<|>|script/i.test(values.name)) {
      newErrors.name = 'שם הקורס מכיל תווים אסורים';
    }

    // 3. תיאור הקורס - חובה: 100-300 תווים
    if (!values.description.trim()) {
      newErrors.description = 'תיאור הקורס הוא שדה חובה';
    } else if (values.description.length < 100 || values.description.length > 300) {
      newErrors.description = 'תיאור הקורס חייב להיות בין 100-300 תווים';
    }

    // 4. נקודות זכות - חובה: מספר בין 1-10
    if (values.credits < 1 || values.credits > 10) {
      newErrors.credits = 'נקודות זכות חייבות להיות מספר בין 1-10';
    }

    // 5. שנה - חובה
    if (!values.year) {
      newErrors.year = 'שנה היא שדה חובה';
    }

    // 6. סמסטר - חובה
    if (!values.semester) {
      newErrors.semester = 'סמסטר הוא שדה חובה';
    }

    // 7. קישור לסילבוס - אופציונלי, אבל אם יש - חייב להיות URL תקין
    if (values.syllabus.trim() && !/^https?:\/\/.+/.test(values.syllabus)) {
      newErrors.syllabus = 'קישור לסילבוס חייב להתחיל ב-http:// או https://';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // יצירת אובייקט קורס חדש
    const newCourse = new Course(
      "",  // Firestore ייצור ID אוטומטית
      values.courseId,
      values.name,
      values.credits,
      values.semester,
      values.year,
      values.description,
      values.syllabus,
      values.isMandatory,
      values.isActive,
      values.instructor
    );

    // שמירה ב-Firestore
    setLoading(true);
    addCourse(newCourse)
      .then(() => {
        setLoading(false);
        alert('✅ הקורס נשמר בהצלחה ב-Firestore!');
        navigate("/courses");
      })
      .catch((error) => {
        setLoading(false);
        alert('❌ שגיאה בשמירת הקורס: ' + error.message);
      });
  };

  const handleCancel = () => {
    navigate("/courses");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        m: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 800,
        direction: "rtl",
        backgroundColor: "#fff",
        padding: 4,
        borderRadius: 2,
        boxShadow: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <h2>הוספת קורס חדש</h2>

      {/* מזהה קורס */}
      <TextField
        required
        error={!!errors.courseId}
        fullWidth
        id="courseId"
        name="courseId"
        label="מזהה קורס (8 ספרות)"
        placeholder="12345678"
        value={values.courseId}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d{0,8}$/.test(value)) {
            handleChange(e);
          }
        }}
        helperText={errors.courseId || "הזן בדיוק 8 ספרות"}
        inputProps={{ maxLength: 8 }}
      />

      {/* שם הקורס */}
      <TextField
        required
        error={!!errors.name}
        fullWidth
        id="name"
        name="name"
        label="שם הקורס (2-80 תווים)"
        placeholder="הזן שם קורס..."
        value={values.name}
        onChange={handleChange}
        helperText={errors.name || `${values.name.length}/80 תווים`}
      />

      {/* תיאור */}
      <TextField
        required
        error={!!errors.description}
        fullWidth
        id="description"
        name="description"
        label="תיאור (100-300 תווים)"
        placeholder="תיאור מפורט של הקורס..."
        multiline
        rows={4}
        value={values.description}
        onChange={handleChange}
        helperText={errors.description || `${values.description.length}/300 תווים`}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* נקודות זכות */}
        <TextField
          required
          error={!!errors.credits}
          id="credits"
          name="credits"
          label="נקודות זכות (1-10)"
          type="number"
          value={values.credits}
          onChange={handleChange}
          helperText={errors.credits || ""}
          slotProps={{
            htmlInput: { min: 1, max: 10 },
          }}
          sx={{ flex: 1 }}
        />

        {/* שנה */}
        <TextField
          required
          error={!!errors.year}
          select
          id="year"
          name="year"
          label="שנה"
          value={values.year}
          onChange={handleChange}
          helperText={errors.year || ""}
          sx={{ flex: 1 }}
        >
          <MenuItem value="שנה א">שנה א</MenuItem>
          <MenuItem value="שנה ב">שנה ב</MenuItem>
          <MenuItem value="שנה ג">שנה ג</MenuItem>
          <MenuItem value="שנה ד">שנה ד</MenuItem>
        </TextField>

        {/* סמסטר */}
        <TextField
          required
          error={!!errors.semester}
          select
          id="semester"
          name="semester"
          label="סמסטר"
          value={values.semester}
          onChange={handleChange}
          helperText={errors.semester || ""}
          sx={{ flex: 1 }}
        >
          <MenuItem value="א">סמסטר א</MenuItem>
          <MenuItem value="ב">סמסטר ב</MenuItem>
          <MenuItem value="קיץ">סמסטר קיץ</MenuItem>
        </TextField>
      </Box>

      {/* קישור לסילבוס */}
      <TextField
        fullWidth
        error={!!errors.syllabus}
        id="syllabus"
        name="syllabus"
        label="קישור לסילבוס (אופציונלי)"
        placeholder="https://..."
        type="url"
        value={values.syllabus}
        onChange={handleChange}
        helperText={errors.syllabus || "חייב להתחיל ב-http:// או https://"}
      />

      {/* מרצה */}
      <TextField
        fullWidth
        id="instructor"
        name="instructor"
        label="מרצה (אופציונלי)"
        placeholder="ד״ר..."
        value={values.instructor}
        onChange={handleChange}
        helperText="שם המרצה שמלמד את הקורס"
      />

      {/* קורס חובה */}
      <Box>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
          קורס חובה *
        </Typography>
        <ToggleButtonGroup
          value={values.isMandatory ? "yes" : "no"}
          exclusive
          onChange={handleToggleChange("isMandatory")}
          fullWidth
          color="primary"
        >
          <ToggleButton value="yes">כן</ToggleButton>
          <ToggleButton value="no">לא</ToggleButton>
        </ToggleButtonGroup>
        {errors.isMandatory && (
          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
            {errors.isMandatory}
          </Typography>
        )}
      </Box>

      {/* קורס פעיל */}
      <Box>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
          קורס פעיל *
        </Typography>
        <ToggleButtonGroup
          value={values.isActive ? "yes" : "no"}
          exclusive
          onChange={handleToggleChange("isActive")}
          fullWidth
          color="primary"
        >
          <ToggleButton value="yes">כן</ToggleButton>
          <ToggleButton value="no">לא</ToggleButton>
        </ToggleButtonGroup>
        {errors.isActive && (
          <Typography color="error" variant="caption" sx={{ mt: 0.5, display: "block" }}>
            {errors.isActive}
          </Typography>
        )}
      </Box>

      {/* כפתורים */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", mt: 2, alignItems: "center" }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "שמור"}
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleCancel} 
          size="large"
          disabled={loading}
        >
          ביטול
        </Button>
      </Box>
    </Box>
  );
}