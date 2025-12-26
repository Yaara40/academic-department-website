import { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Requirement } from "../../../models/Home";

export default function RequirementsForm() {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      title: "שנות לימוד",
      subtitle: "3-4 שנים",
      value: "3-4",
      color: "#dbeafe",
    },
    {
      id: "2",
      title: "פרויקטים מעשיים",
      subtitle: "לפחות שני פרויקטים גדולים",
      value: "+2",
      color: "#d1fae5",
    },
    {
      id: "3",
      title: "רמת אנגלית",
      subtitle: "ציון מינימלי באמי״ר",
      value: "+85",
      color: "#e9d5ff",
    },
    {
      id: "4",
      title: "נקודות זכות כוללות",
      subtitle: "מינימום נקודות זכות לתואר",
      value: "120",
      color: "#fed7aa",
    },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentReq, setCurrentReq] = useState<Requirement | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedSubtitle, setEditedSubtitle] = useState("");
  const [editedValue, setEditedValue] = useState("");

  const colors = ["#dbeafe", "#d1fae5", "#e9d5ff", "#fed7aa", "#fef3c7"];

  // טעינה מ-LocalStorage
  useEffect(() => {
    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem('requirements');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setRequirements(parsed);
        } catch (error) {
          console.error('Error loading from localStorage:', error);
        }
      }
    };
    
    loadFromLocalStorage();
  }, []);

  const handleEditClick = (req: Requirement) => {
    setCurrentReq(req);
    setEditedTitle(req.title);
    setEditedSubtitle(req.subtitle);
    setEditedValue(req.value);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (currentReq) {
      setRequirements(
        requirements.map((req) =>
          req.id === currentReq.id
            ? { ...req, title: editedTitle, subtitle: editedSubtitle, value: editedValue }
            : req
        )
      );
    }
    setEditDialogOpen(false);
  };

  const handleAddNew = () => {
    if (editedTitle && editedSubtitle && editedValue) {
      const newReq: Requirement = {
        id: Date.now().toString(),
        title: editedTitle,
        subtitle: editedSubtitle,
        value: editedValue,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setRequirements([...requirements, newReq]);
      setEditedTitle("");
      setEditedSubtitle("");
      setEditedValue("");
      setAddDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    setRequirements(requirements.filter((req) => req.id !== id));
  };

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('requirements', JSON.stringify(requirements));
    alert('✅ נשמר ל-LocalStorage!');
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
          דרישות התואר
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setAddDialogOpen(true)}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          הוסף דרישה
        </Button>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 2 }}>
        {requirements.map((req) => (
          <Card key={req.id} sx={{ bgcolor: req.color }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h4" fontWeight={800}>
                  {req.value}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => handleEditClick(req)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(req.id)}>
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

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת דרישה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="כותרת"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תת כותרת"
            value={editedSubtitle}
            onChange={(e) => setEditedSubtitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="ערך"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
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
        <DialogTitle sx={{ direction: "rtl" }}>הוספת דרישה חדשה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            fullWidth
            label="כותרת"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="תת כותרת"
            value={editedSubtitle}
            onChange={(e) => setEditedSubtitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="ערך"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
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