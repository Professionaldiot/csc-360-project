import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import { createTheme, FormHelperText } from '@mui/material';
import FormControl, {useFormControl} from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import fetchLogin from '../functions/fetchLogin';

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

export default function Login() {

  const [values, setValues] = React.useState({
    username: "",
    password: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };  

  const loginValidate = async (username, password) => {
    console.log(username + " " + password);
    try {
      const validation = await fetchLogin(username,password);
      return validation;
    } catch(error) {
      console.error("Error fetching login", error);
    }
  }


  const handleFormSubmit = (event) => {
    event.preventDefault();
    //console.log(values.username, " ", values.password);
    if (loginValidate(values.username,values.password)===true) {
      console.log('yes')
    }
    else {
      console.log("no");
    }
  };

    return (
      <>
        <div id='login'>
          {/*All login stuff in this <div>*/}
          <div className='loginBack'>
            <Box 
            component="form"
            onSubmit={handleFormSubmit}
            sx={{ justifyContent: 'space-around', alignItems: 'center', position: "absolute", top: '50px' }}>
              <Card sx={{ backgroundColor: '#00000025', height: '375px', width: '375px'}}>
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
                            value={values.username}
                            onChange={handleChange("username")}
                            required
                          />
                        <EmptyUser />
                      </FormControl>
                        <br />
                      <FormControl>
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                          <FilledInput
                            id="login-password"
                            type='password'
                            value={values.password}
                            onChange={handleChange("password")}
                            required
                          />
                        <EmptyPassword />
                      </FormControl>
                      <loginHelpText />
                    </div>
                </CardContent>
                <div className='textField'>
                  <CardActions sx={{ alignItems: "center", justifyContent: "space-around", position: "fixed"}}>
                    <Button type="submit" variant="contained">
                        Sign in
                    </Button>
                    <Button variant="outlined">Guest</Button>
                  </CardActions>
                </div>
              </Card>
            </Box>
          </div>
        </div>
      </>
    );
  }