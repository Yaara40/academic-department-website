import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { Contact } from "../../models/Contact";

interface ContactWithInitial extends Contact {
  initial: string;
}

const AVATAR_SIZE = 40;

export default function ContactList() {
  const contacts: ContactWithInitial[] = [
    {
      id: "1",
      name: "יוסי כהן",
      email: "yossi@email.com",
      phone: "050-1234567",
      submissionDate: "25/11/2025",
      status: "חדש",
      source: "אתר",
      initial: "י",
    },
    {
      id: "2",
      name: "שרה לוי",
      email: "sara@email.com",
      phone: "052-9876543",
      submissionDate: "25/11/2025",
      status: "ממתין",
      source: "יום פתוח",
      initial: "ש",
    },
    {
      id: "3",
      name: "דוד ישראלי",
      email: "david@email.com",
      phone: "054-5555555",
      submissionDate: "25/11/2025",
      status: "נוצר קשר",
      source: "אתר",
      initial: "ד",
    },
    {
      id: "4",
      name: "מיכל אברהם",
      email: "michal@email.com",
      phone: "053-1111111",
      submissionDate: "25/11/2025",
      status: "חדש",
      source: "פייסבוק",
      initial: "מ",
    },
  ];

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "חדש":
        return "info";
      case "ממתין":
        return "warning";
      case "נוצר קשר":
        return "success";
      case "נסגר":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ bgcolor: "cardGreen.main" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Avatar sx={{ bgcolor: "action.hover" }}>
                <PeopleOutlineIcon color="action" />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight={800}>
              4
            </Typography>
            <Typography color="text.secondary">סה"כ פניות</Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "cardGreen.main" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Avatar sx={{ bgcolor: "action.hover" }}>
                <AccessTimeIcon color="action" />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight={800}>
              2
            </Typography>
            <Typography color="text.secondary">פניות חדשות</Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "cardGreen.main" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Avatar sx={{ bgcolor: "action.hover" }}>
                <PeopleOutlineIcon color="action" />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight={800}>
              1
            </Typography>
            <Typography color="text.secondary">ממתינים</Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "cardGreen.main" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Avatar sx={{ bgcolor: "action.hover" }}>
                <PeopleOutlineIcon color="action" />
              </Avatar>
            </Box>
            <Typography variant="h4" fontWeight={800}>
              0
            </Typography>
            <Typography color="text.secondary">נרשמו</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 2,
          bgcolor: "background.paper",
          mb: 4,
        }}
      >
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  שם מלא
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800 }}>
                  פרטי קשר
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  תאריך פנייה
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  מקור
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 800 }}>
                  סטטוס
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id} hover>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: AVATAR_SIZE,
                          height: AVATAR_SIZE,
                        }}
                      >
                        {contact.initial}
                      </Avatar>
                      <Typography fontWeight={700}>{contact.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box>
                      <Typography variant="body2">
                        {contact.phone} 📞
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contact.email} ✉️
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {contact.submissionDate} 📅
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{contact.source}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={contact.status}
                      size="small"
                      color={getStatusColor(contact.status)}
                      sx={{ fontWeight: 700 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
