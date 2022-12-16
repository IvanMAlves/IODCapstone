import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//for the add button
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";




const ArmyDetail = () => {
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [armyId, setArmyID] = useState(0);
  const [unitName, setUnitName] = useState(""); //this is used for passing the value of the unit name to the add unit function
  const [selectedUnitID, setSelectedUnitID] = useState(""); //this is used for passing the value of the unitid to the updateunit function
  const [honors, setHonors] = useState(""); //this is used for passing from the user input into the honors for the updateunit function
  const [unitexp, setUnitExp] = useState(); //this is used for passing from the user input into the unitexp for the updateunit function


  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const axiosJWT = axios.create(); //handling JWT
  const token = localStorage.getItem("token"); //assigning the token to a variable


  const handleNumberOnly = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value == "" || regex.test(e.target.value)) {
      setUnitExp(e.target.value);
    }
  };

  const goBack = () => {
    navigate(`/armies`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (unit) => {
    setSelectedUnitID(unit.unitid);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  useEffect(() => {
    const { id } = state;
    if (id) {
      getUnitsByArmyId(id);
      setArmyID(id);
    }
  }, []);

  //method to add a unit
  const addingUnit = async () => {
    let data = { unitname: unitName }; //this is capturing the unit name and storing to a variable
    const response = await axiosJWT.post(
      `http://localhost:8000/units/createUnit/${armyId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpen(false); //closes the box
    getUnitsByArmyId(armyId); //refreshes the table
  };

  //method to update the unit
  const updateSelectedUnit = async () => {
    let data = {unitexp : unitexp, honors: honors };
    const response = await axiosJWT.put(
      `http://localhost:8000/units/updateUnitbyID/${selectedUnitID}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpenUpdate(false); //closes the box
    getUnitsByArmyId(armyId); //refresh
  };

  //method to delete a unit
  const deleteUnitByID = async (unitid) => {
    const response = await axiosJWT.delete(
      `http://localhost:8000/units/removeUnitFromArmyByUnitID/${unitid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getUnitsByArmyId(armyId);
  };

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
  };


  return (
    <div className="container mt-5">
           <h1>Unit Page for Army ID: {armyId}</h1>       
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
                key={unit.unitid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {unit.unitname}
                </TableCell>
                <TableCell align="right">{unit.unitexp}</TableCell>
                <TableCell align="right">{unit.honors}</TableCell>
                <TableCell align="right">{unit.UpdatedOn}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => handleUpdateOpen(unit)}>
                    Update
                  </Button>
                  <Button
                    onClick={() => deleteUnitByID(unit.unitid)}
                    color="error"
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Update Unit</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Honors, Battle Scars, Equipment and any other information</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Honors"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setHonors(e.target.value)}
          />
            <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            autoFocus
            margin="dense"
            id="unitexp"
            label="Unit Experience"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={selectedUnitID.unitexp}
            onChange={(e) => handleNumberOnly(e)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={updateSelectedUnit}>Update</Button>
          <Button onClick={handleUpdateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Unit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Unit</DialogTitle>
        <DialogContent>
          <DialogContentText>Instructions to be added later</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="unitname"
            label="Unit Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setUnitName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addingUnit}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <br></br>
      <Button onClick={() => goBack()} variant="outlined">
        BACK
      </Button>
    </div>
  );
};
export default ArmyDetail;
