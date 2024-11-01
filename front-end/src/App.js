import './App.css';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';
import Button from '@mui/material/Button';

function App() {
  return (
    <>
      <div className='headContainer'>
        <div className='selfService-Header'>
          <p>Cornell</p>
        </div>
        <div className='subHeader'>
          <p>Courses</p>
          </div>
        <div className='selfService-Header'>
          <p>Login</p>
        </div>
      </div>

      <div className='loginBox'>
        <h1>Login</h1>
        <TextField
          required
          id="filled-required"
          label="Username"
          variant="filled"
        />             
        <br/>
        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <br/>
        <Button variant="outlined">Login</Button>
      </div>

    </>
  );
}

export default App;
