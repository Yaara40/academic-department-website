import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface HeaderValues {
  pageTitle: string;
  pageDescription: string;
}

const LS_KEY = 'growthOptionsHeader_v1';

function loadHeader(): HeaderValues {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) {
    return { pageTitle: 'כותרת הדף', pageDescription: 'אפשרויות צמיחה וקריירה' };
  }
  try {
    return JSON.parse(raw) as HeaderValues;
  } catch {
    return { pageTitle: 'כותרת הדף', pageDescription: 'אפשרויות צמיחה וקריירה' };
  }
}

export default function GrowthOptionsForm() {
  const [values, setValues] = useState<HeaderValues>(loadHeader());
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const validate = () => {
    const e: { [key: string]: boolean } = {};
    e.pageTitle = values.pageTitle.trim().length === 0;
    e.pageDescription = values.pageDescription.trim().length === 0;
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };

  const handleSave = () => {
    if (!validate()) return;
    localStorage.setItem(LS_KEY, JSON.stringify(values));
  };

  return (
    <Box
      sx={{
        border: '1px solid #eee',
        borderRadius: 3,
        p: 3,
        display: 'grid',
        gap: 2,
      }}
    >
      <Typography fontWeight={900} sx={{ textAlign: 'right' }}>
        כותרת ותיאור ראשי
      </Typography>

      <Box sx={{ display: 'grid', gap: 2 }}>
        <TextField
          label="כותרת הדף"
          value={values.pageTitle}
          onChange={(e) => setValues({ ...values, pageTitle: e.target.value })}
          error={Boolean(errors.pageTitle)}
          helperText={errors.pageTitle ? 'חובה להזין כותרת' : ' '}
          fullWidth
        />

        <TextField
          label="תיאור הדף"
          value={values.pageDescription}
          onChange={(e) => setValues({ ...values, pageDescription: e.target.value })}
          error={Boolean(errors.pageDescription)}
          helperText={errors.pageDescription ? 'חובה להזין תיאור' : ' '}
          multiline
          minRows={3}
          fullWidth
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleSave}>
            שמור
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
