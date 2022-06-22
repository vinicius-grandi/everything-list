import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import socketIOClient, { Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { Rate } from '../../views/weapons/WeaponDetails';

const ENDPOINT = `${window.location.hostname}`;

const WeaponReviewForm = styled.form`
  margin: 1rem;
  position: relative;
  margin-top: 1rem !important;
  background-color: #543275;
  padding: 0.5rem;
  h1 {
    margin: 1rem;
    color: #f6f6f6;
  }

  div {
    margin: 1rem;
  }

  img {
    border-radius: 50%;
  }

  input[type='number'] {
    font-size: 1rem;
    width: 3rem;
  }
`;

const Seal = styled.span`
  background-color: #53c278;
  position: absolute;
  border: 1px solid black;
  top: 0px;
  margin: 0 !important;
  padding: 0.3rem !important;
  right: 0;
  color: #f6f6f6;
  transform: rotate(50deg) translate(25%, -15%);
`;

const ReviewUserInfo = styled.div`
  * {
    margin: 0 !important;
    padding: 0 !important;
  }
  margin: 1rem;
  color: #f6f6f6;
  display: grid;
  grid-template-columns: 0fr 1fr 1fr;
`;

const ReviewInput = styled.div`
  display: flex;
  margin: 0 !important;
  flex-direction: column;
  align-items: flex-end;
  textarea {
    width: 100%;
    font-size: 1.2rem;
    margin: 1rem 0 !important;
  }
  input[type='submit'] {
    width: fit-content;
    border: none;
    color: #f6f6f6;
    font-weight: 600;
    padding: 0.36rem;
    margin-top: 0.8Zrem;
    margin-top: 1rem;
    background-color: #38754c;
  }
`;

function SetReview({
  listName,
  reviewExists,
  setResponse,
}: {
  listName: string;
  reviewExists: Rate | null;
  setResponse: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const { id } = useParams();
  const [revExists, setRevExists] = useState(Boolean(reviewExists));
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useUser(false);

  useEffect(() => {
    const s = socketIOClient(ENDPOINT);
    setSocket(s);
    s.on('error', () => {
      setResponse('error');
    });
    s.on('review', (r) => {
      setResponse(r);
    });

    return () => {
      s.disconnect();
    };
  }, [setResponse]);

  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(`/${listName}/api/${id}`, {
      method: revExists ? 'put' : 'post',
      body: formData,
    });

    if (!revExists) {
      setRevExists(true);
    }

    if (response.status !== 200) {
      const body: { error: string } = await response.json();
      return setError(body.error);
    }
    return undefined;
  };

  return (
    <>
      {error && <h2 className="error">{error}</h2>}
      {user && (
        <WeaponReviewForm onSubmit={handleForm}>
          <h1>Rate this item</h1>
          <Seal>{reviewExists ? 'EDITING' : 'CREATING'}</Seal>
          <div>
            <ReviewUserInfo>
              <img
                src={user.profile_picture ?? '/images/50x50.jpg'}
                alt="your profile"
              />
              <p>
                <strong>{user.username}</strong>
              </p>
              <span>
                ⭐
                <label htmlFor="rating">
                  Rating
                  <input
                    type="number"
                    step={0.1}
                    max={10}
                    min={0}
                    name="rating"
                    id="rating"
                    defaultValue={reviewExists ? reviewExists.rating : 0}
                  />
                </label>
              </span>
            </ReviewUserInfo>
            <ReviewInput>
              <textarea
                name="message"
                cols={10}
                rows={10}
                defaultValue={reviewExists ? reviewExists.message : ''}
                maxLength={500}
              />
              <input
                type="submit"
                value={reviewExists ? 'EDIT REVIEW' : 'SEND REVIEW'}
                onClick={() => {
                  if (socket) {
                    socket.emit('review', `${listName}-${id}`);
                  }
                }}
              />
            </ReviewInput>
          </div>
        </WeaponReviewForm>
      )}
    </>
  );
}

export default SetReview;
