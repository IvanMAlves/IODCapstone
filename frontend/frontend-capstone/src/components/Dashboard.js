/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userId, setuserID] = useState("");
  const [users, setUsers] = useState({});
  const [armies, setArmies] = useState([]);
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken(); //getUsers(); // i need to inset get army and also get matches once i have built matches.
  }, []);

  useEffect(() => {
    // wait until userData is defined to make the second call
    if (userId) {
      getArmybyUserID();
    }
  }, [userId]);

  useEffect(() => {
    if (userId){
        getMatchbyUserID();
    }
  },[userId]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/token"); //need to fix this route
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setuserID(decoded.userId);
      setName(decoded.userName);
      setUsers(decoded);
      setExpire(decoded.exp);
      console.log(decoded);
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
    console.log(response.data.data);
  };

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
    console.log(response.data.data);
  };

  //store the army like the user
  //kind of like this (need to make a new state for my army and setarmy)setUsers(response.data.data);

  return (
    <div className="container mt-5">
                  <h1>Welcome Back: {name}</h1>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Army ID</th>
            <th>Army Name</th>
            <th>Requisition</th>
            <th>Created Date</th>
            <th>Last Updated</th>
          </tr>
        </thead>   
        <tbody>
          {armies.map((army, index) => (
            <tr key={army.armyid}>
              <td>{army.armyid}</td>
              <td>{army.armyname}</td>
              <td>{army.requisition}</td>
              <td>{army.createdOn}</td>
              <td>{army.updatedOn}</td>        
            </tr>
          ))}
        </tbody>
      </table>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Match Name</th>
            <th>Attacker</th>
            <th>Defender</th>
            <th>Match Created On</th>
          </tr>
        </thead>   
        <tbody>
          {matches.map((match, index) => (
            <tr key={match.idmatches}>
              <td>{match.idmatches}</td>
              <td>{match.matchname}</td>
              <td>{match.attacker}</td>
              <td>{match.defender}</td>
              <td>{match.createddate}</td>     
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Dashboard;
