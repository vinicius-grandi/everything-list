import React, { useState } from 'react';
import styled from 'styled-components';
import BasicInfo from '../BasicInfo';
import Reviews from './Reviews';
import { useAuth } from '../../contexts/AuthContext';
import SetReview from './SetReview';
import { Rate } from '../../views/weapons/WeaponDetails';
import useListName from '../../hooks/useListName';

const BasicContainer = styled.main`
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

function BasicDetails({
  info,
  reviewExists,
}: {
  info: (string | null)[];
  reviewExists: Rate | null;
}): JSX.Element {
  const { auth } = useAuth();
  const [resp, setResp] = useState<string>('There are no new reviews');
  const [title, rating, imagePath, synopys, embedUrl] = info;
  const listName = useListName();

  return (
    <BasicContainer>
      <Container>
        <BasicInfo
          cover={
            imagePath ?? 'https://via.placeholder.com/100x200.png?text=no-image'
          }
          rating={rating ?? '0.00'}
          title={title ?? 'Probably Something has gone wrong with BACKEND'}
          synopsis={synopys ?? 'no synopsis'}
        />
        {embedUrl && (
          <Trailer>
            <iframe
              width="1000"
              height="500"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Trailer>
        )}
      </Container>
      {auth && (
        <SetReview
          listName={listName}
          reviewExists={reviewExists}
          setResponse={setResp}
        />
      )}
      <Reviews response={resp} setResponse={setResp} />
    </BasicContainer>
  );
}

export default BasicDetails;
