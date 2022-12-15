/* eslint-disable react-hooks/exhaustive-deps */
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


const UnitDetails = () => {

  const [singleunit, setSingleUnit] = useState([]);
  const navigate = useNavigate();
  const {state} = useLocation();
  const [armies, setArmies] = useState([]);
  const [goBackArmyId, setGoBackArmyId] = useState(0);

  useEffect(() => {
    const {id,armyId} = state;    
    if (id) {
      getSingleUnitbyID(id);
      setGoBackArmyId(armyId);
      }
  }, []);

  const updateSelectedUnit = () => {
    console.log("update unit");
    //navigate(`/unit/${armyid}`, { state: {id: armyid}});
  }

  const deleteSelectedUnit = () => {
    console.log("delete unit");
    //navigate(`/unit/${armyid}`, { state: {id: armyid}});
  }

  const goBack = () =>{
    navigate(`/armies/${goBackArmyId}`,{ state: {id: goBackArmyId}});
  }

  const axiosJWT = axios.create();
  const token = localStorage.getItem("token");
  const getSingleUnitbyID = async (unitID) => {
    const response = await axiosJWT.get(
      `http://localhost:8000/units/getSingleUnitbyId/${unitID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setSingleUnit(response.data.data); //this is the data pulled from the backend and set for use in a table later
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
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singleunit.map((unit, index) => (
            <TableRow
              key={unit.unitid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {unit.unitname}
              </TableCell>
              <TableCell align="right">{unit.unitexp}</TableCell>
              <TableCell align="right">{unit.honors}</TableCell>
              <TableCell align="right">{unit.UpdatedOn}</TableCell>
              <TableCell align="right"><Button onClick={() => updateSelectedUnit(unit.unitid)} variant="outlined">Update</Button></TableCell>
              <TableCell align="right"><Button onClick={() => deleteSelectedUnit(unit.unitid)} variant="outlined">Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <Button onClick ={()=>goBack()} variant ="outlined">BACK</Button>
    </div>
  );
};
export default UnitDetails;
