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
        <div vertical-align="center">
        <p align = "center"> This is a project for the capstone of the Software Development Course for Institute of Data created and developed by Ivan Alves 2022. </p>
        <p align = "center">
        Tabletop Bookkeeping is an application designed for tabletop wargamming and roleplaying players to have a single place to store and manage 
        their tabletop bookkeeping records. Many tabletop games come with a paper and pen component to the game. 
        Most of these games are multiplayer and require multiple people to have access to the same information and other information to be kept with only the player. 
        This application aims to take away the pen and paper and create a digital replacement where users can manage their own informaiton and for future builds to shape how 
        they want the informaiton stored.
         </p>
         <div>
          <h2 align = "center">FAQ</h2>
         </div>
         <p align = "center">
          <h3>
            <b>Q: Can I recover armies or units if I delete them?</b><br/>
            <b>A: No, unfortunately there is no way to recover any armies or units you delete.</b><br/>
            <b>Q: Where can I contact you if I have furthure questions?</b><br/>
            <b>A: please feel free to email me on the following <a href="mailto:alves.ivan87@gmail.com">alves.ivan87@gmail.com</a>.</b><br/>
          </h3>
         </p>
        </div>
    </div>
  );
};
export default About;
