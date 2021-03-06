import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Card = {
  title: string;
  imagePath: string | null;
  id: number | string;
  rating: number;
  listName: string;
};

const CardBody = styled.div`
  position: relative;

  span {
    background-color: #f6f6f6;
    position: absolute;
    color: #181616;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: -2%;
    text-align: center;
    padding: 0.2rem;
    border-radius: 5px;
  }

  @media screen and (min-width: 1001px) {
    font-size: 2rem;
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 250px) {
    font-size: 1.5rem;
  }
  background-color: #53c278;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem;
  box-shadow: -2px 3px 5px rgba(0, 0, 0, 0.208);
  &:hover {
    transition: 0.25s;
  }
  img {
    background-color: #f6f6f6;
    width: 100%;
    height: auto;
    max-height: 400px;
    border-radius: 4px;
    image-rendering: auto;
  }
  a {
    text-shadow: -1px 2px 3px rgba(0, 0, 0, 0.208);
    color: white;
    font-weight: bold;
    text-decoration: none;
    max-width: 100%;
  }

  p {
    overflow: hidden !important;
  }
`;

function Card({
  title,
  imagePath,
  id,
  listName,
  rating,
  isLazyLoading,
}: Card & { isLazyLoading: boolean }): JSX.Element {
  return (
    <CardBody>
      <Link to={`/${listName}/${id}`} data-testid="weapon-link">
        <span>⭐ {rating}</span>
        <p data-testid="card-title">{title}</p>
        <img
          data-testid="card-image"
          height={200}
          width={100}
          loading={isLazyLoading ? 'lazy' : 'eager'}
          src={imagePath ?? '/images/500x500.jpg'}
          onError={({ target }) => {
            const image = target as HTMLImageElement;
            const {
              dataset: { src },
            } = image;
            if (src) {
              image.src = src;
            }
          }}
          alt={title}
        />
      </Link>
    </CardBody>
  );
}

export default Card;
