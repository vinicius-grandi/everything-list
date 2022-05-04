import React, { useState } from 'react';
import type { Book } from '@everything-list/server/src/services/books/googlebooksapi.d';
import BasicDetails from '../../components/itemDetails/BasicDetails';
import useItem from '../../hooks/useItem';
import { Rate } from '../weapons/WeaponDetails';
import Loading from '../../components/Loading';

function BooksDetails(): JSX.Element {
  const [refresh] = useState<boolean>(false);
  const item = useItem<
    (Book & { rating: string | number }) & { reviewExists: null | Rate }
  >(refresh);

  return item && item.data ? (
    <BasicDetails
      info={[
        item.data.volumeInfo.title,
        String(item.data.rating),
        item.data.volumeInfo.imageLinks.thumbnail,
        item.data.volumeInfo.description ?? null,
        null,
      ]}
      reviewExists={item.reviewExists}
    />
  ) : (
    <Loading size={100} />
  );
}

export default BooksDetails;
