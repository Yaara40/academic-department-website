import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import SourceIcon from "@mui/icons-material/Source";
import { logEvent } from "../../analytics.ts";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sources, setSources] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success",
  );

  const availableSources = ["אתר", "רשתות חברתיות", "יום פתוח", "המלצה מחבר"];

  const handleSourceChange = (source: string) => {
    setSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source],
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1. שם - חובה
    if (!name.trim()) {
      newErrors.name = "שם מלא הוא שדה חובה";
    } else if (name.trim().length < 2) {
      newErrors.name = "שם חייב להכיל לפחות 2 תווים";
    }

    // 2. אימייל - חובה + פורמט
    const emailClean = email.trim().toLowerCase();
    if (!emailClean) {
      newErrors.email = "אימייל הוא שדה חובה";
    } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailClean)) {
      newErrors.email = "פורמט אימייל לא תקין (לדוגמה: example@domain.com)";
    }

    // 3. טלפון - חובה + פורמט ישראלי
    const phoneClean = phone.replace(/\s/g, "");
    if (!phoneClean.trim()) {
      newErrors.phone = "טלפון הוא שדה חובה";
    } else if (!/^0(5[0-8]|7[3-9])-?\d{7}$/.test(phoneClean)) {
      newErrors.phone = "פורמט טלפון לא תקין (לדוגמה: 050-1234567)";
    }

    // 4. הודעה - חובה
    if (!message.trim()) {
      newErrors.message = "הודעה היא שדה חובה";
    } else if (message.trim().length < 10) {
      newErrors.message = "הודעה חייבת להכיל לפחות 10 תווים";
    }

    // 5. מקורות - חובה לבחור לפחות אחד
    if (sources.length === 0) {
      newErrors.sources = "יש לבחור לפחות מקור אחד";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // ✅ מעקב GA - שגיאת ולידציה
      logEvent("Contact", "Validation Error", "User Contact Form");

      setSnackSeverity("error");
      setSnackMsg("❌ יש שדות לא תקינים. תקני את השגיאות ונסי שוב.");
      setSnackOpen(true);
      return;
    }

    // כאן תוסיפי שמירה ל-Firestore בעתיד
    console.log("Contact submitted:", { name, email, phone, message, sources });

    // ✅ מעקב GA - שליחת טופס מוצלחת
    logEvent("Contact", "Form Submitted", `Sources: ${sources.join(", ")}`);

    setSnackSeverity("success");
    setSnackMsg("✅ הפרטים נשלחו בהצלחה! ניצור איתך קשר בהקדם.");
    setSnackOpen(true);

    // איפוס טופס
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSources([]);
    setErrors({});
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 3,
        mb: 4,
        bgcolor: "background.paper",
        direction: "rtl",
      }}
    >
      <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
        השארת פרטים
      </Typography>

      <Box sx={{ display: "grid", gap: 2 }}>
        {/* שם */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PersonIcon color="primary" />
          <TextField
            fullWidth
            label="שם מלא *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name || " "}
            color="primary"
          />
        </Box>

        {/* אימייל */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EmailIcon color="primary" />
          <TextField
            fullWidth
            label="אימייל *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(errors.email)}
            helperText={errors.email || "לדוגמה: name@example.com"}
            type="email"
            inputProps={{ inputMode: "email", dir: "ltr" }}
            color="primary"
          />
        </Box>

        {/* טלפון */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PhoneIcon color="primary" />
          <TextField
            fullWidth
            label="טלפון *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone || "לדוגמה: 050-1234567"}
            type="tel"
            inputProps={{ inputMode: "tel", dir: "ltr" }}
            color="primary"
          />
        </Box>

        {/* הודעה */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <MessageIcon color="primary" sx={{ mt: 2 }} />
          <TextField
            fullWidth
            label="הודעה *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            error={Boolean(errors.message)}
            helperText={
              errors.message ||
              "ספר/י לנו קצת על עצמך ולמה את/ה מעוניין/ת להצטרף"
            }
            multiline
            rows={4}
            color="primary"
          />
        </Box>

        {/* איפה שמעת עלינו */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          <SourceIcon color="primary" sx={{ mt: 1 }} />
          <FormControl
            error={Boolean(errors.sources)}
            component="fieldset"
            fullWidth
          >
            <FormLabel component="legend" sx={{ fontWeight: 700, mb: 1 }}>
              איפה שמעת עלינו? * (ניתן לבחור יותר מאחד)
            </FormLabel>
            <FormGroup>
              {availableSources.map((source) => (
                <FormControlLabel
                  key={source}
                  control={
                    <Checkbox
                      checked={sources.includes(source)}
                      onChange={() => handleSourceChange(source)}
                      color="primary"
                    />
                  }
                  label={source}
                />
              ))}
            </FormGroup>
            <FormHelperText>{errors.sources || " "}</FormHelperText>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          שלח פרטים
        </Button>
      </Box>

      {/* Snackbar הודעות */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
