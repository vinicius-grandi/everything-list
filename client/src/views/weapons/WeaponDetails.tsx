import React, { useEffect, useState } from 'react';
import { Star } from 'react-feather';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type User = {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
};

type Comment = {
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
  synonyms: string[];
  imagePath: string | null;
} | null;

function WeaponDetails(): JSX.Element {
  const { id } = useParams();
  const { auth } = useAuth();
  const [item, setItem] = useState<QueryItem>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function getUser(): Promise<void> {
      const response = await fetch('/api/0?review=false');
      const userFromResponse: User = await response.json();
      setUser(userFromResponse);
    }
    async function getItem(): Promise<void> {
      const response = await fetch(`/weapons/api/${id}`);
      const itemFromResponse: QueryItem = await response.json();
      setItem(itemFromResponse);
    }
    async function getComments(): Promise<void> {
      const response = await fetch(`/weapons/api/${id}/comments`);
      const commentsFromResponse: Comment[] = await response.json();
      setComments(commentsFromResponse);
    }
    getItem();
    getComments();

    if (auth) {
      getUser();
    }
  });
  return (
    <main>
      {item && (
        <>
          <section>
            <h1>{item.name}</h1>
            <span>
              <Star fill="#faea5a" />
              Rating: {item.rating}
            </span>
            <img
              src={
                item.imagePath ??
                'https://via.placeholder.com/500x500?text=No+Image'
              }
              alt={`${item.name}-weapons`}
            />
            <p>{item.summary}</p>
            <h2>Synonyms</h2>
            <ul>
              {item.synonyms.map((val) => (
                <li key={`${val}-weapons`}>{val}</li>
              ))}
            </ul>
          </section>
          {user && (
            <form>
              <h1>Rate this item</h1>
              <div>
                <img src={user.profile_picture} alt="your profile" />
                <p>{user.username}</p>
                <span>
                  {'⭐rating '}
                  <input type="number" step={0.1} max={10} min={0} />
                </span>
                <textarea name="message" cols={10} rows={10} />
                <input type="submit" />
              </div>
            </form>
          )}
          <h1>Reviews</h1>
          {comments.length > 0 && (
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
          )}
        </>
      )}
    </main>
  );
}

export default WeaponDetails;
