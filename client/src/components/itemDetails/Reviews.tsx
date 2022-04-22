import React from 'react';
import { RefreshCcw } from 'react-feather';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import type { Comment } from '../../views/weapons/WeaponDetails';

const ReviewsContainer = styled.section`
  ul {
    list-style: none;
    list-style-type: none;
    margin: 0 !important;
    padding: 1rem 0;
    height: fit-content;
    background-color: #53c278;

    .comment-msg {
      background-color: #b5c5bb;
      padding: 0.5rem;
      margin: 0;
    }
  }

  a {
    text-decoration: none;
  }
`;

const CommentGrid = styled.div`
  a,
  img,
  p,
  span,
  strong {
    margin: 0 !important;
    padding: 0 !important;
  }
  display: grid;
  grid-template-areas:
    'pic name rating'
    'pic date date';

  grid-template-rows: 1fr 1fr;
  grid-template-columns: 60px 1fr 1fr;
  height: fit-content;
  margin: 0 !important;

  img {
    grid-area: pic;
    border-radius: 50%;
  }

  strong {
    font-size: 1.3rem;
    grid-area: name;
  }

  span {
    grid-area: rating;
    font-size: 1rem;
  }

  .date {
    grid-area: date;
    font-size: 0.7rem;
  }
`;

const CommentItem = styled.li`
  display: flex;
  margin-top: 1.5rem !important;
  flex-direction: column;

  :nth-child(n) {
    flex-basis: 1 1 0;
  }
`;

function Reviews({ comments }: { comments: Comment[] }): JSX.Element {
  return (
    <>
      <h1 style={{ margin: '1rem 0' }}>Reviews</h1>
      <RefreshCcw />
      <ReviewsContainer>
        <ul>
          {comments.map((comment) => (
            <CommentItem
              key={`${comment.review_user.id}-${comment.created_at}`}
            >
              <CommentGrid>
                <Link to={`/profiles/${comment.review_user.id}`}>
                  <img
                    src={
                      comment.review_user.profile_picture ??
                      'https://via.placeholder.com/50X50.png'
                    }
                    alt={`${comment.review_user.username} profile`}
                  />
                </Link>
                <p>
                  <strong>{comment.review_user.username}</strong>
                </p>
                <span>
                  ⭐rating<strong> {comment.rating}</strong>
                </span>
                <p className="date">
                  {`created at - ${comment.created_at}`} <br />{' '}
                  {`updated at - ${comment.updated_at}`}
                </p>
              </CommentGrid>
              <p className="comment-msg">{comment.message}</p>
            </CommentItem>
          ))}
        </ul>
      </ReviewsContainer>
    </>
  );
}

export default Reviews;
