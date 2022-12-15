import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Armies from "./components/Armies";
import ArmyDetail from "./components/ArmyDetail";
import UnitDetails from "./components/UnitDetails";
import About from "./components/About";

function App() {
  return (
  <Routes>
    <Route exact path='/' element={<><Navbar/><Dashboard/></>} />
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>} />
    <Route path='/dashboard' element={<><Navbar/> <Dashboard/></>} />
    <Route path='/armies' element={<><Navbar/> <Armies/></>}/>
    <Route path='/armies/:id' element={<><Navbar/> <ArmyDetail/></>}/>
    <Route path='/unit/:id' element={<><Navbar/> <UnitDetails/></>}/>
    <Route path='/about' element={<><Navbar/> <About/></>}/>
  </Routes>
  );
}
export default App;
