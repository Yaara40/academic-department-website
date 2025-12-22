import { useState } from "react";
import { Box, Typography, Switch, IconButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface FormField {
  id: string;
  label: string;
  icon: React.ReactNode;
  required: boolean;
  enabled: boolean;
}

export default function ContactForm() {
  const [fields, setFields] = useState<FormField[]>([
    {
      id: "name",
      label: "שם פרטי ומשפחה",
      icon: <PersonOutlineIcon />,
      required: true,
      enabled: true,
    },
    {
      id: "phone",
      label: "מספר טלפון",
      icon: <PhoneOutlinedIcon />,
      required: true,
      enabled: true,
    },
    {
      id: "email",
      label: "כתובת מייל",
      icon: <EmailOutlinedIcon />,
      required: false,
      enabled: false,
    },
    {
      id: "city",
      label: "עיר מגורים",
      icon: <LocationOnOutlinedIcon />,
      required: false,
      enabled: false,
    },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentField, setCurrentField] = useState<FormField | null>(null);
  const [editedLabel, setEditedLabel] = useState("");

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");

  const handleToggle = (id: string) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, enabled: !field.enabled } : field
      )
    );
  };

  const handleEditClick = (field: FormField) => {
    setCurrentField(field);
    setEditedLabel(field.label);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSaveEdit = () => {
    if (currentField) {
      setFields(
        fields.map((field) =>
          field.id === currentField.id ? { ...field, label: editedLabel } : field
        )
      );
    }
    setEditDialogOpen(false);
  };

  const handleAddField = () => {
    if (newFieldLabel.trim()) {
      const newField: FormField = {
        id: `field_${Date.now()}`,
        label: newFieldLabel,
        icon: <PersonOutlineIcon />,
        required: false,
        enabled: false,
      };
      setFields([...fields, newField]);
      setNewFieldLabel("");
      setAddDialogOpen(false);
    }
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
      <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
        הגדרות טופס השארת פרטים
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        הגדר את שדות הטופס והודעות אוטומטיות
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>
          הגדרת שדות טופס
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}
        >
          הוסף שדה
        </Button>
      </Box>

      {fields.map((field) => (
        <Box
          key={field.id}
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
            <Box sx={{ color: "#6b7280" }}>{field.icon}</Box>
            <Typography fontWeight={600}>{field.label}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton 
              size="small" 
              sx={{ color: "#10b981" }}
              onClick={() => handleEditClick(field)}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              sx={{ color: "#ef4444" }}
              onClick={() => handleDeleteClick(field.id)}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
            <Typography
              sx={{
                color: field.enabled ? "#10b981" : "#9ca3af",
                fontWeight: 600,
              }}
            >
              {field.enabled ? "שדה חובה" : "אופציונלי"}
            </Typography>
            <Switch
              checked={field.enabled}
              onChange={() => handleToggle(field.id)}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#10b981",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#10b981",
                },
              }}
            />
          </Box>
        </Box>
      ))}

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle sx={{ direction: "rtl" }}>עריכת שם שדה</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            autoFocus
            fullWidth
            label="שם השדה"
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            sx={{ mt: 2 }}
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
        <DialogTitle sx={{ direction: "rtl" }}>הוספת שדה חדש</DialogTitle>
        <DialogContent sx={{ direction: "rtl", minWidth: 400 }}>
          <TextField
            autoFocus
            fullWidth
            label="שם השדה החדש"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setAddDialogOpen(false)}>ביטול</Button>
          <Button onClick={handleAddField} variant="contained">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}