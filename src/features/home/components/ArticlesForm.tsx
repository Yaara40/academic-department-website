import { useEffect, useMemo, useState } from "react";
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
} from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Article } from "../../../models/Home";

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
  const initialArticles: Article[] = useMemo(
    () => [
      {
        id: "1",
        title: "מדריך קריירה בהייטק 2025",
        imageUrl: "https://www.ecomschool.co.il/wp-content/uploads/2025/03/לימודים-הייטק-1.jpg",
        tags: ["קריירה"],
      },
      {
        id: "2",
        title: "מהפכת הבינה המלאכותית",
        imageUrl:
          "https://static.wixstatic.com/media/979988_7cdbeaac56b54d07bf75b8bbb710ba41~mv2.jpg/v1/fill/w_568,h_324,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/979988_7cdbeaac56b54d07bf75b8bbb710ba41~mv2.jpg",
        tags: ["AI", "חדש"],
      },
      {
        id: "3",
        title: "להקים סטארטאפ - המדריך השלם",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWfcXDo24kK9bopcycPf0uQrdqDrbUdIirQ&s",
        tags: ["יזמות"],
      },
    ],
    []
  );

  const [articles, setArticles] = useState<Article[]>(initialArticles);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedTags, setEditedTags] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [snack, setSnack] = useState<SnackState>({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // טעינה מ-LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("articles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setArticles(parsed);
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error);
      }
    }
  }, []);

  // שמירה ל-LocalStorage בכל שינוי (כדי שהכל ישתקף במסכי המשתמש)
  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);

  const openSnack = (message: string, severity: SnackState["severity"]) => {
    setSnack({ open: true, message, severity });
  };

  const resetFormFields = () => {
    setEditedTitle("");
    setEditedImageUrl("");
    setEditedTags("");
    setErrors({});
  };

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    const title = editedTitle.trim();
    const img = editedImageUrl.trim();

    // 1) כותרת - חובה וגם לא מספר
    if (!title) {
      newErrors.title = "כותרת המאמר היא שדה חובה";
    } else if (isOnlyDigits(title)) {
      newErrors.title = "כותרת לא יכולה להיות מספר. כתבי טקסט (למשל: 'React למתחילים')";
    }

    // 2) קישור לתמונה - חובה + URL תקין (http/https)
    if (!img) {
      newErrors.imageUrl = "קישור לתמונה הוא שדה חובה";
    } else if (!isValidHttpUrl(img)) {
      newErrors.imageUrl = "קישור לתמונה חייב להיות URL תקין שמתחיל ב-http:// או https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = (article: Article) => {
    setCurrentArticle(article);
    setEditedTitle(article.title ?? "");
    setEditedImageUrl(article.imageUrl ?? "");
    setEditedTags((article.tags ?? []).join(", "));
    setErrors({});
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס. תקני ותנסי שוב.", "error");
      return;
    }

    if (!currentArticle) return;

    const updated: Article = {
      ...currentArticle,
      title: editedTitle.trim(),
      imageUrl: editedImageUrl.trim(),
      tags: editedTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    setArticles((prev) => prev.map((a) => (a.id === currentArticle.id ? updated : a)));
    setEditDialogOpen(false);
    setCurrentArticle(null);
    resetFormFields();
    openSnack("✅ המאמר עודכן בהצלחה", "success");
  };

  const handleOpenAddDialog = () => {
    setCurrentArticle(null);
    resetFormFields();
    setAddDialogOpen(true);
  };

  const handleAddNew = () => {
    if (!validateFields()) {
      openSnack("❌ יש שגיאות בטופס. תקני ותנסי שוב.", "error");
      return;
    }

    const newArticle: Article = {
      id: Date.now().toString(),
      title: editedTitle.trim(),
      imageUrl: editedImageUrl.trim(),
      tags: editedTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    setArticles((prev) => [...prev, newArticle]);
    setAddDialogOpen(false);
    resetFormFields();
    openSnack("✅ מאמר נוסף בהצלחה", "success");
  };

  // פתיחת דיאלוג מחיקה (במקום confirm)
  const handleAskDelete = (id: string) => {
    if (articles.length === 1) {
      openSnack("❌ לא ניתן למחוק את המאמר היחיד. חייב להישאר לפחות מאמר אחד.", "error");
      return;
    }
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    setArticles((prev) => prev.filter((a) => a.id !== pendingDeleteId));
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
    openSnack("🗑️ המאמר נמחק", "success");
  };

  return (
    <Box
      sx={{
        border: "1px solid #eee",
        borderRadius: 3,
        p: 3,
        mb: 4,
        bgcolor: "#fff",
        direction: "rtl",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          מאמרים על המקצוע והתעשייה
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ "& .MuiButton-startIcon": { marginLeft: "6px" } }}
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
            bgcolor: "#f9fafb",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }}
              onError={(e) => {
                // fallback קטן אם הקישור שבור
                (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/60";
              }}
            />

            <Box>
              <Typography fontWeight={700}>{article.title}</Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                {(article.tags ?? []).map((tag, index) => (
                  <Chip key={index} label={tag} size="small" color="primary" />
                ))}
              </Box>
            </Box>
          </Box>

          <Box>
            <IconButton size="small" onClick={() => handleEditClick(article)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleAskDelete(article.id)}>
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
            sx={{ mt: 2, mb: 2 }}
          />

          <TextField
            fullWidth
            label="קישור לתמונה *"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || "חייב להתחיל ב-http:// או https://"}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="תגיות (מופרדות בפסיק)"
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
            placeholder="קריירה, AI, חדש"
          />
        </DialogContent>

        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setEditDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleSaveEdit} variant="contained">
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
            sx={{ mt: 2, mb: 2 }}
          />

          <TextField
            fullWidth
            label="קישור לתמונה *"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || "חייב להתחיל ב-http:// או https://"}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="תגיות (מופרדות בפסיק)"
            value={editedTags}
            onChange={(e) => setEditedTags(e.target.value)}
            placeholder="קריירה, AI, חדש"
          />
        </DialogContent>

        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setAddDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleAddNew} variant="contained">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog מחיקה */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>אישור מחיקה</DialogTitle>
        <DialogContent sx={{ direction: "rtl" }}>
          <Typography>האם למחוק את המאמר? פעולה זו לא ניתנת לשחזור.</Typography>
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setDeleteDialogOpen(false)}>ביטול</Button>
          <Button color="error" variant="contained" onClick={handleConfirmDelete}>
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
