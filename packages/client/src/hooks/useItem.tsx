import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const useItem = <T,>(refresh: boolean): T | null => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<T>();
  useEffect(() => {
    async function getItem(): Promise<void> {
      try {
        const response = await fetch(`/weapons/api/${id}`);
        if (response.status !== 200) {
          navigate('/weapons', {
            replace: true,
          });
        }
        const itemFromResponse: T = await response.json();
        setItem(itemFromResponse);
      } catch (_err) {
        navigate('/weapons', {
          replace: true,
        });
      }
    }
    getItem();
  }, [id, navigate, refresh]);

  return item ?? null;
};

export default useItem;
