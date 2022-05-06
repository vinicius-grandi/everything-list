import React from 'react';

function DefaultImg({ src, alt }: { src: string; alt: string }): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      onError={(ev) => {
        const { currentTarget } = ev;
        currentTarget.src = 'https://via.placeholder.com/140x200?text=no+image';
      }}
    />
  );
}

export default DefaultImg;
