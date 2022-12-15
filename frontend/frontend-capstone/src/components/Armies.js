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
  const [armyToBeUpdated, setArmyToBeUpdated] = useState("");
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

  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
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

  const goToSelectedArmy = (armyid) => {
    navigate(`/armies/${armyid}`, { state: {id: armyid}});
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


  const updateSelectedArmy = async () => {
    let data = { requisition : newRequisitionAmount }; //this is capturing the unit name and storing to a variable
    // const response = await axiosJWT.post(
    //   `http://localhost:8000/army/updateArmybyID/:armyid`,
    //   data,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // setOpen(false); //closes the box
    // getArmybyUserID(); //refreshes the table
  };
  
  const deleteArmyByID = async (armyid) => {
    const response = await axiosJWT.delete(
      `http://localhost:8000/army/deleteArmyByID/${armyid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getArmybyUserID();
  };


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
                <Button onClick={() => goToSelectedArmy(army.armyid)} variant="outlined">Details</Button>
                <Button variant="outlined" onClick={handleUpdateOpen}>Update </Button>
                <Button color="error" variant="outlined">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Update Army</DialogTitle>
        <DialogContent>
          <DialogContentText>Instructions to be added later</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="armyname"
            label="Army Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewRequisitionAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateSelectedArmy}>Update Changes</Button>
          <Button onClick={handleUpdateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      
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
            label="Unit Name"
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
