import React from 'react';
import { Link } from 'react-router-dom';

type Card = {
  title: string;
  imagePath: string | null;
};

const Card = ({ title, imagePath }: Card): JSX.Element => (
  <div>
    <p data-testid="card-title">
      <Link to={`/weapons/${title.toLowerCase()}`} data-testid="weapon-link">
        {title}
      </Link>
    </p>
    <img
      data-testid="card-image"
      src={imagePath ?? 'https://via.placeholder.com/500x500?text=No+Image'}
      alt={title}
    />
  </div>
);

export default Card;
