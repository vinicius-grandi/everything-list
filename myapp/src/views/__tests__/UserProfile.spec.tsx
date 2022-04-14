/**
 * @jest-environment jsdom
 */
import React from 'react';
import { screen, act } from '@testing-library/react';
import type { FetchMock } from 'jest-fetch-mock';
import renderWithRouter from './utils/renderWithRouter';
import UserProfile from '../UserProfile';
import user from '../../data/user';

const fetchMock = global.fetch as FetchMock;
const mockFetchJson = (val: unknown) => (): Promise<any> =>
  Promise.resolve({
    json: () => Promise.resolve(val),
  });

describe("User Profile's view", () => {
  beforeEach(() => {
    fetchMock.mockImplementation(mockFetchJson(user));
  });
  it("should render weapon's details with title, image and rating", async () => {
    await act(async () => {
      renderWithRouter(<UserProfile />);
    });
    expect(await screen.findByText(user.username)).toBeInTheDocument();
    expect(await screen.findByText(user.email)).toBeInTheDocument();
    expect(
      await screen.findByText(user.reviews[0].message),
    ).toBeInTheDocument();
    const profilePicture: HTMLImageElement = await screen.findByTestId(
      'profile-picture',
    );
    expect(profilePicture.getAttribute('src')).toBe(user.profile_picture);
  });
});
