import React from 'react';
import styled from 'styled-components';
import type { QueryItem } from '@everything-list/server/src/app/controllers/SearchController.d';
import Card from './Card';
import Loading from './Loading';

const MainContent = styled.div`
  display: grid;
  @media screen and (min-width: 1001px) {
    font-size: 2rem;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 600px) and (max-width: 1000px) {
    font-size: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 599px) {
    font-size: 1.5rem;
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }

  @media screen and (max-width: 250px) {
    grid-template-columns: 1fr;
  }
`;

function List({ items }: { items: QueryItem[] }): JSX.Element {
  return items.length >= 1 ? (
    <MainContent>
      {items.map((val, i) => {
        return (
          <Card
            key={`${val?.name}-${val?.id}`}
            title={val?.name ?? 'no title'}
            imagePath={val?.imagePath ?? ''}
            id={val?.id ?? 0}
            rating={val?.rating ?? 0}
            isLazyLoading={i > 7}
          />
        );
      })}
    </MainContent>
  ) : (
    <Loading size={100} />
  );
}

export default List;
