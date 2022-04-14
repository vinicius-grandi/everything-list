import React, { useEffect, useState } from 'react';

type Review = {
  message: string;
  created_at: string;
  updated_at: string;
  list_name: 'animes' | 'mangas';
};

export type User = {
  id: number;
  profile_picture: string;
  username: string;
  email: string;
  reviews: Review[];
};

function UserProfile(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function getUserInfo(): Promise<void> {
      const response = await fetch('/profiles/api/0');
      const userInfo: User = await response.json();
      setUser(userInfo);
    }
    getUserInfo();
  });
  return (
    <main>
      {user && (
        <>
          <img
            src={user.profile_picture}
            alt={user.username}
            data-testid="profile-picture"
          />
          <h1>{user.username}</h1>
          <p>{user.email}</p>
          <ul>
            {user.reviews.map((val) => (
              <li key={`${val.list_name}-${val.created_at}`}>{val.message}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default UserProfile;
