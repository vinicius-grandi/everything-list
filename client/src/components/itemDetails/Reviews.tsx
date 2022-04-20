import React from 'react';
import { Link } from 'react-router-dom';
import type { Comment } from '../../views/weapons/WeaponDetails';

function Reviews({ comments }: { comments: Comment[] }): JSX.Element {
  return (
    <>
      <h1>Reviews</h1>
      <section>
        <ul>
          {comments.map((comment) => (
            <li key={`${comment.id}-${comment.created_at}`}>
              <div>
                <Link to={`/profiles/${comment.id}`}>
                  <img
                    src={comment.profilePicture}
                    alt={`${comment.username} profile`}
                  />
                </Link>
                <p>{comment.username}</p>
                <span>⭐rating {comment.rating}</span>
                <p>
                  {`created at - ${comment.created_at} / updated at - ${comment.updated_at}`}
                </p>
              </div>
              <p>{comment.message}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Reviews;
