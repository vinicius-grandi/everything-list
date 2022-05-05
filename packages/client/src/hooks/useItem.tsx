import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Rate } from '../views/weapons/WeaponDetails';
import useListName from './useListName';

const useItem = <T,>(
  refresh: boolean,
): { data: T; reviewExists: Rate | null } | null => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<{
    data: T;
    reviewExists: Rate | null;
  } | null>();
  const listName = useListName();

  useEffect(() => {
    async function getItem(): Promise<void> {
      try {
        const response = await fetch(`/${listName}/api/${id}`);
        if (response.status !== 200) {
          navigate(`/${listName}`, {
            replace: true,
          });
        }
        const itemFromResponse: { data: T; reviewExists: Rate | null } =
          await response.json();
        setItem({
          data: itemFromResponse.data,
          reviewExists: itemFromResponse.reviewExists ?? null,
        });
      } catch (_err) {
        navigate(`/${listName}`, {
          replace: true,
        });
      }
    }
    getItem();
  }, [id, listName, navigate, refresh]);

  return item ? { data: item.data, reviewExists: item.reviewExists } : null;
};

export default useItem;
