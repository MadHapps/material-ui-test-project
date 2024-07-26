import { createTheme } from '@mui/material/styles';

// Light theme configuration
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
    background: {
      default: '#f5f5f5', // Light background
      paper: '#ffffff',   // Paper background
    },
    text: {
      primary: '#282828', // Text color for light mode
    },
  },
  // You can customize other aspects of the theme here
});

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ef9ef9', // Customize primary color
    },
    secondary: {
      main: '#f48fb1', // Customize secondary color
    },
    background: {
      default: '#121212',  // Paper background
    },
    text: {
      primary: '#ffffff', // Text color for dark mode
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: '#181818', // Set the background color for the TextField
          },
        },
      },
    },
  },
  // You can customize other aspects of the theme here
});

export { lightTheme, darkTheme };
