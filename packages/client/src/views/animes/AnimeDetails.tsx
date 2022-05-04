import React, { useState } from 'react';
import type { Anime } from '@everything-list/server/src/services/animes/jikanapi.d';
import styled from 'styled-components';
import BasicInfo from '../../components/BasicInfo';
import useItem from '../../hooks/useItem';
import Reviews from '../../components/itemDetails/Reviews';
import { useAuth } from '../../contexts/AuthContext';
import SetReview from '../../components/itemDetails/SetReview';
import { Rate } from '../weapons/WeaponDetails';
import Loading from '../../components/Loading';

const AnimeContainer = styled.main`
  *:not(section, form, div) {
    margin: 0 1rem;
  }
`;

const Container = styled.div`
  background-color: var(--lightG);
  padding-bottom: 1rem;
`;

const Trailer = styled.div`
  @media screen and (max-width: 599px) {
    iframe {
      height: 300px;
    }
  }
  display: flex;
  margin: 1rem 0rem !important;
  padding-bottom: 1rem;
  iframe {
    margin: 0rem;
  }
  justify-content: center;
`;

function AnimeDetails(): JSX.Element {
  const { auth } = useAuth();
  const [refreshItem, setRefreshItem] = useState<boolean>(false);
  const [resp, setResp] = useState<string>('There are no new reviews');
  const item = useItem<Anime & { reviewExists: null | Rate }>(refreshItem);

  return item ? (
    <AnimeContainer>
      <Container>
        {item && item.data && (
          <>
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
                  width="1000"
                  height="500"
                  src={item.data.trailer.embed_url}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Trailer>
            )}
          </>
        )}
      </Container>
      {auth && item && (
        <SetReview
          listName="animes"
          reviewExists={item.reviewExists}
          setResponse={setResp}
        />
      )}
      <Reviews response={resp} setResponse={setResp} />
    </AnimeContainer>
  ) : (
    <Loading size={100} />
  );
}

export default AnimeDetails;
