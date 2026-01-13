import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Avatar, Chip, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Testimonial } from "../../../models/Home";

export default function TestimonialsForm() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "נועה כהן",
      company: "מפתחת בכירה ב-Google",
      text: "הלימודים נתנו לי את הכלים והביטחון להצליח בעולם הגלובלי",
      initial: "נ",
      color: "#10b981",
    },
    {
      id: "2",
      name: "דני לוי",
      company: "מייסד ו-CEO ב-TechCorp",
      text: "הידע שרכשתי כאן היה הבסיס להקמת החברה שלי",
      initial: "ד",
      color: "#10b981",
    },
    {
      id: "3",
      name: "מיכל שפירא",
      company: "חוקרת AI בטכניון ווייצמן",
      text: "המחלקה אפשרה לי להתמקצע במחקר ברמה הגבוהה ביותר",
      initial: "מ",
      color: "#10b981",
    },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedCompany, setEditedCompany] = useState("");
  const [editedText, setEditedText] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  // טעינה מ-LocalStorage
  useEffect(() => {
    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem('testimonials');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setTestimonials(parsed);
        } catch (error) {
          console.error('Error loading from localStorage:', error);
        }
      }
    };
    
    loadFromLocalStorage();
  }, []);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    // 1. שם הבוגר/ת - חובה, טקסט
    if (!editedName.trim()) {
      newErrors.name = 'שם הבוגר/ת הוא שדה חובה';
    }

    // 2. תפקיד וחברה - חובה, טקסט
    if (!editedCompany.trim()) {
      newErrors.company = 'תפקיד וחברה הם שדה חובה';
    }

    // 3. תוכן ההמלצה - חובה, טקסט
    if (!editedText.trim()) {
      newErrors.text = 'תוכן ההמלצה הוא שדה חובה';
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

  const handleSaveEdit = () => {
    if (!validateFields()) {
      return;
    }

    if (currentTestimonial) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === currentTestimonial.id
            ? { ...t, name: editedName, company: editedCompany, text: editedText, initial: editedName.charAt(0) }
            : t
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

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: editedName,
      company: editedCompany,
      text: editedText,
      initial: editedName.charAt(0),
      color: "#10b981",
    };
    setTestimonials([...testimonials, newTestimonial]);
    setEditedName("");
    setEditedCompany("");
    setEditedText("");
    setAddDialogOpen(false);
    setErrors({});
  };

  const handleDelete = (id: string) => {
    // מניעת מחיקה אם זו ההמלצה היחידה
    if (testimonials.length === 1) {
      alert('❌ לא ניתן למחוק את ההמלצה היחידה. חייבת להישאר לפחות המלצה אחת.');
      return;
    }

    if (window.confirm('האם אתה בטוח שברצונך למחוק המלצה זו?')) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    alert('✅ נשמר ל-LocalStorage!');
  };

  const handleOpenAddDialog = () => {
    setEditedName("");
    setEditedCompany("");
    setEditedText("");
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
        bgcolor: "background.paper",
        direction: "rtl",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight={800}>
          המלצות בוגרים
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAddDialog}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
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
            bgcolor: "cardGray",
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
            <IconButton size="small" onClick={() => handleEditClick(testimonial)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(testimonial.id)}>
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
        <DialogTitle sx={{ direction: "rtl" }}>עריכת המלצה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="שם *"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name || ' '}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תפקיד/חברה *"
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
            error={Boolean(errors.company)}
            helperText={errors.company || ' '}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="טקסט ההמלצה *"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            error={Boolean(errors.text)}
            helperText={errors.text || ' '}
            multiline
            rows={3}
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
        <DialogTitle sx={{ direction: "rtl" }}>הוספת המלצה חדשה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="שם *"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name || ' '}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תפקיד/חברה *"
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
            error={Boolean(errors.company)}
            helperText={errors.company || ' '}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="טקסט ההמלצה *"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            error={Boolean(errors.text)}
            helperText={errors.text || ' '}
            multiline
            rows={3}
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