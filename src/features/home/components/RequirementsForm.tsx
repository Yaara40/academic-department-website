import { useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Requirement } from "../../../models/Home";
import {
  getAllRequirements,
  addRequirement,
  updateRequirement,
  deleteRequirement,
} from "../../../firebase/requirements";

type SnackState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const isOnlyDigits = (value: string) => /^[0-9]+$/.test(value.trim());

export default function RequirementsForm() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentReq, setCurrentReq] = useState<Requirement | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubtitle, setEditedSubtitle] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snack, setSnack] = useState<SnackState>({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const greenColors = [
    "#C5E1A5", // ירוק פסטל בהיר
    "#AED581", // ירוק בהיר
    "#9CCC65", // ירוק בינוני בהיר
    "#8BC34A", // ירוק בינוני
    "#7CB342", // ירוק כהה יותר
  ];

  // טעינה מ-Firestore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getAllRequirements();
        setRequirements(data);
      } catch (error) {
        console.error("Error loading requirements:", error);
        openSnack("❌ שגיאה בטעינת הדרישות", "error");
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
    setEditedTitle("");
    setEditedSubtitle("");
    setEditedValue("");
    setErrors({});
  };

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

  const handleSaveEdit = async () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }
    if (!currentReq) return;

    try {
      const updated = {
        title: editedTitle.trim(),
        subtitle: editedSubtitle.trim(),
        value: editedValue.trim(),
      };

      const fullRequirement: Requirement = {
        ...currentReq,
        ...updated,
      };
      await updateRequirement(fullRequirement);

      setRequirements((prev) =>
        prev.map((r) => (r.id === currentReq.id ? { ...r, ...updated } : r)),
      );

      setEditDialogOpen(false);
      setCurrentReq(null);
      resetFormFields();
      openSnack("✅ עודכן בהצלחה", "success");
    } catch (error) {
      console.error("Error updating requirement:", error);
      openSnack("❌ שגיאה בעדכון", "error");
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentReq(null);
    resetFormFields();
    setAddDialogOpen(true);
  };

  const handleAddNew = async () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס", "error");
      return;
    }

    try {
      const newReq = {
        title: editedTitle.trim(),
        subtitle: editedSubtitle.trim(),
        value: editedValue.trim(),
        color: greenColors[Math.floor(Math.random() * greenColors.length)],
      };

      const id = await addRequirement(newReq);

      setRequirements((prev) => [...prev, { id, ...newReq }]);
      setAddDialogOpen(false);
      resetFormFields();
      openSnack("✅ נוסף בהצלחה", "success");
    } catch (error) {
      console.error("Error adding requirement:", error);
      openSnack("❌ שגיאה בהוספה", "error");
    }
  };

  const handleAskDelete = (id: string) => {
    if (requirements.length === 1) {
      openSnack("❌ חייבת להישאר לפחות דרישה אחת", "error");
      return;
    }
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;

    try {
      await deleteRequirement(pendingDeleteId);
      setRequirements((prev) => prev.filter((r) => r.id !== pendingDeleteId));
      setDeleteDialogOpen(false);
      setPendingDeleteId(null);
      openSnack("🗑️ נמחק", "success");
    } catch (error) {
      console.error("Error deleting requirement:", error);
      openSnack("❌ שגיאה במחיקה", "error");
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
        <Typography variant="h5" fontWeight={800} color="text.primary">
          דרישות התואר
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
          הוסף דרישה
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 2,
        }}
      >
        {requirements.map((req) => (
          <Card
            key={req.id}
            sx={{
              bgcolor: "primary.light",
              boxShadow: 0,
              transition: "all 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 2,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h4" fontWeight={800}>
                  {req.value}
                </Typography>

                <Box>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditClick(req)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleAskDelete(req.id)}
                  >
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

      {/* Dialog עריכה */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת דרישה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 420 }}>
          <TextField
            fullWidth
            label="כותרת *"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title || " "}
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תת כותרת"
            value={editedSubtitle}
            onChange={(e) => setEditedSubtitle(e.target.value)}
            color="primary"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="ערך *"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            error={Boolean(errors.value)}
            helperText={errors.value || " "}
            color="primary"
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
        <DialogTitle sx={{ direction: "rtl" }}>הוספת דרישה חדשה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 420 }}>
          <TextField
            fullWidth
            label="כותרת *"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title || " "}
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תת כותרת"
            value={editedSubtitle}
            onChange={(e) => setEditedSubtitle(e.target.value)}
            color="primary"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="ערך *"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            error={Boolean(errors.value)}
            helperText={errors.value || " "}
            color="primary"
          />
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setAddDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleAddNew} variant="contained" color="primary">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog מחיקה */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ direction: "rtl" }}>אישור מחיקה</DialogTitle>
        <DialogContent sx={{ direction: "rtl" }}>
          <Typography>האם למחוק את הדרישה?</Typography>
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

      {/* Snackbar */}
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
