import React from 'react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../../App';

describe('App', () => {
  it("should render weapon's details with title, image and rating", async () => {
    const { findByTestId } = renderWithRouter(<App />, {
      route: '/weapons/Bolas',
    });
    // {
    //   name: 'Bolas',
    //   imagePath:
    //     'https://upload.wikimedia.org/wikipedia/commons/b/b5/Bola_%28PSF%29.jpg',
    //   synonyms: ['ayllo', 'liwi', 'qilumitautit'],
    // },
    expect((await findByTestId('weapon-d-title')).innerText).toBe('Bolas');
    expect((await findByTestId('weapon-d-image')).getAttribute('src')).toBe(
      'https://upload.wikimedia.org/wikipedia/commons/b/b5/Bola_%28PSF%29.jpg',
    );
    expect(await findByTestId('weapon-d-title')).toBe('Bolas');
    expect(await findByTestId('weapon-d-title')).toBe('Bolas');
  });
});
