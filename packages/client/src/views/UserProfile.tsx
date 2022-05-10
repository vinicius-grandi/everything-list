import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';
import styled from 'styled-components';
import useUser from '../hooks/useUser';
import type { Comment } from './weapons/WeaponDetails';
import {
  ReviewsContainer,
  CommentGrid,
  CommentItem,
} from '../components/itemDetails/Reviews';

export type User = {
  id: number;
  profile_picture: string;
  username: string;
  email: string;
  reviews?: Comment[];
};

const ProfileInfo = styled.div`
  background-color: #b5c5bb;
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type='file'] {
    background-color: black;
    display: none;
  }

  form {
    position: relative;
  }

  label {
    position: absolute;
    right: 0;
  }

  svg {
    cursor: pointer;
  }
`;

function UserProfile(): JSX.Element {
  const [refresh, setRefresh] = useState<boolean>(false);
  const user = useUser(true, refresh);
  const buttonRef = useRef<HTMLInputElement>(null);

  const handleForm = async (
    ev: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const formData = new FormData(form);
    await fetch('/profiles/api/0', {
      body: formData,
      method: 'put',
    });
    setRefresh(true);
  };

  return (
    <main>
      {user && (
        <>
          <ProfileInfo>
            <form onSubmit={handleForm}>
              <label htmlFor="image">
                <Edit />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  id="image"
                  name="profilePicture"
                  onChange={() => {
                    if (buttonRef.current) {
                      buttonRef.current.click();
                    }
                  }}
                />
                <input type="submit" ref={buttonRef} hidden />
              </label>
              <img
                src={user.profile_picture}
                alt={user.username}
                data-testid="profile-picture"
              />
            </form>
            <h1>{user.username}</h1>
          </ProfileInfo>
          <h1>Last Reviews</h1>
          {user.reviews && (
            <ReviewsContainer>
              <ul>
                {user.reviews.map((comment) => (
                  <CommentItem key={`${user.id}-${comment.createdAt}`}>
                    <CommentGrid>
                      <img
                        src={user.profile_picture ?? '/images/50x50.jpg'}
                        alt={`${user.username} profile`}
                      />
                      <p>
                        <strong>{user.username}</strong>
                      </p>
                      <span>
                        ⭐rating<strong> {comment.rating}</strong>
                      </span>
                      <p className="date">
                        {`created at - ${comment.createdAt}`} <br />{' '}
                        {`updated at - ${comment.updatedAt}`}
                      </p>
                    </CommentGrid>
                    <p className="comment-msg">{comment.message}</p>
                    <Link to={`/${comment.list_name}/${comment.item_id}`}>
                      <p>Go to item&apos;s page</p>
                    </Link>
                  </CommentItem>
                ))}
              </ul>
            </ReviewsContainer>
          )}
        </>
      )}
    </main>
  );
}

export default UserProfile;
