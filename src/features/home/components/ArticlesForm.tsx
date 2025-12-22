import { useState } from "react";
import { Box, Typography, Button, IconButton, Chip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import type { Article } from "../../../models/Home";

export default function ArticlesForm() {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "מדריך קריירה בהייטק 2025",
      imageUrl: "https://via.placeholder.com/100",
      tags: ["קריירה"],
    },
    {
      id: "2",
      title: "מהפכת הבינה המלאכותית",
      imageUrl: "https://via.placeholder.com/100",
      tags: ["AI", "חדש"],
    },
    {
      id: "3",
      title: "להקים סטארטאפ - המדריך השלם",
      imageUrl: "https://via.placeholder.com/100",
      tags: ["יזמות"],
    },
  ]);

  const handleDelete = (id: string) => {
    setArticles(articles.filter((article) => article.id !== id));
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
        <Button variant="contained" startIcon={<AddIcon />} sx={{ '& .MuiButton-startIcon': { marginLeft: '6px' } }}>
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
            <IconButton size="small">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(article.id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
}