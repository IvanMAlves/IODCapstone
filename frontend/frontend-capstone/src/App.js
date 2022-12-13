import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Armies from "./components/Armies";
import Units from "./components/Units";

function App() {
  return (
    <Routes>
    <Route exact path='/' element={<Login/>} />
    <Route exact path='/register' element={<Register/>} />
    <Route path='/dashboard' element={<><Navbar/> <Dashboard/></>} />
    <Route path='/armies' element={<Armies/>}/>
    <Route path='/units' element={<Units/>}/>
  </Routes>
  );
}
export default App;
