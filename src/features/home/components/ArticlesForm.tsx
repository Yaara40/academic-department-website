import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Article } from "../../../models/Home";

export default function ArticlesForm() {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "מדריך קריירה בהייטק 2025",
      imageUrl: "https://www.ecomschool.co.il/wp-content/uploads/2025/03/לימודים-הייטק-1.jpg",
      tags: ["קריירה"],
    },
    {
      id: "2",
      title: "מהפכת הבינה המלאכותית",
      imageUrl: "https://static.wixstatic.com/media/979988_7cdbeaac56b54d07bf75b8bbb710ba41~mv2.jpg/v1/fill/w_568,h_324,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/979988_7cdbeaac56b54d07bf75b8bbb710ba41~mv2.jpg",
      tags: ["AI", "חדש"],
    },
    {
      id: "3",
      title: "להקים סטארטאפ - המדריך השלם",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsWfcXDo24kK9bopcycPf0uQrdqDrbUdIirQ&s",
      tags: ["יזמות"],
    },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedImageUrl, setEditedImageUrl] = useState("");
  const [editedTags, setEditedTags] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // טעינה מ-LocalStorage
  useEffect(() => {
    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem('articles');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setArticles(parsed);
        } catch (error) {
          console.error('Error loading from localStorage:', error);
        }
      }
    };
    
    loadFromLocalStorage();
  }, []);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    // 1. כותרת מאמר - חובה, טקסט
    if (!editedTitle.trim()) {
      newErrors.title = 'כותרת המאמר היא שדה חובה';
    }

    // 2. תמונה למאמר - חובה, URL
    if (!editedImageUrl.trim()) {
      newErrors.imageUrl = 'קישור לתמונה הוא שדה חובה';
    } else if (!/^https?:\/\/.+/.test(editedImageUrl)) {
      newErrors.imageUrl = 'קישור לתמונה חייב להתחיל ב-http:// או https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditClick = (article: Article) => {
    setCurrentArticle(article);
    setEditedTitle(article.title);
    setEditedImageUrl(article.imageUrl);
    setEditedTags(article.tags.join(", "));
    setErrors({});
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!validateFields()) {
      return;
    }

    if (currentArticle) {
      setArticles(
        articles.map((article) =>
          article.id === currentArticle.id
            ? { ...article, title: editedTitle, imageUrl: editedImageUrl, tags: editedTags.split(",").map(t => t.trim()).filter(Boolean) }
            : article
        )
      );
    }
    setEditDialogOpen(false);
    setErrors({});
  };

  const handleAddNew = () => {
    if (!validateFields()) {
      return;
    }

    const newArticle: Article = {
      id: Date.now().toString(),
      title: editedTitle,
      imageUrl: editedImageUrl,
      tags: editedTags.split(",").map(t => t.trim()).filter(Boolean),
    };
    setArticles([...articles, newArticle]);
    setEditedTitle("");
    setEditedImageUrl("");
    setEditedTags("");
    setAddDialogOpen(false);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    // מניעת מחיקה אם זה המאמר היחיד
    if (articles.length === 1) {
      alert('❌ לא ניתן למחוק את המאמר היחיד. חייב להישאר לפחות מאמר אחד.');
      return;
    }

    if (window.confirm('האם אתה בטוח שברצונך למחוק מאמר זה?')) {
      setArticles(articles.filter((article) => article.id !== id));
    }
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('articles', JSON.stringify(articles));
    alert('✅ נשמר ל-LocalStorage!');
  };

  const handleOpenAddDialog = () => {
    setEditedTitle("");
    setEditedImageUrl("");
    setEditedTags("");
    setErrors({});
    setAddDialogOpen(true);
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
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
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
            />
            <Box>
              <Typography fontWeight={700}>{article.title}</Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {article.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" color="primary" />
                ))}
              </Box>
            </Box>
          </Box>

          <Box>
            <IconButton size="small" onClick={() => handleEditClick(article)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(article.id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <Button 
          variant="contained" 
          color="success"
          size="large"
          onClick={handleSaveToLocalStorage}
        >
          שמור ל-LocalStorage
        </Button>
      </Box>

      {/* Dialog עריכה */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת מאמר</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="כותרת המאמר *"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title || ' '}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="קישור לתמונה *"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || 'חייב להתחיל ב-http:// או https://'}
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
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="כותרת המאמר *"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            error={Boolean(errors.title)}
            helperText={errors.title || ' '}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="קישור לתמונה *"
            value={editedImageUrl}
            onChange={(e) => setEditedImageUrl(e.target.value)}
            error={Boolean(errors.imageUrl)}
            helperText={errors.imageUrl || 'חייב להתחיל ב-http:// או https://'}
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
    </Box>
  );
}