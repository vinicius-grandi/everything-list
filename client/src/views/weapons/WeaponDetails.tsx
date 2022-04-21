import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Star } from 'react-feather';
import { useParams, useNavigate } from 'react-router-dom';
import Reviews from '../../components/itemDetails/Reviews';

type User = {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
};

export type Comment = {
  id: number;
  username: string;
  profilePicture: string;
  message: string;
  rating: number;
  created_at: string;
  updated_at: string;
};

type QueryItem = {
  list_name: string;
  rating: number;
  id: number | string;
  name: string;
  summary: string;
  synonyms: string[] | string | null;
  imagePath: string | null;
} | null;

const WeaponDetailsContainer = styled.main`
  *:not(section, form, svg) {
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
    width: 90%;
    height: auto;
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

const WeaponSummary = styled.p`
  text-align: justify;
  padding: 0.55rem;
  color: #f6f6f6;
  margin-right: 1rem;
  background-color: #3b8955;
`;

const WeaponReviewForm = styled.form`
  margin-top: 1rem;
  background-color: #543275;
  h1 {
    color: #f6f6f6;
  }
`;

const ReviewUserInfo = styled.div`
  display: flex;
  color: #f6f6f6;
  span {
    display: flex;
    input {
      width: 50%;
      height: 50%;
    }
  }
`;

const ReviewInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  textarea {
    width: 100%;
  }
  input {
    width: fit-content;
    border: none;
    color: #f6f6f6;
    font-weight: 600;
    padding: 0.36rem;
    background-color: #38754c;
  }
`;

function WeaponDetails(): JSX.Element {
  const { id } = useParams();
  const [item, setItem] = useState<QueryItem>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [updateComments, setUpdateComments] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(`/weapons/api/${id}`, {
      method: 'post',
      body: formData,
    });
    if (response.status !== 200) {
      const body: { error: string } = await response.json();
      return setError(body.error);
    }

    return setUpdateComments(!updateComments);
  };

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
  }, [id, updateComments]);

  useEffect(() => {
    async function getUser(): Promise<void> {
      try {
        const response = await fetch('/profiles/api/0?review=false');
        const userFromResponse: User = await response.json();
        setUser(userFromResponse);
      } catch (_error) {
        setUser(null);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function getItem(): Promise<void> {
      try {
        const response = await fetch(`/weapons/api/${id}`);
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
      {error && <p>{error}</p>}
      {item && (
        <>
          <WeaponInfoContainer>
            <h1>{item.name}</h1>
            <Rating>
              <Star fill="#faea5a" />
              <strong>Rating:</strong> <span>{item.rating}</span>
            </Rating>
            <img
              src={
                item.imagePath ??
                'https://via.placeholder.com/500x500?text=No+Image'
              }
              alt={`${item.name}-weapons`}
            />
            <WeaponSummary>{item.summary}</WeaponSummary>
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
            <WeaponReviewForm onSubmit={handleForm}>
              <h1>Rate this item</h1>
              <div>
                <ReviewUserInfo>
                  <img src={user.profile_picture} alt="your profile" />
                  <p>{user.username}</p>
                  <span>
                    {'⭐rating '}
                    <input type="number" step={0.1} max={10} min={0} />
                  </span>
                </ReviewUserInfo>
                <ReviewInput>
                  <textarea name="message" cols={10} rows={10} />
                  <input type="submit" />
                </ReviewInput>
              </div>
            </WeaponReviewForm>
          )}
          {comments.length > 1 && <Reviews comments={comments} />}
        </>
      )}
    </WeaponDetailsContainer>
  );
}

export default WeaponDetails;
