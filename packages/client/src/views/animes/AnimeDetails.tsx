import React, { useState } from 'react';
import type { Anime } from '@everything-list/server/src/services/animes/jikanapi.d';
import useItem from '../../hooks/useItem';
import { Rate } from '../weapons/WeaponDetails';
import Loading from '../../components/Loading';
import BasicDetails from '../../components/itemDetails/BasicDetails';

function AnimeDetails(): JSX.Element {
  const [refreshItem] = useState<boolean>(false);
  const item = useItem<Anime & { reviewExists: null | Rate }>(refreshItem);

  return item && item.data ? (
    <BasicDetails
      info={[
        item.data.title,
        item.data.rating,
        item.data.images.jpg.image_url,
        item.data.synopsis,
        item.data.trailer ? item.data.trailer.embed_url : null,
      ]}
      reviewExists={item.reviewExists}
    />
  ) : (
    <Loading size={100} />
  );
}

export default AnimeDetails;
