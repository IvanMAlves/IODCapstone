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

const Matches = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userId, setuserID] = useState("");
  const [users, setUsers] = useState({});
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const [matchname, setMatchName] = useState("");
  const [opponentId, setOpponentId] = useState("");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    //method to add a unit
    const addingMatch = async () => {
      let data = { opponentid: opponentId, match_name: matchname }; //this is capturing the unit name and storing to a variable
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
    };


  useEffect(() => {
    refreshToken();
    //getUsers(); // i need to inset get army and also get matches once i have built matches.
  }, []);

  useEffect(() => {
    if (userId) {
      getMatchbyUserID();
    }
  }, [userId]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token"); //need to fix this route
      setToken(response.data.accessToken);
      localStorage.setItem("token", response.data.accessToken);
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



  const goBack = () =>{
    navigate(`/dashboard`);
  }

  return (
    <div className="container mt-5">
      <h1>{name}'s Matches</h1>
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
                  <Button variant="outlined">Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Match
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Match</DialogTitle>
        <DialogContent>
          <DialogContentText>Instructions to be added later</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="matchname"
            label="Match Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setMatchName(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="opponent"
            label="Opponent's Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setOpponentId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addingMatch}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <br></br>
      <Button onClick ={()=>goBack()} variant ="outlined">BACK</Button>
    </div>
  );
};
export default Matches;
