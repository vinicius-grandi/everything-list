import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Comment = {
  id: number;
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
  const [item, setItem] = useState<QueryItem>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function getItem(): Promise<void> {
      const response = await fetch(`/weapons/api/${id}`);
      const itemFromResponse: QueryItem = await response.json();
      setItem(itemFromResponse);
    }
    getItem();
  });
  return (
    <main>
      {item && (
        <>
          <section>
            <img
              src={
                item.imagePath ??
                'https://via.placeholder.com/500x500?text=No+Image'
              }
              alt={`${item.name}-weapons`}
            />
            <h1>{item.name}</h1>
            <p>{item.summary}</p>
            <ul>
              {item.synonyms.map((val) => (
                <li key={`${val}-weapons`}>{val}</li>
              ))}
            </ul>
            <span>Rating: {item.rating}</span>
          </section>
          {comments.length > 0 && (
            <section>
              <ul>
                {comments.map((comment) => (
                  <li key={`${comment.id}-${comment.created_at}`}>
                    <img src={comment.profilePicture} alt="" />
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
