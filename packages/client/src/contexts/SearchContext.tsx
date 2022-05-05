import type { QueryItem } from '@everything-list/server/src/app/controllers/SearchController.d';
import React, { createContext, useContext, useState } from 'react';

type Filters = 'an' | 'mn' | 'wp';

interface ISearch {
  queryRes: QueryItem[];
  setQueryRes: React.Dispatch<React.SetStateAction<QueryItem[]>>;
  setFilter: React.Dispatch<React.SetStateAction<Filters | null>>;
  filter: Filters | null;
}

const setRes: React.Dispatch<React.SetStateAction<QueryItem[]>> = () => [];

const setFil: React.Dispatch<React.SetStateAction<Filters | null>> = () => null;

const SearchContext = createContext<ISearch>({
  queryRes: [],
  setQueryRes: setRes,
  setFilter: setFil,
  filter: null,
});

function SearchProvider({
  children,
}: React.PropsWithChildren<{ children: JSX.Element }>): JSX.Element {
  const [queryRes, setQueryRes] = useState<QueryItem[]>([]);
  const [filter, setFilter] = useState<Filters | null>(null);

  const value = React.useMemo(
    () => ({
      queryRes,
      setQueryRes,
      setFilter,
      filter,
    }),
    [filter, queryRes],
  );
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export const useQuery = (): ISearch => useContext(SearchContext);

export default SearchProvider;
