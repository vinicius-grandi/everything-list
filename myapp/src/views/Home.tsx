import React, { useEffect } from 'react';

const Home = (): JSX.Element => {
  useEffect(() => {
    fetch('/message')
      .then((res) => res)
      .then((data) => console.log(data.text().then((r) => console.log(r))));
  });

  return <h1>Home</h1>;
};

export default Home;
