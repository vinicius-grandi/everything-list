import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Star } from 'react-feather';
import { useParams, useNavigate } from 'react-router-dom';
import Reviews from '../../components/itemDetails/Reviews';
import SetReview from '../../components/itemDetails/SetReview';
import useUser from '../../hooks/useUser';

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
  const { id } = useParams();
  const [item, setItem] = useState<QueryItem>(null);
  const user = useUser(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getComments(): Promise<void> {
      try {
        const response = await fetch(`/weapons/api/${id}/comments`);
        const commentsFromResponse: Comment[] = await response.json();
        setComments(commentsFromResponse);
      } catch (_error) {
        setComments([]);
      }
    }
    getComments();
  }, [id]);

  useEffect(() => {
    async function getItem(): Promise<void> {
      try {
        const response = await fetch(`/weapons/api/${id}`);
        if (response.status !== 200) {
          navigate('/weapons', {
            replace: true,
          });
        }
        const itemFromResponse: QueryItem = await response.json();
        setItem(itemFromResponse);
      } catch (_err) {
        navigate('/weapons', {
          replace: true,
        });
      }
    }
    getItem();
  }, [id, navigate]);
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
          {user && (
            <SetReview
              id={id ?? 0}
              listName="weapons"
              user={user}
              reviewExists={item.reviewExists}
            />
          )}
          {comments.length >= 1 && <Reviews comments={comments} />}
        </>
      )}
    </WeaponDetailsContainer>
  );
}

export default WeaponDetails;
