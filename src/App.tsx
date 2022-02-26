import React, { useEffect, useState } from 'react';
import * as api from './services/jikanapi';

function App() {
  useEffect(() => {
    api.getSchedule(7).then((r: object[]) => console.log(r));
  }, []);
  return (
    <div className="App">
      <h1>Sample Text</h1>
    </div>
  );
}

export default App;
