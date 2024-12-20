import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Matches = () => {
  const navigate = useNavigate();
  const [userId, setuserID] = useState("");
  const [users, setUsers] = useState([]); //this will store all the other users but the current logged in user
  const [matches, setMatches] = useState([]); //this will store all the matches for the logged in user
  const [idmatches, setMatchId] = useState("");//this will set the id of the match which will be used in the API call
  const [matchresult, setMatchResult] = useState("");//this will take the string from the user input and store it in the variable
  const [selectedMatchName, setSelectedMatchName] = useState("");//this will take the string from the user selecting a match and store it in the variable for the match name
  const [matchname, setMatchName] = useState("");//this will take the string from the user input and store it in the variable for the match name
  const [opponentId, setOpponentId] = useState("");//this will store the opponent id for the match making API
  const [open, setOpen] = useState(false);
  const [openUpdate, setUpdateOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  
  const handleUpdateOpen = (match) => {
    setMatchId(match.idmatches);
    setSelectedMatchName(match.matchname);
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };

  const handleSelectOpponent = (event) => {
    setOpponentId(event.target.value);
  };

  //method to call the API to get all the other users except logged in user
  const getAllOtherUsers = async () => {
    const response = await axiosJWT.get(
      `http://localhost:8000/users/selectAllOtherUsers/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data.data);
  };

  //

  const updateMatchByMatchID = async () => {
    let data = { matchresult: matchresult }; //this is capturing the unit name and storing to a variable
    const response = await axiosJWT.put(
      `http://localhost:8000/matches/updateMatchByMatchID/${idmatches}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUpdateOpen(false); //closes the box
    getMatchbyUserID(); //refreshes the table
    setMatchId(""); //clears the value of the opponent value
  };



  //method to call the API add a match
  const addingMatch = async () => {
    let data = { idusers: opponentId, matchname: matchname }; //this is capturing the unit name and storing to a variable
    const response = await axiosJWT.post(
      `http://localhost:8000/matches/createMatch/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpen(false); //closes the box
    getMatchbyUserID(); //refreshes the table
    setOpponentId(""); //clears the value of the opponent value
    setUsers([]); //clears the value of the users value
  };

  const axiosJWT = axios.create(); //handling JWT
  const token = localStorage.getItem("token"); //assigning the token to a variable
  useEffect(() => {
    const decoded = jwt_decode(token); //this stores the value of the user in decoded from the token
    setuserID(decoded.userId); //this sets the user id from the decoded token
    if (userId) {
      getMatchbyUserID();
      getAllOtherUsers();
    }
  }, [userId]);

  const getMatchbyUserID = async () => {
    const response = await axiosJWT.get(
      `http://localhost:8000/matches/getMatchByUserID/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMatches(response.data.data); //this is the data pulled from the backend and set for use in a table later
  };

  const goBack = () => {
    navigate(`/dashboard`);
  };

  return (
    <div className="container mt-5">
      <h1>Matches</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Match ID</TableCell>
              <TableCell align="right">Match Name</TableCell>
              <TableCell align="right">Attacker</TableCell>
              <TableCell align="right">Defender</TableCell>
              <TableCell align="right">Match Created Date</TableCell>
              <TableCell align="right">Match Played</TableCell>
              <TableCell align="right">Match Result</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow
                key={match.idmatches}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {match.idmatches}
                </TableCell>
                <TableCell align="right">{match.matchname}</TableCell>
                <TableCell align="right">{match.attacker}</TableCell>
                <TableCell align="right">{match.defender}</TableCell>
                <TableCell align="right">{match.createddate}</TableCell>
                <TableCell align="right">{match.dateplayed}</TableCell>
                <TableCell align="right">{match.matchresult}</TableCell>
                <TableCell>
                  <Button variant="outlined"  onClick={() => handleUpdateOpen(match)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openUpdate} onClose={handleUpdateClose}>
        <DialogTitle>Match Result<br/>
          <b>{selectedMatchName}</b>
          </DialogTitle>
        <DialogContent>
          <DialogContentText>Update the Match result with comments or noting the victor!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Update Match Results"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setMatchResult(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateMatchByMatchID}>Update</Button>
          <Button onClick={handleUpdateClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Match</DialogTitle>
        <DialogContent>
          <DialogContentText>Instructions to be added later</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Match Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setMatchName(e.target.value)}
          />
      <FormControl className="list-opponent" variant="standard">
        <br/>
        <InputLabel>Opponent</InputLabel>
        <Select
          value={opponentId}
          onChange={handleSelectOpponent}
          label="Age"
        >
          {users.map((match, index) => (
            <MenuItem key={index} value={match.idusers}>{match.username}</MenuItem>
          ))}
            
        </Select>
      </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={addingMatch}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Match
      </Button>
      <br></br>
      <Button onClick={() => goBack()} variant="outlined">
        BACK
      </Button>
    </div>
  );
};
export default Matches;
