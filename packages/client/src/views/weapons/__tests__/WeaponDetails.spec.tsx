import React from 'react';
import { render } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import WeaponsDetails from '../WeaponDetails';
import { data } from '../../../data/weapons';
import { comments } from '../../../data/comments';

const fetchMock = fetch as FetchMock;
const weapon = data.data[0];

describe('Weapon Details', () => {
  it("should render all weapon's info", async () => {
    fetchMock.mockImplementation(
      (): Promise<any> =>
        Promise.resolve({
          json: () => weapon,
        }),
    );
    const { findByText, findByAltText } = render(<WeaponsDetails />);
    expect(await findByText(weapon.name)).toBeInTheDocument();
    expect(await findByAltText(`${weapon.name}-weapons`)).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/8/82/Arbalest_%28PSF%29.png',
    );
    expect(await findByText(weapon.summary ?? '')).toBeInTheDocument();
    expect(await findByText('arblast')).toBeInTheDocument();
    expect(await findByText(/Rating/gi)).toBeInTheDocument();
    expect(await findByText(comments[0].message)).toBeInTheDocument();
  });
});
