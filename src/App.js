import { useState } from "react";

import { Typography, Box, Button, Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import './App.css';


function App() {
    const [progress, setProgress] = useState(0);

    const handleIncreaseProgress = (e) => {
        setProgress(previousProgress => previousProgress + 1);
    }

    return (
        <div className="App">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Button onClick={handleIncreaseProgress} variant="contained">Contained</Button>
                </Grid>
                <Grid item xs={3} sx={{ minWidth: "50vw" }}>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgressWithLabel value={progress} />
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}


export default App;

