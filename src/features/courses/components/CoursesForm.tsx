import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Course } from '../models/Course';

interface FormValues {
    name: string;
    description: string;
    credits: number;
    year: string;
    semester: string;
    syllabus: string;
    type: string;
}

interface FormErrors {
    [key: string]: boolean;
}

export default function CoursesForm() {
    const navigate = useNavigate();
    
    const initialValues: FormValues = {
        name: "",
        description: "",
        credits: 3,
        year: "",
        semester: "",
        syllabus: "",
        type: "חובה"
    };
    
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        const target = event.target as HTMLInputElement;
        setErrors({ ...errors, [name]: !target.validity.valid });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const newCourse = new Course(
            Date.now().toString(),
            values.name,
            values.credits,
            values.semester
        );
        
        const storedCourses = localStorage.getItem("courses");
        const existingCourses = storedCourses ? JSON.parse(storedCourses) : [];
        const updatedCourses = [...existingCourses, newCourse];
        
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
        console.log("Course saved!", newCourse);
        
        navigate("/courses");
    };

    const handleCancel = () => {
        navigate("/courses");
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                m: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 800,
                direction: 'rtl',
                backgroundColor: '#fff',
                padding: 4,
                borderRadius: 2,
                boxShadow: 2
            }}
            noValidate
            autoComplete="off"
        >
            <h2>הוספת קורס חדש</h2>
            
            <TextField
                required
                error={errors.name}
                fullWidth
                id="name"
                name="name"
                label="שם הקורס"
                placeholder="הזן שם קורס..."
                value={values.name}
                onChange={handleChange}
                helperText={errors.name ? "שדה חובה" : ""}
            />
            
            <TextField
                fullWidth
                id="description"
                name="description"
                label="תיאור"
                placeholder="תיאור קצר של הקורס..."
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    required
                    error={errors.credits}
                    id="credits"
                    name="credits"
                    label="נקודות זכות"
                    type="number"
                    value={values.credits}
                    onChange={handleChange}
                    helperText={errors.credits ? "נקודות זכות חייבות להיות בין 1-10" : ""}
                    slotProps={{
                        htmlInput: { min: 1, max: 10 }
                    }}
                    sx={{ flex: 1 }}
                />
                
                <TextField
                    required
                    error={errors.year}
                    select
                    id="year"
                    name="year"
                    label="שנה"
                    value={values.year}
                    onChange={handleChange}
                    sx={{ flex: 1 }}
                >
                    <MenuItem value="שנה א">שנה א</MenuItem>
                    <MenuItem value="שנה ב">שנה ב</MenuItem>
                    <MenuItem value="שנה ג">שנה ג</MenuItem>
                </TextField>
                
                <TextField
                    required
                    error={errors.semester}
                    select
                    id="semester"
                    name="semester"
                    label="סמסטר"
                    value={values.semester}
                    onChange={handleChange}
                    sx={{ flex: 1 }}
                >
                    <MenuItem value="א">סמסטר א</MenuItem>
                    <MenuItem value="ב">סמסטר ב</MenuItem>
                    <MenuItem value="קיץ">סמסטר קיץ</MenuItem>
                </TextField>
            </Box>
            
            <TextField
                fullWidth
                id="syllabus"
                name="syllabus"
                label="קישור לסילבוס"
                placeholder="https://..."
                type="url"
                value={values.syllabus}
                onChange={handleChange}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant={values.type === "חובה" ? "contained" : "outlined"}
                    onClick={() => setValues({ ...values, type: "חובה" })}
                    sx={{ flex: 1 }}
                >
                    קורס חובה
                </Button>
                <Button
                    variant={values.type === "פעיל" ? "contained" : "outlined"}
                    onClick={() => setValues({ ...values, type: "פעיל" })}
                    sx={{ flex: 1 }}
                >
                    פעיל
                </Button>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', mt: 2 }}>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    size="large"
                >
                    שמור
                </Button>
                <Button 
                    variant="outlined"
                    onClick={handleCancel}
                    size="large"
                >
                    ביטול
                </Button>
            </Box>
        </Box>
    );
}