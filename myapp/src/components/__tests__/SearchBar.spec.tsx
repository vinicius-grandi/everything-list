/**
 * @jest-environment jsdom
 */
import React from 'react';
// import renderWithRouter from '../../views/__tests__/utils/renderWithRouter';
import {
  findByText,
  fireEvent,
  render,
  screen,
  act,
} from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('Search', () => {
  it('should make a search when button is clicked', async () => {
    act(() => {
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                list_name: 'animes',
                id: 1,
                name: 'jojo kimyou na bouken',
                imagePath: null,
              },
            ]),
        }),
      );
      render(<SearchBar />);
    });

    const SearchBox: HTMLInputElement = screen.getByRole('searchbox');
    act(() => {
      fireEvent.input(SearchBox, { target: { value: 'jojo' } });
    });
    expect(SearchBox.value).toBe('jojo');
    expect(await screen.findByText(/kimyou/gi)).toBeInTheDocument();
  });
});
