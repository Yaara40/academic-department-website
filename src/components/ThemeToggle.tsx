import { useColorScheme } from '@mui/material/styles';
import { FormControl, Select, MenuItem, Box } from '@mui/material'; // Typography הוסר מכאן
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        bgcolor: 'background.paper',
        borderRadius: '50px',
        boxShadow: 2,
        px: 2,
        py: 0.5,
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <FormControl variant="standard" size="small">
        <Select
          value={mode}
          onChange={(event) =>
            setMode(event.target.value as "system" | "light" | "dark")
          }
          disableUnderline
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 }
          }}
        >
          <MenuItem value="system">
            <SettingsBrightnessIcon fontSize="small" sx={{ mr: 1 }} />
            מערכת
          </MenuItem>
          <MenuItem value="light">
            <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
            בהיר
          </MenuItem>
          <MenuItem value="dark">
            <DarkModeIcon fontSize="small" sx={{ mr: 1 }} />
            כהה
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}