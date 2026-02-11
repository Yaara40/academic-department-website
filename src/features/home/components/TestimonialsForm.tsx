import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Testimonial } from "../../../models/Home";
import {
  getAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../../firebase/testimonials";

type SnackState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

export default function TestimonialsForm() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] =
    useState<Testimonial | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedCompany, setEditedCompany] = useState("");
  const [editedText, setEditedText] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snack, setSnack] = useState<SnackState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // טעינה מ-Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getAllTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        openSnack("❌ שגיאה בטעינת ההמלצות", "error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openSnack = (message: string, severity: SnackState["severity"]) => {
    setSnack({ open: true, message, severity });
  };

  const resetFormFields = () => {
    setEditedName("");
    setEditedCompany("");
    setEditedText("");
    setErrors({});
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!editedName.trim()) {
      newErrors.name = "שם הבוגר/ת הוא שדה חובה";
    }

    if (!editedCompany.trim()) {
      newErrors.company = "תפקיד וחברה הם שדה חובה";
    }

    if (!editedText.trim()) {
      newErrors.text = "תוכן ההמלצה הוא שדה חובה";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setEditedName(testimonial.name);
    setEditedCompany(testimonial.company);
    setEditedText(testimonial.text);
    setErrors({});
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }

    if (!currentTestimonial) return;

    try {
      const updated = {
        name: editedName,
        company: editedCompany,
        text: editedText,
        initial: editedName.charAt(0),
      };

      await updateTestimonial({ ...currentTestimonial, ...updated });

      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === currentTestimonial.id ? { ...t, ...updated } : t,
        ),
      );

      setEditDialogOpen(false);
      resetFormFields();
      openSnack("✅ ההמלצה עודכנה בהצלחה", "success");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      openSnack("❌ שגיאה בעדכון ההמלצה", "error");
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentTestimonial(null);
    resetFormFields();
    setAddDialogOpen(true);
  };

  const handleAddNew = async () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }

    try {
      const newTestimonial = {
        name: editedName,
        company: editedCompany,
        text: editedText,
        initial: editedName.charAt(0),
        color: "#2c8332",
      };

      const id = await addTestimonial(newTestimonial);

      setTestimonials((prev) => [...prev, { id, ...newTestimonial }]);
      setAddDialogOpen(false);
      resetFormFields();
      openSnack("✅ המלצה נוספה בהצלחה", "success");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      openSnack("❌ שגיאה בהוספת ההמלצה", "error");
    }
  };

  const handleAskDelete = (id: string) => {
    if (testimonials.length === 1) {
      openSnack(
        "❌ לא ניתן למחוק את ההמלצה היחידה. חייבת להישאר לפחות המלצה אחת.",
        "error",
      );
      return;
    }
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      await deleteTestimonial(pendingDeleteId);
      setTestimonials((prev) => prev.filter((t) => t.id !== pendingDeleteId));
      setDeleteDialogOpen(false);
      setPendingDeleteId(null);
      openSnack("🗑️ ההמלצה נמחקה", "success");
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      openSnack("❌ שגיאה במחיקת ההמלצה", "error");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={800}>
          המלצות בוגרים
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{
            "& .MuiButton-startIcon": { marginLeft: "6px" },
          }}
        >
          הוסף המלצה
        </Button>
      </Box>

      {testimonials.map((testimonial) => (
        <Box
          key={testimonial.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            mb: 2,
            bgcolor: "action.hover",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Avatar sx={{ bgcolor: testimonial.color, width: 50, height: 50 }}>
              {testimonial.initial}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={700}>{testimonial.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {testimonial.company}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                "{testimonial.text}"
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip label="מוצג" size="small" color="success" />
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditClick(testimonial)}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleAskDelete(testimonial.id)}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת המלצה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="שם *"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name || " "}
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תפקיד/חברה *"
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
            error={Boolean(errors.company)}
            helperText={errors.company || " "}
            color="primary"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="טקסט ההמלצה *"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            error={Boolean(errors.text)}
            helperText={errors.text || " "}
            color="primary"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveEdit} variant="contained" color="primary">
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog הוספה */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>הוספת המלצה חדשה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="שם *"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name || " "}
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תפקיד/חברה *"
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
            error={Boolean(errors.company)}
            helperText={errors.company || " "}
            color="primary"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="טקסט ההמלצה *"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            error={Boolean(errors.text)}
            helperText={errors.text || " "}
            color="primary"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setAddDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleAddNew} variant="contained" color="primary">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>

      {}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ direction: "rtl" }}>אישור מחיקה</DialogTitle>
        <DialogContent sx={{ direction: "rtl" }}>
          <Typography>האם אתה בטוח שברצונך למחוק המלצה זו?</Typography>
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>

      {}
      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
