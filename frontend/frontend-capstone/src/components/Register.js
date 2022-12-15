import "../App.css"
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();


  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/users/registerUser", {
        useremail: email,
        password: password,
        username: name,
        confPassword: confPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" >
          Ivan Alves
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

  return (

    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={Register} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  </ThemeProvider>

    // <section className="hero has-background-grey-light is-fullheight is-fullwidth">
    //               
    //   <div className="hero-body">
    //                     
    //     <div className="container">
    //                           
    //       <div className="columns is-centered">
    //                                 
    //         <div className="column is-4-desktop">
    //                                       
    //           <form onSubmit={Register} className="box">
    //                                             
    //             <p className="has-text-centered">{msg}</p>
    //                                             
    //             <div className="field mt-5">
    //                                                   
    //               <label className="label">User Name</label>
    //                                                   
    //               <div className="controls">
    //                                                         
    //                 <input
    //                   type="text"
    //                   className="input"
    //                   placeholder="Name"
    //                   value={name}
    //                   onChange={(e) => setName(e.target.value)}
    //                 />
    //                                                     
    //               </div>
    //                                               
    //             </div>
    //                                             
    //             <div className="field mt-5">
    //                                                   
    //               <label className="label">Email</label>
    //                                                   
    //               <div className="controls">
    //                                                         
    //                 <input
    //                   type="text"
    //                   className="input"
    //                   placeholder="Email"
    //                   value={email}
    //                   onChange={(e) => setEmail(e.target.value)}
    //                 />
    //                                                     
    //               </div>
    //                                               
    //             </div>
    //                                             
    //             <div className="field mt-5">
    //                                                   
    //               <label className="label">Password</label>
    //                                                   
    //               <div className="controls">
    //                                                         
    //                 <input
    //                   type="password"
    //                   className="input"
    //                   placeholder="******"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                 />
    //                                                     
    //               </div>
    //                                               
    //             </div>
    //                                             
    //             <div className="field mt-5">
    //                                                   
    //               <label className="label">Confirm Password</label>
    //                                                   
    //               <div className="controls">
    //                                                         
    //                 <input
    //                   type="password"
    //                   className="input"
    //                   placeholder="******"
    //                   value={confPassword}
    //                   onChange={(e) => setConfPassword(e.target.value)}
    //                 />
    //                                                     
    //               </div>
    //                                               
    //             </div>
    //                                             
    //             <div className="field mt-5">
    //                                                   
    //               <button className="button is-success is-fullwidth">
    //                 Register
    //               </button>
    //                                               
    //             </div>
    //                                         
    //           </form>
    //                                   
    //         </div>
    //                             
    //       </div>
    //                       
    //     </div>
    //                 
    //   </div>
    //           
    // </section>
  );
};
export default Register;
