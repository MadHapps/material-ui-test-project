import "./App.css";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Slider,
  Stack,
  TextField,
  ThemeProvider,
  ToggleButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { Undo, LightMode, DarkMode } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { debounce } from "lodash";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sliderVal, setSliderVal] = useState<number>(100);
  const [textFieldVal, setTextFieldVal] = useState("");
  const sliderRef = useRef<HTMLDivElement>(null);
  const theme = darkMode ? darkTheme : lightTheme;

  // Debounced changeTheme function
  const debouncedChangeTheme = useCallback(
    debounce(() => {
      setDarkMode((prev) => !prev);
    }, 150),
    []
  );

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderVal(Array.isArray(newValue) ? newValue[0] : newValue);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleWheel = useCallback((event: WheelEvent) => {
    if (sliderRef.current) {
      const delta = event.deltaY > 0 ? 1 : -1;
      setSliderVal((prev) => {
        const newValue = Math.min(100, Math.max(25, prev + delta));
        return newValue;
      });
      event.preventDefault(); // Prevent default scrolling behavior
    }
  }, []);

  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (sliderElement) {
      sliderElement.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        if (sliderElement) {
          sliderElement.removeEventListener("wheel", handleWheel);
        }
      };
    }
  }, [handleWheel]);

  return (
    <TransitionGroup>
      {/* Dark/Light Mode Transition */}
      <CSSTransition
        key={darkMode ? "dark" : "light"}
        classNames="fade"
        timeout={300} // Match the duration of your CSS transition
      >
        {/* Material UI Theme */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              p: "2em",
              height: "100vh",
            }}
          >
            {/* Content */}
            <Stack
              spacing={2}
              alignItems="start"
              sx={{
                height: "100%",
                width: "fit-content",
                marginInline: "auto",
              }}
            >
              <ToggleButton
                value="check"
                selected={darkMode}
                onChange={debouncedChangeTheme}
                sx={{
                  width: "fit-content",
                }}
              >
                {darkMode ? <DarkMode /> : <LightMode />}
              </ToggleButton>
              <Tooltip
                arrow
                placement="bottom-end"
                title="This h1 is actually an h4 in disguise!"
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 300 }}
              >
                <Typography variant="h4" component="h1">
                  //Material UI Test Grounds
                </Typography>
              </Tooltip>
              <Button
                variant="contained"
                endIcon={<Undo />}
                sx={{
                  width: "fit-content",
                }}
                onClick={() => {
                  setSliderVal(100);
                  setDarkMode(false);
                  setTextFieldVal("");
                }}
              >
                Reset All Values
              </Button>
              <h2 style={{ marginBottom: "0" }}>{sliderVal}%</h2>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingInline: "1em",
                  width: "100%",
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: ".33em",
                }}
              >
                <Slider
                  ref={sliderRef}
                  min={25}
                  defaultValue={sliderVal}
                  value={sliderVal}
                  onChange={handleSliderChange}
                  sx={{
                    width: "100%",
                    "& .MuiSlider-thumb": {
                      borderRadius: "15%",
                    },
                  }}
                />
              </Box>
              <TextField
                multiline
                label="Write something..."
                value={textFieldVal}
                onChange={(e) => setTextFieldVal(e.target.value)}
                sx={{
                  width: `${sliderVal}%`,
                }}
              />
              <Paper
                elevation={6}
                sx={{
                  p: "1em",
                  width: `${sliderVal}%`,
                }}
              >
                <Typography variant="body1">
                  {textFieldVal
                    ? textFieldVal
                    : `<-- Text will appear here -->`}
                </Typography>
              </Paper>
              <Typography variant="h5" component="h2">Grid:</Typography>
              <Grid container spacing={2}>
                <Grid item xs={3} md={6}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
                <Grid item xs={6} md={5}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
                <Grid item xs={6} md={7}>
                  <Paper elevation={3} sx={{
                    textAlign: "center"
                  }}>cell</Paper>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </ThemeProvider>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
