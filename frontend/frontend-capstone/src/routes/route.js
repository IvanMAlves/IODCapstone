import React, { } from 'react';
import { Routes, Route } from 'react-router-dom';
import Armies from "./components/Armies";
import Units from "./components/Units";

export const AppRoutes = (props) => {
  return (
    <Routes>
      <Route path='/armies' element={<Armies/>} />
      <Route path='/units' element={<Units/>} />
    </Routes>
  )
}