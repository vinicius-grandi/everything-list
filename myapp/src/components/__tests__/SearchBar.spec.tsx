/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, screen, act, waitFor } from '@testing-library/react';
import type { FetchMock } from 'jest-fetch-mock';
import SearchBar from '../SearchBar';
import renderWithRouter from '../../views/__tests__/utils/renderWithRouter';

const fetchMock = global.fetch as FetchMock;
const mockFetchJson = (val: unknown) => (): Promise<any> =>
  Promise.resolve({
    json: () => Promise.resolve(val),
  });

describe('Search', () => {
  beforeEach(() => {
    fetchMock.mockImplementation(
      mockFetchJson([
        {
          list_name: 'animes',
          id: 1,
          name: 'jojo kimyou na bouken',
          imagePath: null,
        },
      ]),
    );
  });
  it('should make a search when something is typed in search box', async () => {
    act(() => {
      renderWithRouter(<SearchBar />);
    });

    const SearchBox: HTMLInputElement = screen.getByRole('searchbox');
    await act(async () => {
      fireEvent.input(SearchBox, { target: { value: 'jojo' } });
    });
    expect(SearchBox.value).toBe('jojo');

    await waitFor(
      () => {
        const list = screen.getByText(/kimyou/gi);
        expect(list).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
  it('should create a link using search box content', () => {
    act(() => {
      renderWithRouter(<SearchBar />);
    });

    const SearchBox: HTMLInputElement = screen.getByRole('searchbox');
    const SearchButton: HTMLLinkElement = screen.getByRole('link');
    act(() => {
      fireEvent.input(SearchBox, { target: { value: 'jojo' } });
    });
    expect(SearchButton.href).toBe('http://localhost/search?q=jojo');
  });
});
