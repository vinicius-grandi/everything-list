import React, { useState } from 'react';
import styled from 'styled-components';
import { Star, RefreshCcw } from 'react-feather';
import { useParams } from 'react-router-dom';
import Reviews from '../../components/itemDetails/Reviews';
import SetReview from '../../components/itemDetails/SetReview';
import useUser from '../../hooks/useUser';
import { useAuth } from '../../contexts/AuthContext';
import useComments from '../../hooks/useComments';
import useItem from '../../hooks/useItem';

export type User = {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
};

export type Rate = {
  message: string;
  rating: number;
  created_at: string;
  updated_at: string;
  createdAt?: string;
  updatedAt?: string;
  item_id: number | string;
  user_id: number;
  list_name: string;
};

export type Comment = {
  review_user: {
    id: number;
    username: string;
    profile_picture: string;
  };
} & Rate;

type QueryItem = {
  list_name: string;
  rating: number;
  id: number | string;
  name: string;
  summary: string;
  synonyms: string[] | string | null;
  imagePath: string | null;
  reviewExists: Rate | null;
} | null;

const WeaponDetailsContainer = styled.main`
  *:not(section, form) {
    margin: 0 1rem;
  }
`;

const WeaponInfoContainer = styled.section`
  margin-top: 1rem;
  h1 {
    font-size: 2.5rem;
    margin: 1rem;
  }
  background-color: #53c278;
  padding: 1rem 0;

  img {
    max-width: 100%;
  }
`;

const Rating = styled.p`
  margin: 1rem 0;
  padding: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  span {
    margin-left: 0.5rem;
    font-weight: 700;
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0.45rem;
`;

const WeaponSummary = styled.p`
  text-align: justify;
  padding: 0.55rem;
  color: #f6f6f6;
  margin-right: 1rem;
  background-color: #3b8955;
`;

function WeaponDetails(): JSX.Element {
  const { auth } = useAuth();
  const [refresh, setRefresh] = useState<boolean>(false);
  const comments = useComments(refresh);
  const item = useItem<QueryItem>(refresh);
  const [resp, setResp] = useState<string>('There are no new reviews');

  return (
    <WeaponDetailsContainer>
      {item && (
        <>
          <WeaponInfoContainer>
            <h1>{item.name}</h1>
            <Rating>
              <Star fill="#faea5a" />
              <strong>Rating:</strong> <span>{item.rating}</span>
            </Rating>
            <Container>
              <img
                src={
                  item.imagePath ??
                  'https://via.placeholder.com/500x500?text=No+Image'
                }
                alt={`${item.name}-weapons`}
              />
              <WeaponSummary>{item.summary}</WeaponSummary>
            </Container>
            {item.synonyms && (
              <>
                <h2>Synonyms</h2>
                {typeof item.synonyms === 'string' ? (
                  <p>{item.synonyms}</p>
                ) : (
                  <ul>
                    {item.synonyms.map((val) => (
                      <li key={`${val}-weapons`}>{val}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </WeaponInfoContainer>
          {auth && (
            <SetReview
              listName="weapons"
              reviewExists={item.reviewExists}
              setResponse={setResp}
            />
          )}
          <p style={{ backgroundColor: '#e26060' }}>
            <RefreshCcw
              onClick={() => {
                setResp('There are no new reviews');
                setRefresh(!refresh);
              }}
            />
            <strong>REFRESH REVIEWS</strong>
          </p>
          {comments.length >= 1 && (
            <Reviews comments={comments} response={resp} />
          )}
        </>
      )}
    </WeaponDetailsContainer>
  );
}

export default WeaponDetails;
