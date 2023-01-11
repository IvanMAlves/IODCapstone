import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Armies from "./components/Armies";
import ArmyDetail from "./components/ArmyDetail";
import About from "./components/About";
import Matches from "./components/Matches";

function App() {
  return (
  <Routes>
    <Route exact path='/' element={<><Login/></>} /> 
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/register' element={<Register/>} />
    <Route path='/dashboard' element={<><Navbar/> <Dashboard/></>} />
    <Route path='/armies' element={<><Navbar/> <Armies/></>}/>
    <Route path='/armies/:id' element={<><Navbar/> <ArmyDetail/></>}/>
    <Route path='/matches' element={<><Navbar/> <Matches/></>}/>
    <Route path='/about' element={<><Navbar/> <About/></>}/>
  </Routes>
  );
}
export default App;
