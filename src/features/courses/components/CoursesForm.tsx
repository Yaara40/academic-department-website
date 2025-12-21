import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Course } from "../models/Course";

interface FormValues {
  courseId: string;
  name: string;
  description: string;
  credits: number;
  year: string;
  semester: string;
  syllabus: string;
  isMandatory: string;
  isActive: string;
}

interface FormErrors {
  [key: string]: boolean | string;
}

const LS_KEY = "courses";
const COURSES_UPDATED_EVENT = "coursesUpdated";

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
    isMandatory: "",
    isActive: "",
  };

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // ✅ credits צריך להיות number (TextField מחזיר string)
    if (name === "credits") {
      const num = Number(value);
      setValues({ ...values, credits: Number.isNaN(num) ? 0 : num });
    } else {
      setValues({ ...values, [name]: value });
    }

    // ולידציות בזמן הקלדה (כמו שהיה לך)
    if (name === "courseId") {
      const isValid = /^\d{0,5}$/.test(value);
      setErrors({
        ...errors,
        [name]: !isValid ? "מספר קורס חייב להיות 5 ספרות" : false,
      });
    } else {
      const target = event.target as HTMLInputElement;
      setErrors({ ...errors, [name]: !target.validity.valid });
    }
  };

  const handleToggleChange =
    (field: "isMandatory" | "isActive") =>
    (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
      if (newValue !== null) {
        setValues({ ...values, [field]: newValue });
        setErrors({ ...errors, [field]: false });
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: FormErrors = {};

    if (values.courseId.length !== 5) {
      newErrors.courseId = "מספר קורס חייב להיות בדיוק 5 ספרות";
    }
    if (!values.name.trim()) {
      newErrors.name = true;
    }
    if (values.credits < 1 || values.credits > 10) {
      newErrors.credits = true;
    }
    if (!values.year) {
      newErrors.year = true;
    }
    if (!values.semester) {
      newErrors.semester = true;
    }
    if (!values.isMandatory) {
      newErrors.isMandatory = "יש לבחור אם הקורס חובה";
    }
    if (!values.isActive) {
      newErrors.isActive = "יש לבחור אם הקורס פעיל";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // יצירת אובייקט Course חדש - עם כל השדות
    const newCourse = new Course(
      Date.now().toString(), // id
      values.name, // name
      values.credits, // credits
      values.semester, // semester
      values.courseId, // courseId
      values.description, // description
      values.year, // year
      values.syllabus, // syllabus
      values.isMandatory, // isMandatory
      values.isActive // isActive
    );

    // שמירה ב-localStorage
    const storedCourses = localStorage.getItem(LS_KEY);
    const existingCourses = storedCourses ? JSON.parse(storedCourses) : [];
    const updatedCourses = [...existingCourses, newCourse];

    localStorage.setItem(LS_KEY, JSON.stringify(updatedCourses));

    // ✅ גורם לכל List שמתעדכן מה-storage להתעדכן מייד (באותו טאב)
    window.dispatchEvent(new Event(COURSES_UPDATED_EVENT));

    console.log("Course saved!", newCourse);

    navigate("/courses");
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

      <TextField
        required
        error={!!errors.courseId}
        fullWidth
        id="courseId"
        name="courseId"
        label="מזהה קורס (5 ספרות)"
        placeholder="12345"
        value={values.courseId}
        onChange={handleChange}
        helperText={errors.courseId || "הזן בדיוק 5 ספרות"}
        inputProps={{ maxLength: 5, pattern: "\\d{5}" }}
      />

      <TextField
        required
        error={!!errors.name}
        fullWidth
        id="name"
        name="name"
        label="שם הקורס"
        placeholder="הזן שם קורס..."
        value={values.name}
        onChange={handleChange}
        helperText={errors.name ? "שדה חובה" : ""}
      />

      <TextField
        fullWidth
        id="description"
        name="description"
        label="תיאור"
        placeholder="תיאור קצר של הקורס..."
        multiline
        rows={4}
        value={values.description}
        onChange={handleChange}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          required
          error={!!errors.credits}
          id="credits"
          name="credits"
          label="נקודות זכות"
          type="number"
          value={values.credits}
          onChange={handleChange}
          helperText={errors.credits ? "נקודות זכות חייבות להיות בין 1-10" : ""}
          slotProps={{
            htmlInput: { min: 1, max: 10 },
          }}
          sx={{ flex: 1 }}
        />

        <TextField
          required
          error={!!errors.year}
          select
          id="year"
          name="year"
          label="שנה"
          value={values.year}
          onChange={handleChange}
          sx={{ flex: 1 }}
        >
          <MenuItem value="שנה א">שנה א</MenuItem>
          <MenuItem value="שנה ב">שנה ב</MenuItem>
          <MenuItem value="שנה ג">שנה ג</MenuItem>
          <MenuItem value="שנה ד">שנה ד</MenuItem>
        </TextField>

        <TextField
          required
          error={!!errors.semester}
          select
          id="semester"
          name="semester"
          label="סמסטר"
          value={values.semester}
          onChange={handleChange}
          sx={{ flex: 1 }}
        >
          <MenuItem value="א">סמסטר א</MenuItem>
          <MenuItem value="ב">סמסטר ב</MenuItem>
          <MenuItem value="קיץ">סמסטר קיץ</MenuItem>
        </TextField>
      </Box>

      <TextField
        fullWidth
        id="syllabus"
        name="syllabus"
        label="קישור לסילבוס"
        placeholder="https://..."
        type="url"
        value={values.syllabus}
        onChange={handleChange}
      />

      <Box>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
          קורס חובה *
        </Typography>
        <ToggleButtonGroup
          value={values.isMandatory}
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

      <Box>
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
          קורס פעיל *
        </Typography>
        <ToggleButtonGroup
          value={values.isActive}
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

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" size="large">
          שמור
        </Button>
        <Button variant="outlined" onClick={handleCancel} size="large">
          ביטול
        </Button>
      </Box>
    </Box>
  );
}
