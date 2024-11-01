import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/TextField'
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material';

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
   
      </div>

    </>
  );
}

export default App;
