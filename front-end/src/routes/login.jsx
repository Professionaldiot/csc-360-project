import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import FormHelperText  from '@mui/material/FormHelperText';
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

  /*
  better to have a default value for this
  rather than an empty string, so we set
  it to "student" just in case.
  */
  let userLevel = "student"; 

  const [values, setValues] = React.useState({
    /*
    this function lets the program update 
    what the user puts in the username &
    password boxs
    */
    username: "",
    password: ""
  });

  const handleChange = (prop) => (event) => {
    /* 
    this function changes the above const
    values, it does this mostly through MUI,
    we just have to call it
    */
    setValues({ ...values, [prop]: event.target.value });
  };  

  const handleFormSubmit = async (event) => {
    /*
    this function will stop you from not putting
    anything in the boxes first, then if they both
    have something in it (it's both because of a
    required tag in the JSX), then it stores the 
    result of fetchLogin() (which is a list) to
    access later, it then checks the first item
    of that list, which is the boolean stating 
    whether the login info is correct
    */
    event.preventDefault();
    const willLogin = await fetchLogin(values.username, values.password);
    console.log(values.username, " ", values.password);
    if (willLogin[0]) {
      userLevel=willLogin[1];
      console.log(userLevel);
      console.log("yes");
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