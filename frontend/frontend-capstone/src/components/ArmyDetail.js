import "../App.css"
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
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

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

const ArmyDetail = () => {
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [armyId, setArmyID] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "This field is being focused";
      }

      return "Helper text";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  function UseFormControl() {
    return (
      <Box component="form" noValidate autoComplete="off">
        <FormControl sx={{ width: "25ch" }}>
          <OutlinedInput placeholder="Please enter text" />
          <MyFormHelperText />
        </FormControl>
      </Box>
    );
  }

  useEffect(() => {
    const { id } = state;
    if (id) {
      getUnitsByArmyId(id);
      setArmyID(id);
    }
    console.log("armyDetail page" + id);
    console.log(state);
  }, []);

  const updateSelectedUnit = (unitid) => {
    console.log("update unit");
    navigate(`/unit/${unitid}`, { state: { id: unitid, armyId: armyId } });
  };

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

  /*
              things to do:
              1. i need to save the name and honors from the form into a state 
              2. and then use an onSubmit to call a method which goes to my route.
*/

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
                  <Button
                    onClick={() => updateSelectedUnit(unit.unitid)}
                    variant="outlined"
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <Button onClick={handleOpen}>Add Unit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add unit
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add in form in here things to do: 1. i need to save the name and
            honors from the form into a state 2. and then use an onSubmit to
            call a method which goes to my route.
            3.Change the formatting on the dates and times to make it more user friendly
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default ArmyDetail;
