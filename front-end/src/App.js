import './App.css';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';

// main function, runs the HTML stuff
function App() {
  return (
    <>
      {/*Header business here*/}
      <div className='headContainer'>
        <div className='selfService-Header'>
          <img src={"https://www.cornellcollege.edu/assets/production/images/cornell_logo_white.png"} className="cornell-logo" alt="logo" />
        </div>
        <div className='subHeader'>
          <p>Courses</p>
        </div>
        <div className='selfService-Header'>
          <p>Login</p>
        </div>
      </div>

      {/*All login stuff in this <div>*/}
      <div className='loginBack'>
        <Box sx={{justifyContent: 'space-around', alignItems: 'center', position: "absolute", top: '50px'}}>
          <Card sx={{ backgroundColor: '#00000025', height: '310px' }}>
            <CardContent>
              <Typography variant="h2" component="div" sx={{ textAlign: "center"}}>
                Login
              </Typography>
              <TextField
                id="filled-required"
                label="Username"
                variant="filled"
              />
              <br/>
              <br/>
              <TextField
                id="filled-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
              />
            </CardContent>
            <CardActions sx={{ alignItems: "center", justifyContent: "space-around"}}>
              <Button variant="outlined">Login</Button>
              <Button variant="outlined">Guest</Button>
            </CardActions>

            {/*Username Text Field*/}


          </Card>
        </Box>
      </div>
    </>
  );
}

export default App;
