import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import type { Lists } from '@everything-list/server/src/app/controllers/ApiController';
import type { Comment } from '../views/weapons/WeaponDetails';
import useListName from './useListName';

const useComments = (refresh: boolean): Comment[] => {
  const { id } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const listName = useListName();

  useEffect(() => {
    async function getComments(): Promise<void> {
      try {
        const response = await fetch(`/${listName}/api/${id}/comments`);
        const commentsFromResponse: Comment[] = await response.json();
        setComments(commentsFromResponse);
      } catch (_error) {
        setComments([]);
      }
    }
    getComments();
  }, [id, listName, refresh]);

  return comments;
};

export default useComments;
