import './App.css';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import Button from '@mui/material/Button';

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
        <div className='loginBox'>
          <h1>Login</h1>

          {/*Username Text Field*/}
          <div className='textField'>
            <TextField  
              required
              id="filled-required"
              label="Username"
              variant="filled"
            />   
          </div>
          <br/>

          {/*Password Text Field*/}        
          <div className='textField'>
            <TextField
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
          </div>
          <br/>

          {/*Login/Guest Buttons*/}  
          <div className='textField'>
            <Button variant="outlined">Login</Button>
            <Button variant="outlined">Guest</Button>
          </div>      

        </div>
      </div>
    </>
  );
}

export default App;
