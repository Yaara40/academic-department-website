import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Requirement } from "../../../models/Home";

type SnackState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const isOnlyDigits = (value: string) => /^[0-9]+$/.test(value.trim());

export default function RequirementsForm() {
  // שימוש בשמות הצבעים מה-Theme
  const colors = useMemo(() => ["cardBlue", "cardGreen", "cardPurple", "cardOrange", "cardYellow"], []);

  const initialRequirements: Requirement[] = useMemo(
    () => [
      { id: "1", title: "שנות לימוד", subtitle: "3-4 שנים", value: "3-4", color: "cardBlue" },
      { id: "2", title: "פרויקטים מעשיים", subtitle: "לפחות שני פרויקטים גדולים", value: "+2", color: "cardGreen" },
      { id: "3", title: "רמת אנגלית", subtitle: "ציון מינימלי באמי״ר", value: "+85", color: "cardPurple" },
      { id: "4", title: "נקודות זכות כוללות", subtitle: "מינימום נקודות זכות לתואר", value: "120", color: "cardOrange" },
    ],
    []
  );

  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentReq, setCurrentReq] = useState<Requirement | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubtitle, setEditedSubtitle] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snack, setSnack] = useState<SnackState>({ open: false, message: "", severity: "success" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const openSnack = (message: string, severity: SnackState["severity"]) => {
    setSnack({ open: true, message, severity });
  };

  const resetFormFields = () => {
    setEditedTitle("");
    setEditedSubtitle("");
    setEditedValue("");
    setErrors({});
  };

  useEffect(() => {
    const saved = localStorage.getItem("requirements");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRequirements(parsed);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("requirements", JSON.stringify(requirements));
  }, [requirements]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const title = editedTitle.trim();
    const value = editedValue.trim();

    if (!title) newErrors.title = "כותרת דרישה היא שדה חובה";
    else if (isOnlyDigits(title)) newErrors.title = "כותרת לא יכולה להיות מספר";

    if (!value) newErrors.value = "ערך הדרישה הוא שדה חובה";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = (req: Requirement) => {
    setCurrentReq(req);
    setEditedTitle(req.title ?? "");
    setEditedSubtitle(req.subtitle ?? "");
    setEditedValue(req.value ?? "");
    setErrors({});
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }
    if (!currentReq) return;

    const updated: Requirement = {
      ...currentReq,
      title: editedTitle.trim(),
      subtitle: editedSubtitle.trim(),
      value: editedValue.trim(),
    };

    setRequirements((prev) => prev.map((r) => (r.id === currentReq.id ? updated : r)));
    setEditDialogOpen(false);
    setCurrentReq(null);
    resetFormFields();
    openSnack("✅ עודכן בהצלחה", "success");
  };

  const handleOpenAddDialog = () => {
    setCurrentReq(null);
    resetFormFields();
    setAddDialogOpen(true);
  };

  const handleAddNew = () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }

    const newReq: Requirement = {
      id: Date.now().toString(),
      title: editedTitle.trim(),
      subtitle: editedSubtitle.trim(),
      value: editedValue.trim(),
      color: colors[Math.floor(Math.random() * colors.length)],
    };

    setRequirements((prev) => [...prev, newReq]);
    setAddDialogOpen(false);
    resetFormFields();
    openSnack("✅ נוסף בהצלחה", "success");
  };

  const handleAskDelete = (id: string) => {
    if (requirements.length === 1) {
      openSnack("❌ חייבת להישאר לפחות דרישה אחת", "error");
      return;
    }
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    setRequirements((prev) => prev.filter((r) => r.id !== pendingDeleteId));
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
    openSnack("🗑️ נמחק", "success");
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 3,
        mb: 4,
        bgcolor: "background.paper", // שימוש ברקע של ה-Theme
        direction: "rtl",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          דרישות התואר
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ "& .MuiButton-startIcon": { marginLeft: "6px" } }}
        >
          הוסף דרישה
        </Button>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 2 }}>
        {requirements.map((req) => (
          <Card key={req.id} sx={{ bgcolor: req.color }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                {/* הסרנו את הצבעים הקשיחים! ה-Theme דואג לזה */}
                <Typography variant="h4" fontWeight={800}>
                  {req.value}
                </Typography>

                <Box>
                  <IconButton size="small" onClick={() => handleEditClick(req)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleAskDelete(req.id)}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Typography fontWeight={700}>{req.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {req.subtitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* הדיאלוגים נשארו זהים, רק קיצרתי מעט כדי לחסוך מקום בתצוגה כאן */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת דרישה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 420 }}>
          <TextField fullWidth label="כותרת *" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} error={Boolean(errors.title)} helperText={errors.title || " "} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="תת כותרת" value={editedSubtitle} onChange={(e) => setEditedSubtitle(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="ערך *" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} error={Boolean(errors.value)} helperText={errors.value || " "} />
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveEdit} variant="contained">שמור</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>הוספת דרישה חדשה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 420 }}>
          <TextField fullWidth label="כותרת *" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} error={Boolean(errors.title)} helperText={errors.title || " "} sx={{ mt: 2, mb: 2 }} />
          <TextField fullWidth label="תת כותרת" value={editedSubtitle} onChange={(e) => setEditedSubtitle(e.target.value)} sx={{ mb: 2 }} />
          <TextField fullWidth label="ערך *" value={editedValue} onChange={(e) => setEditedValue(e.target.value)} error={Boolean(errors.value)} helperText={errors.value || " "} />
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setAddDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleAddNew} variant="contained">הוסף</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>אישור מחיקה</DialogTitle>
        <DialogContent sx={{ direction: "rtl" }}><Typography>האם למחוק את הדרישה?</Typography></DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>מחק</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={2500} onClose={() => setSnack((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnack((s) => ({ ...s, open: false }))} severity={snack.severity} variant="filled" sx={{ width: "100%" }}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
}