import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
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
import type { Article } from "../../../models/Home";
import {
  getAllArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from "../../../firebase/articles";

type SnackState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const isOnlyDigits = (value: string) => /^[0-9]+$/.test(value.trim());

const isValidHttpUrl = (value: string) => {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export default function ArticlesForm() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedArticleUrl, setEditedArticleUrl] = useState("");
  const [editedTags, setEditedTags] = useState("");

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
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error("Error loading articles:", error);
        openSnack("❌ שגיאה בטעינת המאמרים", "error");
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
    setEditedImageUrl("");
    setEditedArticleUrl("");
    setEditedTags("");
    setErrors({});
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const title = editedTitle.trim();
    const img = editedImageUrl.trim();
    const articleUrl = editedArticleUrl.trim();

    if (!title) {
      newErrors.title = "כותרת המאמר היא שדה חובה";
    } else if (isOnlyDigits(title)) {
      newErrors.title =
        "כותרת לא יכולה להיות מספר. כתבי טקסט (למשל: 'React למתחילים')";
    }

    if (!img) {
      newErrors.imageUrl = "קישור לתמונה הוא שדה חובה";
    } else if (!isValidHttpUrl(img)) {
      newErrors.imageUrl =
        "קישור לתמונה חייב להיות URL תקין שמתחיל ב-http:// או https://";
    }

    if (!articleUrl) {
      newErrors.articleUrl = "קישור למאמר הוא שדה חובה";
    } else if (!isValidHttpUrl(articleUrl)) {
      newErrors.articleUrl =
        "קישור למאמר חייב להיות URL תקין שמתחיל ב-http:// או https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = (article: Article) => {
    setCurrentArticle(article);
    setEditedTitle(article.title ?? "");
    setEditedImageUrl(article.imageUrl ?? "");
    setEditedArticleUrl(article.articleUrl ?? "");
    setEditedTags((article.tags ?? []).join(", "));
    setErrors({});
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס. תקני ותנסי שוב.", "error");
      return;
    }

    if (!currentArticle) return;

    try {
      const updated = {
        title: editedTitle.trim(),
        imageUrl: editedImageUrl.trim(),
        articleUrl: editedArticleUrl.trim(),
        tags: editedTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await updateArticle({ ...currentArticle, ...updated });

      setArticles((prev) =>
        prev.map((a) =>
          a.id === currentArticle.id ? { ...a, ...updated } : a,
        ),
      );

      setEditDialogOpen(false);
      setCurrentArticle(null);
      resetFormFields();
      openSnack("✅ המאמר עודכן בהצלחה", "success");
    } catch (error) {
      console.error("Error updating article:", error);
      openSnack("❌ שגיאה בעדכון המאמר", "error");
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentArticle(null);
    resetFormFields();
    setAddDialogOpen(true);
  };

  const handleAddNew = async () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס. תקני ותנסי שוב.", "error");
      return;
    }

    try {
      const newArticle = {
        title: editedTitle.trim(),
        imageUrl: editedImageUrl.trim(),
        articleUrl: editedArticleUrl.trim(),
        tags: editedTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const id = await addArticle(newArticle);

      setArticles((prev) => [...prev, { id, ...newArticle }]);
      setAddDialogOpen(false);
      resetFormFields();
      openSnack("✅ מאמר נוסף בהצלחה", "success");
    } catch (error) {
      console.error("Error adding article:", error);
      openSnack("❌ שגיאה בהוספת המאמר", "error");
    }
  };

  const handleAskDelete = (id: string) => {
    if (articles.length === 1) {
      openSnack(
        "❌ לא ניתן למחוק את המאמר היחיד. חייב להישאר לפחות מאמר אחד.",
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
      await deleteArticle(pendingDeleteId);
      setArticles((prev) => prev.filter((a) => a.id !== pendingDeleteId));
      setDeleteDialogOpen(false);
      setPendingDeleteId(null);
      openSnack("🗑️ המאמר נמחק", "success");
    } catch (error) {
      console.error("Error deleting article:", error);
      openSnack("❌ שגיאה במחיקת המאמר", "error");
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
          מאמרים על המקצוע והתעשייה
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
          הוסף מאמר
        </Button>
      </Box>

      {articles.map((article) => (
        <Box
          key={article.id}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                objectFit: "cover",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://via.placeholder.com/60";
              }}
            />

            <Box>
              <Typography fontWeight={700}>{article.title}</Typography>
              {article.articleUrl && (
                <Typography variant="caption" color="text.secondary">
                  {article.articleUrl}
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                {(article.tags ?? []).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Box>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditClick(article)}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleAskDelete(article.id)}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Dialog עריכה */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת מאמר</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 420 }}>
          <TextField
            fullWidth
            label="כותרת המאמר *"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title || " "}
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          />

          <TextField
            fullWidth
            label="קישור לתמונה *"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || "חייב להתחיל ב-http:// או https://"}
            color="primary"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="קישור למאמר *"
            value={editedArticleUrl}
            onChange={(e) => setEditedArticleUrl(e.target.value)}
            error={Boolean(errors.articleUrl)}
            helperText={
              errors.articleUrl || "חייב להתחיל ב-http:// או https://"
            }
            color="primary"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="תגיות (מופרדות בפסיק)"
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
            placeholder="קריירה, AI, חדש"
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
        <DialogTitle sx={{ direction: "rtl" }}>הוספת מאמר חדש</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 420 }}>
          <TextField
            fullWidth
            label="כותרת המאמר *"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title || " "}
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          />

          <TextField
            fullWidth
            label="קישור לתמונה *"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || "חייב להתחיל ב-http:// או https://"}
            color="primary"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="קישור למאמר *"
            value={editedArticleUrl}
            onChange={(e) => setEditedArticleUrl(e.target.value)}
            error={Boolean(errors.articleUrl)}
            helperText={
              errors.articleUrl || "חייב להתחיל ב-http:// או https://"
            }
            color="primary"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="תגיות (מופרדות בפסיק)"
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
            placeholder="קריירה, AI, חדש"
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
          <Typography>האם למחוק את המאמר? פעולה זו לא ניתנת לשחזור.</Typography>
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

      {/* Snackbar הודעות */}
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
