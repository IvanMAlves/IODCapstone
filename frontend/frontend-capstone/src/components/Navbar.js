import "../App.css"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



const Navbar = () => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.post("http://localhost:8000/users/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const Armies = async () => {
    try {
      navigate("/armies");
    } catch (error) {
      console.log(error);
    }
  };

  const Matches = async () => {
    try {
      await axios.post("http://localhost:8000/matches/getMatchByUserID/:idusers");
      navigate("/matches/:idusers");
    } catch (error) {
      console.log(error);
    }
  };

  const About = async () => {
    try {
      navigate("/about");
    } catch (error) {
      console.log(error);
    }
  };

  const Dashboard = async () => {
    try {
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button onClick={Dashboard} color="inherit">Dashboard</Button>
        <Button onClick={Armies} color="inherit">Armies</Button>
        <Button onClick={Matches} color="inherit">Macthes</Button>
        <Button onClick={About} color="inherit">About</Button>
        </Typography>
        <Button onClick={Logout} color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  </Box>
  );
};
export default Navbar;
