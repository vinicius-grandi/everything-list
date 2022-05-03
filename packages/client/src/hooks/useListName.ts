import { useLocation } from 'react-router-dom';
import type { Lists } from '@everything-list/server/src/app/controllers/ApiController';

const useListName = (): string => {
  const { pathname } = useLocation();
  const listName: Lists | 'weapons' | string = pathname.split('/')[1];
  return listName;
};

export default useListName;
