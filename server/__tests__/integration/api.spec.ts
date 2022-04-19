import request from 'supertest';
import axios from 'axios';
import truncate from '../utils/truncate';
import app from '../../src/app';
import redisClient from '../../src/redisConfig';

describe('api', () => {
  let MyModule: typeof import('axios');
  beforeEach(() =>
    import('axios').then((module) => {
      MyModule = module;
      jest.resetModules();
    }),
  );
  afterEach(async () => {
    await redisClient.flushall();
    await truncate();
  }, 15000);
  afterAll(() => redisClient.disconnect());
  it('should retrieve anime from route /animes/api using 3rd party api', async () => {
    const response = await request(app).get('/animes/api/');
    expect(response.body.data[0].name).toBe('!NVADE SHOW!');
  });
  it('should retrieve books from route /books/api using 3rd party api', async () => {
    const response = await request(app).get('/books/api/');
    expect(response.body.data[0].name).toBe(
      'A Study of Income and Expenditures in Sixty Colleges. Year 1953-54',
    );
  });
  it('should retrieve books from page 2 on books route', async () => {
    axios.get = jest.fn().mockImplementation((url: string) => {
      if (
        url.match(/https:\/\/www.googleapis.com\/books\/v1\/volumes(?!\/)/) !==
        null
      ) {
        return Promise.resolve({
          data: {
            items: [
              {
                id: 'jsalfndlsj12',
                volumeInfo: {
                  imageLinks: { thumbnail: 'null' },
                  title: 'A Renegade',
                },
              },
              {
                id: '1h2bfl3j2nf1',
                volumeInfo: {
                  imageLinks: { thumbnail: 'null' },
                  title: 'Learning to Think in a Math Lab',
                },
              },
            ],
          },
        });
      }
      return MyModule.default.get(url);
    });
    const response = await request(app).get('/books/api?page=2');
    expect(response.body.data[0].name).toBe('A Renegade');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/startIndex=20/gi),
    );

    const response2 = await request(app).get('/books/api?page=3');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringMatching(/startIndex=40/gi),
    );
    expect(response2.body.data[1].name).toBe('Learning to Think in a Math Lab');
  });
  it('should retrieve a specific book when id is on path', async () => {
    expect(MyModule).not.toBeUndefined();
    const response = await request(app).get('/books/api/X9isv_S0aPYC');
    expect(response.body.data.volumeInfo.title).toBe(
      'A dictionary of informal Brazilian Portuguese',
    );
    expect(response.body.data.rating.toFixed(0)).toBe('0');
  });
  it('should get movies from route /movies/api/', async () => {
    expect(MyModule).not.toBeUndefined();
    const response = await request(app).get('/movies/api/');
    expect(response.body.data[0].name).toBe("Zeg 'ns Aaa");
    expect(response.body.data[0].rating.toFixed(0)).toBe('0');
  });
});
