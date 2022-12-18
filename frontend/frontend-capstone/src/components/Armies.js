import "../App.css"
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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const Armies = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userId, setuserID] = useState("");
  const [users, setUsers] = useState({});
  const [armies, setArmies] = useState([]);
  const navigate = useNavigate();

  const [newRequisitionAmount, setNewRequisitionAmount] = useState("");
  const [armyToBeUpdated, setArmyToBeUpdated] = useState({});
  const [armyToBeDeleted, setArmyToBeDeleted] = useState({});
  const [newarmyname, setNewArmyName] = useState("");

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (army) => {
    setNewRequisitionAmount(army.requisition);//this sets the initial value of the requisition so we can update it later
    setArmyToBeUpdated(army); //initialises the armies so they can be updated later on
    setOpenUpdate(true); //opens the update box
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleDeleteOpen = (army) => {
    setArmyToBeDeleted(army);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  //this method below is to work with the buttons below in the army update table
  const handleNumberOnly = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value == "" || regex.test(e.target.value)) {
      setNewRequisitionAmount(e.target.value);
    }
  };


  useEffect(() => {
    refreshToken(); //getUsers(); // i need to inset get army and also get matches once i have built matches.
  }, []);

  useEffect(() => {
   
    if (userId) {
      getArmybyUserID();
    }
  }, [userId]);


  const goBack = () =>{
    navigate(`/dashboard`);
  }

  const goToSelectedArmy = (army) => {
    navigate(`/armies/${army.armyid}`, { state: {id: army.armyid, name: army.armyname}});
  }
  

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token"); //need to fix this route
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setuserID(decoded.userId);
      setName(decoded.userName);
      setUsers(decoded);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:8000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.userName);
        setExpire(decoded.exp);
        setuserID(decoded.userId);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  //this method adds a new army and calls the update method from the backend
  const addingNewArmy = async () => {
    let data = { idusers: userId, armyname : newarmyname }; 
    const response = await axiosJWT.post(
      `http://localhost:8000/army/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    setOpen(false); //closes the box
    getArmybyUserID(); //refreshes the table
  };

  //this method updates the army requisition and calls the update method from the backend
  const updateSelectedArmy = async (armyid) => {
    let data = { requisition : newRequisitionAmount }; //this is capturing the unit name and storing to a variable
    const response = await axiosJWT.put(
      `http://localhost:8000/army/updateArmybyID/${armyid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpenUpdate(false); //closes the box
    setArmyToBeUpdated({}); //this sets it back to default which will have no value
    getArmybyUserID(); //refreshes the table
  };
  

  //this method deletes the army and calls the delete method from the backend
  const deleteArmyByID = async (armyid) => {
    const response = await axiosJWT.delete(
      `http://localhost:8000/army/deleteArmyByID/${armyid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpenDelete(false); //closes the box
    setArmyToBeDeleted({}); //this sets it back to default which will have no value
    getArmybyUserID(); //refreshes the table
  };


  //this fuction gets the armies by the user id which is used later to populate the tables on the users front end
  const getArmybyUserID = async () => {
    const response = await axiosJWT.get(
      `http://localhost:8000/army/getArmyByUser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setArmies(response.data.data); //this is the data pulled from the backend and set for use in a table later
  };

  return (
    <div className="container mt-5">
           <h1>{name}'s Armies</h1>       
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Army Name</TableCell>
            <TableCell align="right">Requisition</TableCell>
            <TableCell align="right">Created Date</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {armies.map((army, index) => (
            <TableRow
              key={army.armyid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {army.armyname}
              </TableCell>
              <TableCell align="right">{army.requisition}</TableCell>
              <TableCell align="right">{army.createdOn}</TableCell>
              <TableCell align="right">{army.updatedOn}</TableCell>
              <TableCell align="right">
                <Button onClick={() => goToSelectedArmy(army)} variant="outlined">Details</Button>
                <Button variant="outlined" onClick={() => handleUpdateOpen(army)} >Update </Button> 
                <Button color="error" variant="outlined" onClick={() => handleDeleteOpen(army)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>

    {/* Update Army Dialog */}
    <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Update Army</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <label>
            You have selected the following Army to be updated, please only enter a number:
            <br/>
            <b>{armyToBeUpdated.armyname}</b>
            </label>
            </DialogContentText>
          <TextField
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            autoFocus
            margin="dense"
            id="requisition"
            label="Requisition Amount"
            type="number"
            fullWidth
            variant="standard"
            defaultValue={armyToBeUpdated.requisition}
            onChange={(e) => handleNumberOnly(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateSelectedArmy(armyToBeUpdated.armyid)}>Update Changes</Button> 
          <Button onClick={handleUpdateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Army Dialog */}
      <Dialog open={openDelete} onClose={handleDeleteClose}>
        <DialogTitle>Delete Army</DialogTitle>
        <DialogContent>
            <label>
              You have selected the following Army to be deleted:
              <br/>
              <b>{armyToBeDeleted.armyname}</b>
              <br/>
              <b>Please confirm if you wish to delete this army, once deleted you will not be able to recover it.</b>
            </label>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={() => deleteArmyByID(armyToBeDeleted.armyid)}>Delete Army</Button> 
          <Button variant="outlined" onClick={handleDeleteClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Add Army Dialog */}
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Army
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Army</DialogTitle>
        <DialogContent>
          <DialogContentText>Instructions to be added later</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="unitname"
            label="Army Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewArmyName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addingNewArmy}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <br></br>
      <Button onClick ={()=>goBack()} variant ="outlined">BACK</Button>
    </div>
  );
};
export default Armies;
