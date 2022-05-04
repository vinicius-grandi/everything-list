import React from 'react';
import { Star } from 'react-feather';
import styled from 'styled-components';

type Basic = {
  cover: string;
  title: string;
  synopsis: string;
  rating: number | string;
};

const Container = styled.div`
  display: flex;
  img {
    width: 100px;
    height: auto;
    margin: 0.7rem;
  }
`;

const Rating = styled.span`
  display: grid;
  * {
    margin: 0;
    font-weight: 700;
  }
  .rating {
    grid-area: rating;
  }
  .rating-val {
    grid-area: rating-val;
    font-size: 2rem;
  }
  svg {
    grid-area: star;
    align-self: flex-end;
  }

  grid-template-areas: 'star rating' 'star rating-val';
  grid-template-columns: auto 1fr;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    background-color: var(--lightestG);
    padding: 0.2rem;
    margin-right: 1rem;
    text-align: justify;
  }
`;

function BasicInfo({ cover, title, synopsis, rating }: Basic): JSX.Element {
  return (
    <>
      <Container>
        <img src={cover} alt={title} />
        <InfoContainer>
          <h1>{title}</h1>
          <p>{synopsis}</p>
        </InfoContainer>
      </Container>
      <Rating>
        <Star fill="#faea5a" size={50} />
        <p className="rating">RATING</p>
        <p className="rating-val">{rating}</p>
      </Rating>
    </>
  );
}

export default BasicInfo;