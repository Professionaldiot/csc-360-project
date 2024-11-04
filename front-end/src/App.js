import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, FormHelperText } from '@mui/material';
import FormControl, {useFormControl} from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';


function EmptyUser() {
  /*
  this function is using materialUI's value.filled
  from the FormControl import to check whether the
  input on the box it's in is filled, it will only
  work for the specific box it's in
  */
  const { filled } = useFormControl() ;

  const helperText = React.useMemo(() =>{
    if (filled) {
      return '';
    }
    return "Please enter a username.";
  },[filled]);

  return <FormHelperText>{helperText}</FormHelperText>;
}


function EmptyPassword() {
  /*
  same function as above, but done for the password
  */
  const { filled } = useFormControl() ;

  const helperText = React.useMemo(() =>{
    if (filled) {
      return '';
    }
    return "Please enter a password.";
  },[filled]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

// main function, runs the HTML stuff
function App() {
  return (
    <>
      {/*Header business here*/}
      <div className='headContainer'>
        <div className='selfService-Header'>
          <img
            //cornell logo
            src={"https://www.cornellcollege.edu/assets/production/images/cornell_logo_white.png"} 
            className="cornell-logo" 
            alt="logo" />
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
        <Box sx={{ justifyContent: 'space-around', alignItems: 'center', position: "absolute", top: '50px' }}>
          <Card sx={{ backgroundColor: '#00000025', height: '350px', width: '375px'}}>
            <CardContent>
              <Typography variant="h3" component="div" sx={{ textAlign: "center"}}>
                Login
              </Typography>
                {/*Username Text Field*/}
                <div className='textField'>
                  <FormControl>
                    <InputLabel htmlFor="filled-adornment-password">Username</InputLabel>
                      <FilledInput
                        id="login-username"
                      />
                    <EmptyUser />
                  </FormControl>
                    <br />
                  <FormControl>
                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                      <FilledInput
                        id="login-password"
                        type='password'
                      />
                    <EmptyPassword />
                  </FormControl>
                </div>
            </CardContent>
            <div className='textField'>
              <CardActions sx={{ alignItems: "center", justifyContent: "space-around"}}>
                <Button variant="outlined">Login</Button>
                <Button variant="outlined">Guest</Button>
              </CardActions>
            </div>
          </Card>
        </Box>
      </div>
    </>
  );
}

export default App;
