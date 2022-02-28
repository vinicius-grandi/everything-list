import React from 'react';
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    fetch('/message')
      .then((res) => console.log(res));
  })

  return <h1>Home</h1>
};

export default Home;
