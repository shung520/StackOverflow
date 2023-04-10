import React, { Suspense } from 'react';
import styled from './App.module.scss';
import BackdropSpinner from './components/BackdropSpinner';
import StackOverflow from './pages/StackOverflow';

function App() {
  return (
    <div className={styled.container}>
      <Suspense fallback={<BackdropSpinner open />}>
        <StackOverflow />
      </Suspense>
    </div>
  );
}

export default App;
