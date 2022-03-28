import React, { useEffect } from 'react';

function Home(): JSX.Element {
  useEffect(() => {
    fetch('/animes')
      .then((res) => res)
      .then((data) => console.log(data.text().then((r) => console.log(r))));
  });

  return <h1>Home</h1>;
}

export default Home;
