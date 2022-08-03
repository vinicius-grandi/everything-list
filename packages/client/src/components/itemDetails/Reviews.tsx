import React, { useState } from 'react';
import { RefreshCcw } from 'react-feather';
import styled from 'styled-components';
import useComments from '../../hooks/useComments';

type SetResponse = React.Dispatch<React.SetStateAction<string>>;

const ResponseMsg = styled.p`
  margin: 0 !important;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: var(--lightP);
  color: #f6f6f6;
`;

export const ReviewsContainer = styled.section`
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

export const CommentGrid = styled.div`
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
  grid-template-columns: 1fr 1fr 1fr;
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

export const CommentItem = styled.li`
  display: flex;
  margin-top: 1.5rem !important;
  flex-direction: column;

  :nth-child(n) {
    flex-basis: 1 1 0;
  }

  p {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    margin: 1rem 0 !important;
  }
`;

function Refresh({
  setResponse,
  setRefresh,
  refresh,
}: {
  setResponse: SetResponse;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}): JSX.Element {
  return (
    <p style={{ backgroundColor: '#e26060', margin: 0 }}>
      <RefreshCcw
        onClick={() => {
          setResponse('There are no new reviews');
          setRefresh(!refresh);
        }}
      />
      <strong>REFRESH REVIEWS</strong>
    </p>
  );
}

function Reviews({
  response,
  setResponse,
}: {
  response: string;
  setResponse: SetResponse;
}): JSX.Element {
  const [refresh, setRefresh] = useState<boolean>(false);
  const comments = useComments(refresh);
  return (
    <div style={{ margin: 0 }}>
      {comments.length >= 1 ? (
        <>
          <h1 style={{ margin: '1rem 0' }}>Reviews</h1>
          <Refresh
            refresh={refresh}
            setRefresh={setRefresh}
            setResponse={setResponse}
          />
          <ResponseMsg>{response}</ResponseMsg>
          <ReviewsContainer>
            <ul>
              {comments.map((comment) => (
                <CommentItem
                  key={`${comment.review_user.id}-${comment.created_at}`}
                >
                  <CommentGrid>
                    <img
                      src={
                        comment.review_user.profile_picture ??
                        '/images/100x100.jpg'
                      }
                      alt={`${comment.review_user.username} profile`}
                    />
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
      ) : (
        <>
          <h1>Reviews</h1>
          <Refresh
            refresh={refresh}
            setRefresh={setRefresh}
            setResponse={setResponse}
          />
          <ResponseMsg>{response}</ResponseMsg>
        </>
      )}
    </div>
  );
}

export default Reviews;
