import React, { Suspense } from 'react';
// import { HashRouter } from "react-router-dom"
import styled from './App.module.scss';
import BackdropSpinner from './components/BackdropSpinner';
import StackOverflow from './pages/StackOverflow';

function App() {
  return (
    // <HashRouter>
    <div className={styled.container}>
      <Suspense fallback={<BackdropSpinner open />}>
        <StackOverflow />
      </Suspense>
    </div>
    // </HashRouter>
  );
}

export default App;
