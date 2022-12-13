/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
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


const ArmyDetail = () => {

  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  const {state} = useLocation();

  

  useEffect(() => {
    const {id} = state;    
    if (id) {
        getUnitsByArmyId(id);
      }
    // wait until userData is defined to make the second call
    console.log(state);
  }, []);

  const updateSelectedUnit = (armyid) => {
    console.log("update unit");
    //navigate(`/armies/${armyid}`, { state: {id: armyid}});
  }

  const axiosJWT = axios.create();
  const token = localStorage.getItem("token");
  const getUnitsByArmyId = async (armyID) => {
    const response = await axiosJWT.get(
      `http://localhost:8000/units/getUnitsByArmyId/${armyID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUnits(response.data.data); //this is the data pulled from the backend and set for use in a table later
    console.log(response.data.data);
  };


  return (
    <div className="container mt-5">
           <h1>Unit Page </h1>       
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Unit Name</TableCell>
            <TableCell align="right">Experience</TableCell>
            <TableCell align="right">Honors</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units.map((unit, index) => (
            <TableRow
              key={unit.armyid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {unit.unitname}
              </TableCell>
              <TableCell align="right">{unit.unitexp}</TableCell>
              <TableCell align="right">{unit.honors}</TableCell>
              <TableCell align="right">{unit.UpdatedOn}</TableCell>
              <TableCell align="right"><Button onClick={() => updateSelectedUnit()} variant="outlined">Details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};
export default ArmyDetail;
