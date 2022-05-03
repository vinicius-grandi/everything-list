import React from 'react';
import type { Animes } from '@everything-list/server/src/services/animes/jikanapi.d';
import BasicInfo from '../../components/BasicInfo';
import useItem from '../../hooks/useItem';

function AnimeDetails(): JSX.Element {
  const item = useItem();
  return (
    <main>
      <BasicInfo />
    </main>
  );
}

export default AnimeDetails;
