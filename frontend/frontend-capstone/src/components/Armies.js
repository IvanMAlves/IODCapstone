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



const Armies = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userId, setuserID] = useState("");
  const [users, setUsers] = useState({});
  const [armies, setArmies] = useState([]);
  const navigate = useNavigate();
 

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
           <h1>Welcome Back: {name}</h1>       
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
              <TableCell align="right"><Button onClick={() => goToSelectedArmy(army.armyid)} variant="outlined">Details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};
export default Armies;
