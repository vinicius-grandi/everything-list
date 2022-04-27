import React, { useState } from 'react';
import styled from 'styled-components';
import { Rate, User } from '../../views/weapons/WeaponDetails';

const WeaponReviewForm = styled.form`
  margin: 1rem;
  position: relative;
  margin-top: 1rem;
  background-color: #543275;
  padding: 0.5rem;
  h1 {
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
  grid-template-columns: 60px 1fr 1fr;
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
  id,
  listName,
  user,
  reviewExists,
}: {
  id: string | number;
  listName: string;
  user: User;
  reviewExists: Rate | null;
}): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const handleForm = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const response = await fetch(`/${listName}/api/${id}`, {
      method: reviewExists ? 'put' : 'post',
      body: formData,
    });
    if (response.status !== 200) {
      const body: { error: string } = await response.json();
      return setError(body.error);
    }
    return undefined;
  };

  return (
    <>
      {error && <h2 className="error">{error}</h2>}
      <WeaponReviewForm onSubmit={handleForm}>
        <h1>Rate this item</h1>
        <Seal>{reviewExists ? 'EDITING' : 'CREATING'}</Seal>
        <div>
          <ReviewUserInfo>
            <img
              src={
                user.profile_picture ?? 'https://via.placeholder.com/50X50.png'
              }
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
            />
          </ReviewInput>
        </div>
      </WeaponReviewForm>
    </>
  );
}

export default SetReview;
