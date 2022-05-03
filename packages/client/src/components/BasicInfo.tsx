import React from 'react';
import { Star } from 'react-feather';

type Basic = {
  cover: string;
  title: string;
  subtitle: string;
  synopsis: string;
  rating: number | string;
};

function BasicInfo({
  cover,
  title,
  subtitle,
  synopsis,
  rating,
}: Basic): JSX.Element {
  return (
    <>
      <div>
        <img src={cover} alt={title} />
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{synopsis}</p>
      </div>
      <Star fill="#faea5a" />
      <span>
        RATING <br /> {rating}
      </span>
    </>
  );
}

export default BasicInfo;
