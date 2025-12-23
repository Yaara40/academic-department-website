import { useState } from "react";
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
      text: "הלימודים נתנו לי את הכלים והביטחון להצליח להלמל בעתיק הגלובלי",
      initial: "נ",
      color: "#10b981",
    },
    {
      id: "2",
      name: "דני לוי",
      company: "מייסד ב-CEO-TechCorp",
      text: "הידע שרכשתי כאן היו הבסיס להקמת החברה שלי",
      initial: "ד",
      color: "#10b981",
    },
    {
      id: "3",
      name: "מיכל שפירא",
      company: "חוקרת AI בטכניון וייצמן",
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

  const handleEditClick = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setEditedName(testimonial.name);
    setEditedCompany(testimonial.company);
    setEditedText(testimonial.text);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (currentTestimonial) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === currentTestimonial.id
            ? { ...t, name: editedName, company: editedCompany, text: editedText }
            : t
        )
      );
    }
    setEditDialogOpen(false);
  };

  const handleAddNew = () => {
    if (editedName && editedCompany && editedText) {
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
    }
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
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
          המלצות בוגרים
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setAddDialogOpen(true)}
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
            bgcolor: "#f9fafb",
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

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת המלצה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="שם"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תפקיד/חברה"
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="טקסט ההמלצה"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
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

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>הוספת המלצה חדשה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="שם"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תפקיד/חברה"
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="טקסט ההמלצה"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
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