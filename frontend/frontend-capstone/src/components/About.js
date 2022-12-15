import "../App.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";


const About = () => {


  const navigate = useNavigate();
  const {state} = useLocation();

  const [goBackArmyId, setGoBackArmyId] = useState(0);




  const goBack = () =>{
    navigate(`/armies/${goBackArmyId}`,{ state: {id: goBackArmyId}});
  }




  return (
    <div>
        <h1 align = "center">About</h1>
        <p align = "center"> This is a project for the capstone of the Software Development Course for Institute of Data. </p>
    </div>
  );
};
export default About;
