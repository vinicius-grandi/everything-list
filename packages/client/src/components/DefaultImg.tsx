import React from 'react';

function DefaultImg({ src, alt }: { src: string; alt: string }): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      onError={(ev) => {
        const { currentTarget } = ev;
        currentTarget.src = '/images/100x200.jpg';
      }}
    />
  );
}

export default DefaultImg;
