module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      'lists',
      [
        { list_name: 'animes' },
        { list_name: 'weapons' },
        { list_name: 'mangas' },
        { list_name: 'books' },
        { list_name: 'movies' },
      ],
      { ignoreDuplicates: true },
    ),

  down: (queryInterface) =>
    queryInterface.bulkDelete('lists', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    }),
};
