import React, { useState } from 'react';
import type { Anime } from '@everything-list/server/src/services/animes/jikanapi.d';
import styled from 'styled-components';
import BasicInfo from '../../components/BasicInfo';
import useItem from '../../hooks/useItem';
import Reviews from '../../components/itemDetails/Reviews';
import { useAuth } from '../../contexts/AuthContext';
import SetReview from '../../components/itemDetails/SetReview';
import { Rate } from '../weapons/WeaponDetails';

const AnimeContainer = styled.main`
  background-color: var(--lightG);
`;

const Trailer = styled.div`
  display: flex;
  margin: 1rem;
`;

function AnimeDetails(): JSX.Element {
  const { auth } = useAuth();
  const [refreshItem, setRefreshItem] = useState<boolean>(false);
  const [resp, setResp] = useState<string>('There are no new reviews');
  const item = useItem<Anime & { reviewExists: null | Rate }>(refreshItem);

  return (
    <AnimeContainer>
      {item && item.data && (
        <i>
          <BasicInfo
            cover={
              item.data.images.jpg.image_url ??
              'https://via.placeholder.com/100x200.png?text=no-image'
            }
            rating={item.data.rating ?? '0.00'}
            title={item.data.title}
            synopsis={item.data.synopsis ?? 'no synopsis'}
          />
          {item.data.trailer.embed_url && (
            <Trailer>
              <iframe
                width="512"
                height="315"
                src={item.data.trailer.embed_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Trailer>
          )}
        </i>
      )}
      {auth && item && (
        <SetReview
          listName="weapons"
          reviewExists={item.reviewExists}
          setResponse={setResp}
        />
      )}
      <Reviews response={resp} setResponse={setResp} />
    </AnimeContainer>
  );
}

export default AnimeDetails;
