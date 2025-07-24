import { useState } from "react";

import { Box, TextField, Autocomplete } from '@mui/material';

import './App.css';


let movies = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
]

const apiKey = "74585ba6";

function App() {
    const [moviesOptions, setMoviesOptions] = useState(movies);

    const onMovieSearch = (event) => {
        let movie = event.target.value;
        fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`)
            .then(r => r.json())
            .then(data => {
                console.log("The movie we got is: ", data.Title, data);
                setMoviesOptions([{ label: data.Title, year: data.year }]);
            });

        console.log("Movie Options: ", moviesOptions);
    }

    return (
        <div className="App">
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            >
                <Autocomplete
                    disablePortal
                    options={moviesOptions}
                    onInputChange={onMovieSearch}
                    renderInput={(params) => <TextField {...params} label="Movie Search" />}
                />
            </Box>
        </div>
    );
}

export default App;
