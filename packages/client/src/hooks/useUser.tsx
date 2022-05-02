import { useEffect, useState } from 'react';
import type { User } from '../views/UserProfile';

const useUser = (showReviews: boolean): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser(): Promise<void> {
      try {
        const response = await fetch(`/profiles/api/0?review=${showReviews}`);
        const userFromResponse: User = await response.json();
        setUser(userFromResponse);
      } catch (_error) {
        setUser(null);
      }
    }
    getUser();
  }, [showReviews]);

  return user;
};

export default useUser;
