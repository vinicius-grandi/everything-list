import React, { useState } from 'react';
import type { MovieById } from '@everything-list/server/src/services/movies/omdbapi.d';
import BasicDetails from '../../components/itemDetails/BasicDetails';
import useItem from '../../hooks/useItem';
import { Rate } from '../weapons/WeaponDetails';
import Loading from '../../components/Loading';

function MovieDetails(): JSX.Element {
  const [refresh] = useState<boolean>(false);
  const item = useItem<MovieById & { reviewExists: null | Rate }>(refresh);

  return item && item.data ? (
    <BasicDetails
      info={[
        item.data.Title,
        item.data.imdbRating,
        item.data.Poster,
        item.data.Plot,
        null,
      ]}
      reviewExists={item.reviewExists}
    />
  ) : (
    <Loading size={100} />
  );
}

export default MovieDetails;
