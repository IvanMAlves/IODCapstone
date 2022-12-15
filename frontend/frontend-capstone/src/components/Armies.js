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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Armies = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userId, setuserID] = useState("");
  const [users, setUsers] = useState({});
  const [armies, setArmies] = useState([]);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 

  useEffect(() => {
    refreshToken(); //getUsers(); // i need to inset get army and also get matches once i have built matches.
  }, []);

  useEffect(() => {
   
    if (userId) {
      getArmybyUserID();
    }
  }, [userId]);

  useEffect(() => {
    // wait until userData is defined to make the second call
      //getUnitsByArmyId();
  }, []);

  const goBack = () =>{
    navigate(`/dashboard`);
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


  const goToSelectedArmy = (armyid) => {
    navigate(`/armies/${armyid}`, { state: {id: armyid}});
  }

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
                <Button variant="outlined">Update</Button>
                <Button variant="outlined">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br></br>
    <Button onClick={handleOpen}>Add Army</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Army
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add in form in here things to do: 1. i need to save the name and
            honors from the form into a state 2. and then use an onSubmit to
            call a method which goes to my route.
            3.Change the formatting on the dates and times to make it more user friendly
          </Typography>
        </Box>
      </Modal>
      <br></br>
      <Button onClick ={()=>goBack()} variant ="outlined">BACK</Button>
    </div>
  );
};
export default Armies;
