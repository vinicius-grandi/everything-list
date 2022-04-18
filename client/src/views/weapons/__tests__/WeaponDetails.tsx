import React from 'react';
import { render } from '@testing-library/react';
import { FetchMock } from 'jest-fetch-mock';
import WeaponsDetails from '../WeaponDetails';
import { data } from '../../../data/weapons';

const fetchMock = fetch as FetchMock;
const weapon = data.data[0];

describe('Weapon Details', () => {
  it("should render all weapon's info", () => {
    fetchMock.mockImplementation(
      (): Promise<any> =>
        Promise.resolve({
          json: () => weapon,
        }),
    );
    const { findByText } = render(<WeaponsDetails />);
  });
});
